"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");

const source=fs.readFileSync(path.join(__dirname,"..","app.js"),"utf8");
const safety=fs.readFileSync(path.join(__dirname,"..","draft-safety.js"),"utf8");
const bootstrap=source.lastIndexOf("\ntry{applyUiScale(initialUiScale());wireEvents();");
assert.ok(bootstrap>0,"Expected recognizable browser bootstrap");
const context={
  localStorage:{getItem(){return null},setItem(){}},
  window:{innerWidth:1024,addEventListener(){}},
  document:{getElementById(){return null}},
  structuredClone:(value)=>JSON.parse(JSON.stringify(value))
};
vm.createContext(context);
vm.runInContext(safety,context);
vm.runInContext(source.slice(0,bootstrap)+
  "\nglobalThis.hokTest={HEROES,ROAM_PROFILES,ROAM_BUILDS,state,heroPlaysLane,candidateStats,candidateTraits,candidateTier,tierForLane,adaptiveBuild,scoreBreakdown,quickPool,eligibleOwnedPool};",context);
const api=context.hokTest,heroes=api.HEROES;
const flex=heroes.filter(h=>h.secondaryLanes?.includes("Roam"));
const byName=name=>{const h=heroes.find(x=>x.n===name);assert.ok(h,name+" must exist");return h};

test("exactly 15 secondary Roam profiles and 33 eligible Roam heroes including Dunshan",()=>{
  assert.equal(flex.length,15);
  assert.equal(Object.keys(api.ROAM_PROFILES).length,15);
  assert.equal(Object.keys(api.ROAM_BUILDS).length,15);
  assert.equal(heroes.filter(h=>api.heroPlaysLane(h,"Roam")).length,33);
  assert.ok(flex.every(h=>h.lane!=="Roam"&&api.ROAM_PROFILES[h.n]&&api.ROAM_BUILDS[h.n]));
});

test("all flex builds have six distinct items and preserve a Roam item plus boots",()=>{
  api.state.role="Roam";
  for(const h of flex){
    const b=api.adaptiveBuild(h);
    assert.equal(b.items.length,6,h.n);
    assert.equal(new Set(b.items).size,6,h.n);
    assert.match(b.items[0],/^(Guardian|Crimson Shadow) - /,h.n);
    assert.match(b.items[1],/^Boots of /,h.n);
    assert.ok(b.spell&&b.arcana,h.n);
  }
});

test("each hero reverts to original tier, stats, and build outside Roam",()=>{
  for(const h of flex){
    api.state.role="Roam";
    const r=api.adaptiveBuild(h),tier=api.candidateTier(h),stats=api.candidateStats(h);
    assert.deepEqual(Array.from(stats),Array.from(api.ROAM_PROFILES[h.n].stats),h.n);
    assert.equal(tier,api.ROAM_PROFILES[h.n].tier);
    api.state.role=h.lane;
    const normal=api.adaptiveBuild(h);
    assert.equal(api.candidateTier(h),h.tier,h.n);
    assert.notEqual(r.items[0],normal.items[0],h.n);
  }
});

test("blind-pick shortlist respects owned heroes and eligible Roam role",()=>{
  api.state.rank="Platinum";
  api.state.role="Roam";
  api.state.enemies=[null,null,null,null,null];
  api.state.accounts[0].owned=flex.map(h=>h.n);
  assert.equal(api.eligibleOwnedPool().length,15);
  assert.ok(api.quickPool().length<15,"Unvalidated non-tank Roamers must not enter automatic Ranked picks");
  api.state.accounts[0].owned=["Mozi","Dun"];
  assert.equal(api.eligibleOwnedPool().length,2);
  assert.deepEqual(Array.from(api.quickPool().map(x=>x.h.n)),["Dun"]);
});

test("Diamond+ signals choose anti-heal, frontline and anti-burst alternatives",()=>{
  api.state.rank="Diamond";api.state.role="Roam";
  const check=(name,enemies,label,item)=>{
    api.state.enemies=enemies.concat(Array(5-enemies.length).fill(null));
    const b=api.adaptiveBuild(byName(name));
    assert.equal(b.label,label);
    assert.ok(b.items.includes(item),name+" "+label);
    assert.equal(b.items[0],api.ROAM_BUILDS[name].items[0]);
    assert.equal(b.items.length,6);
  };
  check("Mozi",["Cai Yan","Dyadia"],"Anti-heal","Venomous Staff");
  check("Liu Bang",["Cai Yan","Dyadia"],"Anti-heal","Blazing Cape");
  check("Mozi",["Liu Bang","Xiang Yu"],"Versus tanks","Void Staff");
  check("Xiang Yu",["Dun","Liang","Mozi"],"Anti-burst","Boots of Resistance");
});
