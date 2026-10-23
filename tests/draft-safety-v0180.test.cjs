"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const root=path.join(__dirname,"..");
const app=fs.readFileSync(path.join(root,"app.js"),"utf8");
const safety=fs.readFileSync(path.join(root,"draft-safety.js"),"utf8");
const html=fs.readFileSync(path.join(root,"index.html"),"utf8");
const sw=fs.readFileSync(path.join(root,"sw.js"),"utf8");
const bootstrap=app.lastIndexOf("\ntry{applyUiScale(initialUiScale());wireEvents();");
assert.ok(bootstrap>0,"App bootstrap anchor present");
const dom=new Map(),context={
 localStorage:{getItem(){return null},setItem(){}},
 window:{innerWidth:1280,addEventListener(){}},
 document:{getElementById(id){return dom.get(id)||null}},
 navigator:{},
 structuredClone:x=>JSON.parse(JSON.stringify(x))
};
vm.createContext(context);
vm.runInContext(safety,context);
vm.runInContext(app.slice(0,bootstrap)+
 "\nglobalThis.api={HEROES,state,hero,heroPlaysLane,heroLanes,campNameToLocal,quickPool,quickCandidates,eligibleOwnedPool,recommendationPool,safetyFor,scoreBreakdown,confidenceInfo,adaptiveBuild,renderHeroExplorer};",context);
