"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");

const app=fs.readFileSync(path.join(__dirname,"..","app.js"),"utf8");
const html=fs.readFileSync(path.join(__dirname,"..","index.html"),"utf8");
const sw=fs.readFileSync(path.join(__dirname,"..","sw.js"),"utf8");
const bootstrap=app.lastIndexOf("\ntry{applyUiScale(initialUiScale());wireEvents();");
assert.ok(bootstrap>0,"App bootstrap must exist");
const context={
 localStorage:{getItem(){return null},setItem(){}},
 window:{innerWidth:1280,addEventListener(){}},
 document:{getElementById(){return null}},
 navigator:{},
 structuredClone:value=>JSON.parse(JSON.stringify(value))
};
vm.createContext(context);
vm.runInContext(app.slice(0,bootstrap)+
 "\nglobalThis.testApi={HEROES,state,hero,campNameToLocal,heroPlaysLane,searchable,baseStats,traits,scoreBreakdown,genericBuild,quickPool};",context);
const api=context.testApi;
const wang=api.hero("Wang Wei");

test("Wang Wei is added exactly once as the 119th hero",()=>{
 assert.equal(api.HEROES.length,119);
 assert.equal(api.HEROES.filter(h=>h.n==="Wang Wei").length,1);
 assert.ok(wang);
 assert.equal(wang.lane,"Mid Lane");
 assert.equal(wang.archetype,"Control Mage");
 assert.equal(wang.tier,"B");
 assert.equal((wang.secondaryLanes||[]).length,0);
});
test("aliases and HoK Camp import name resolution include Mist Sage and Chinese name",()=>{
 for(const alias of ["Wang Wei","Wangwei","Mist Sage","王维","王維"]){
  assert.equal(api.campNameToLocal(alias),"Wang Wei",alias);
  assert.ok(api.searchable(wang).toLowerCase().includes(alias.toLowerCase())||alias==="Wang Wei");
 }
});
test("Wang Wei inherits control mage skills and non-empty generic mage build",()=>{
 const traits=api.traits(wang);
 assert.ok(traits.includes("cc"));
 assert.ok(traits.includes("zone"));
 assert.equal(api.baseStats(wang).length,3);
 const build=api.genericBuild(wang);
 assert.equal(build.items.length,6);
 assert.equal(new Set(build.items).size,6);
 assert.equal(build.source,"Archetype fallback");
});
test("draft only offers owned Wang Wei when player is assigned Mid Lane",()=>{
 api.state.accounts[0].owned=["Wang Wei"];
 api.state.rank="Platinum";
 api.state.role="Mid Lane";
 assert.ok(api.quickPool().some(x=>x.h.n==="Wang Wei"));
 assert.ok(Number.isFinite(api.scoreBreakdown(wang).total));
 api.state.role="Roam";
 assert.equal(api.quickPool().some(x=>x.h.n==="Wang Wei"),false);
 api.state.role="Clash Lane";
 assert.equal(api.quickPool().some(x=>x.h.n==="Wang Wei"),false);
});
test("offline shell and version are updated together",()=>{
 assert.match(html,/v0\.17\.4/);
 assert.match(html,/app\.js\?v=0174-wang-wei/);
 assert.match(sw,/solo-draft-v0174-wang-wei/);
 assert.match(sw,/app\.js\?v=0174-wang-wei/);
});