const a=context.api;
function setup({intent="ranked",rank="Platinum",allies=[],enemies=[],owned=null}={}){
 a.state.active=a.state.accounts[0].id;
 a.state.accounts[0].owned=owned||a.HEROES.map(h=>h.n);
 a.state.accounts[0].draftIntent=intent;
 a.state.role="Roam";a.state.rank=rank;
 a.state.allies=[...allies,...Array(Math.max(0,5-allies.length)).fill(null)];
 a.state.enemies=[...enemies,...Array(Math.max(0,5-enemies.length)).fill(null)];
 a.state.bans=[null,null,null,null,null];
}
const standard=["Lian Po","Musashi","Angela","Lady Sun"];
const protector=["Lian Po","Luna","Angela","Lady Sun"];
const fourWrong=["Lian Po","Dun","Angela","Lady Sun"];
test("120 unique heroes, Dunshan aliases and provisional Roam equipment",()=>{
 assert.equal(a.HEROES.length,120);
 assert.equal(new Set(a.HEROES.map(h=>h.n)).size,120);
 assert.equal(a.hero("Dunshan").lane,"Roam");
 assert.equal(a.hero("Dunshan").tier,"C");
 assert.equal(a.campNameToLocal("盾山"),"Dunshan");
 assert.equal(a.campNameToLocal("Umbrossa"),"Umbrosa");
 setup();
 const build=a.adaptiveBuild(a.hero("Dunshan"));
 assert.equal(build.items.length,6);
 assert.match(build.items[0],/Guardian/);
 assert.match(build.source,/provisional/i);
});
test("Reject a two-Clash composition without a documented Jungler",()=>{
 setup({intent:"normal",allies:fourWrong});
 assert.equal(a.safetyFor(a.hero("Mozi")).status,"rejected");
 assert.match(a.safetyFor(a.hero("Mozi")).reasons.join(" "),/cannot fill/i);
 assert.ok(!a.recommendationPool().some(x=>x.h.n==="Mozi"));
});
test("Valid four primary lanes can support a cautious non-tank Roam option in both modes",()=>{
 setup({allies:standard});
 const result=a.safetyFor(a.hero("Mozi"));
 assert.equal(result.role.status,"primary");
 assert.equal(result.status,"ally-compatible");
 assert.match(result.reasons.join(" "),/hidden/i);
 assert.equal(a.confidenceInfo(a.hero("Mozi"),a.scoreBreakdown(a.hero("Mozi"))).level,"Medium");
 assert.ok(a.recommendationPool().some(x=>x.h.n==="Mozi"));
 assert.ok(a.eligibleOwnedPool().some(x=>x.h.n==="Mozi"));
 assert.ok(a.recommendationPool().some(x=>x.h.n==="Dunshan"));
 a.state.accounts[0].draftIntent="normal";
 assert.ok(a.recommendationPool().some(x=>x.h.n==="Mozi"));
 assert.ok(a.quickCandidates(a.quickPool()).some(x=>x.label==="ALLY FIT · ENEMY UNKNOWN"));
 assert.ok(a.quickCandidates(a.quickPool())[0].label==="BEST NOW");
});
test("Flex-only lane coverage is manual review rather than automatic approval",()=>{
 setup({intent:"normal",allies:["Lian Po","Flowborn (Tank)","Angela","Lady Sun"]});
 const out=a.safetyFor(a.hero("Mozi"));
 assert.equal(out.status,"manual-review");
 assert.equal(out.role.status,"flex-unconfirmed");
 assert.match(out.reasons.join(" "),/Jungle/);
 assert.ok(!a.recommendationPool().some(x=>x.h.n==="Mozi"));
 assert.ok(a.eligibleOwnedPool().some(x=>x.h.n==="Mozi"));
});
test("Incomplete, duplicate or five-ally Roam drafts are blocked",()=>{
 setup({intent:"normal",allies:["Lian Po","Musashi","Angela"]});
 assert.equal(a.safetyFor(a.hero("Mozi")).status,"insufficient");
 assert.ok(!a.recommendationPool().some(x=>x.h.n==="Mozi"));
 setup({intent:"normal",rank:"Diamond",allies:["Lian Po","Musashi","Angela","Lady Sun","Dun"]});
 assert.equal(a.safetyFor(a.hero("Mozi")).status,"rejected");
 assert.match(a.safetyFor(a.hero("Mozi")).reasons.join(" "),/four teammates/i);
 setup({intent:"normal",allies:["Lian Po","Musashi","Angela","Angela"]});
 assert.equal(a.safetyFor(a.hero("Mozi")).status,"rejected");
});
test("Refuse non-tank Roam if no frontline anchor or opponent dive is extreme",()=>{
 setup({intent:"normal",allies:["Allain","Butterfly","Angela","Garo"]});
 assert.equal(a.safetyFor(a.hero("Mozi")).status,"rejected");
 setup({intent:"normal",rank:"Diamond",allies:standard,enemies:["Jing","Lam","Angela","Di Renjie","Liu Bang"]});
 assert.equal(a.safetyFor(a.hero("Mozi")).status,"rejected");
});
test("All six support styles remain eligible when primary-lane structure supports them",()=>{
 setup({intent:"normal",allies:protector});
 for(const hero of ["Flowborn (Roamer)","Mozi","Shi","Wang Zhaojun","Yuhuan","Liang"]){
   assert.equal(a.safetyFor(a.hero(hero)).status,"ally-compatible",hero);
   assert.ok(a.eligibleOwnedPool().some(x=>x.h.n===hero),hero+" available for evaluation");
 }
});
test("Blind enemy information stays unknown; complete favorable draft supports a conditional-strength recommendation",()=>{
 setup({intent:"ranked",allies:standard,enemies:["Jing","Lam","Angela","Di Renjie","Liu Bang"]});
 assert.equal(a.safetyFor(a.hero("Mozi")).status,"ally-compatible");
 a.state.rank="Diamond";
 assert.equal(a.safetyFor(a.hero("Mozi")).status,"rejected");
 assert.ok(!a.recommendationPool().some(x=>x.h.n==="Mozi"));
 setup({intent:"ranked",rank:"Diamond",allies:standard,enemies:["Daji","Arthur","Di Renjie","Butterfly","Zhang Fei"]});
 assert.equal(a.safetyFor(a.hero("Mozi")).status,"recommended");
 assert.ok(a.recommendationPool().some(x=>x.h.n==="Mozi"));
 setup({intent:"ranked",rank:"Diamond",allies:standard,enemies:["Daji","Arthur"]});
 assert.equal(a.safetyFor(a.hero("Mozi")).status,"conditional");
 assert.ok(!a.recommendationPool().some(x=>x.h.n==="Mozi"));
});
test("Normal and Ranked preferences, ownership and power remain account-isolated",()=>{
 setup({intent:"normal",allies:standard,owned:["Dun","Mozi"]});
 a.state.accounts[0].heroPower={Mozi:{current:77}};
 const first=a.state.accounts[0].id;
 a.state.accounts.push({id:"second",name:"Second",owned:["Dunshan"],draftIntent:"ranked",heroPower:{Dunshan:{current:50}},workspace:{}});
 assert.ok(a.eligibleOwnedPool().some(x=>x.h.n==="Mozi"));
 a.state.active="second";
 assert.deepEqual(Array.from(a.eligibleOwnedPool().map(x=>x.h.n)),["Dunshan"]);
 assert.equal(a.state.accounts[0].heroPower.Mozi.current,77);
 assert.equal(a.state.accounts[1].heroPower.Dunshan.current,50);
 a.state.active=first;
 assert.equal(a.state.accounts[0].draftIntent,"normal");
 a.state.accounts.pop();
});
test("Jungle, Farm, Clash recommendations remain eligible without Roam safety suppression",()=>{
 setup();
 a.state.role="Jungle";assert.ok(a.recommendationPool().some(x=>x.h.n==="Augran"));
 a.state.role="Farm Lane";assert.ok(a.recommendationPool().some(x=>x.h.n==="Lady Sun"));
 a.state.role="Clash Lane";assert.ok(a.eligibleOwnedPool().some(x=>x.h.n==="Allain"));
});
test("Patch tags stay visible but do not apply fabricated +/- hero strength points",()=>{
 setup();
 assert.equal(Object.keys(context.window.HOKDraftSafety.PATCH).length,8);
 for(const n of ["Sun Ce","Yuhuan","Lady Sun","Arke","Zilong","Lian Po","Dun","Dunshan"]){
   assert.ok(context.window.HOKDraftSafety.PATCH[n]);
   assert.equal(a.scoreBreakdown(a.hero(n)).patchPart,0,n);
 }
});
test("Hero Explorer is accessible, app scripts load in order and PWA includes new safety module",()=>{
 for(const id of ["matchIntent","heroExplorer","heroExplorerResult"])assert.match(html,new RegExp('id="'+id+'"'));
 assert.ok(html.indexOf('draft-safety.js?v=0180-dunshan')<html.indexOf('app.js?v=0180-dunshan'));
 assert.match(sw,/draft-safety\.js\?v=0180-dunshan/);
 assert.match(sw,/mlbb\/index\.html/);
 assert.match(html,/v0\.18\.0/);
});
