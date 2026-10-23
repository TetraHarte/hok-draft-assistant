"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");
const root=path.join(__dirname,"..");
const app=fs.readFileSync(path.join(root,"app.js"),"utf8");
const safety=fs.readFileSync(path.join(root,"draft-safety.js"),"utf8");
const html=fs.readFileSync(path.join(root,"index.html"),"utf8");
const sw=fs.readFileSync(path.join(root,"sw.js"),"utf8");
const bootstrap=app.lastIndexOf("\ntry{applyUiScale(initialUiScale());wireEvents();");
assert.ok(bootstrap>0);
const documentNodes=new Map();
const sandbox={
 localStorage:{getItem(){return null},setItem(){}},
 window:{innerWidth:1280,addEventListener(){}},
 document:{getElementById:id=>documentNodes.get(id)||null},
 navigator:{},
 structuredClone:value=>JSON.parse(JSON.stringify(value))
};
vm.createContext(sandbox);
vm.runInContext(safety,sandbox);
vm.runInContext(app.slice(0,bootstrap)+
 "\nglobalThis.api={HEROES,state,hero,campNameToLocal,quickPool,quickCandidates,eligibleOwnedPool,recommendationPool,safetyFor,scoreBreakdown,confidenceInfo,adaptiveBuild,renderHeroExplorer};",sandbox);
const a=sandbox.api;
function setup({intent="ranked",rank="Platinum",allies=[],enemies=[]}={}){
 a.state.accounts[0].owned=a.HEROES.map(h=>h.n);
 a.state.accounts[0].draftIntent=intent;
 a.state.role="Roam";a.state.rank=rank;
 a.state.allies=[...allies,...Array(5-allies.length).fill(null)];
 a.state.enemies=[...enemies,...Array(5-enemies.length).fill(null)];
 a.state.bans=[null,null,null,null,null];
}
test("120 unique heroes; Dunshan new provisional Roam tank, aliases and item preview",()=>{
 assert.equal(a.HEROES.length,120);
 assert.equal(new Set(a.HEROES.map(h=>h.n)).size,120);
 assert.equal(a.hero("Dunshan").lane,"Roam");
 assert.equal(a.hero("Dunshan").tier,"C");
 assert.equal(a.campNameToLocal("盾山"),"Dunshan");
 assert.equal(a.campNameToLocal("Umbrossa"),"Umbrosa");
 setup();
 const preset=a.adaptiveBuild(a.hero("Dunshan"));
 assert.equal(preset.items.length,6);
 assert.match(preset.items[0],/Guardian/);
 assert.match(preset.source,/provisional/i);
});
test("An unvalidated non-tank Roamer cannot be auto-recommended for Ranked",()=>{
 setup({allies:["Dun","Lian Po","Angela","Lady Sun"]});
 const decision=a.safetyFor(a.hero("Mozi"));
 assert.equal(decision.status,"conditional");
 assert.ok(decision.reasons.some(x=>/not empirically validated/i.test(x)));
 assert.ok(!a.recommendationPool().some(x=>x.h.n==="Mozi"));
 assert.ok(a.recommendationPool().some(x=>x.h.n==="Dunshan"));
 assert.ok(a.eligibleOwnedPool().some(x=>x.h.n==="Mozi"));
 assert.equal(a.confidenceInfo(a.hero("Mozi"),a.scoreBreakdown(a.hero("Mozi"))).level,"Low");
});
test("Normal mode surfaces labeled non-tank alternatives only with sufficient allied protection",()=>{
 setup({intent:"normal",allies:["Dun","Lian Po","Angela","Lady Sun"]});
 assert.ok(a.recommendationPool().some(x=>x.h.n==="Mozi"));
 assert.ok(a.quickCandidates(a.quickPool()).some(x=>x.label==="UNVERIFIED SUPPORT"));
 setup({intent:"normal",allies:["Angela","Garo","Lady Sun","Yuhuan"]});
 assert.equal(a.safetyFor(a.hero("Mozi")).status,"rejected");
 assert.ok(!a.recommendationPool().some(x=>x.h.n==="Mozi"));
});
test("Incomplete draft and blind enemy list never yield measured approval",()=>{
 setup({intent:"normal",allies:["Dun","Lian Po","Angela","Lady Sun"]});
 assert.equal(a.safetyFor(a.hero("Flowborn (Roamer)")).status,"conditional");
 setup({intent:"normal",rank:"Diamond",allies:["Dun","Lian Po","Angela","Lady Sun"],enemies:["Jing","Lam","Angela","Di Renjie","Liu Bang"]});
 assert.notEqual(a.safetyFor(a.hero("Mozi")).status,"approved");
 assert.equal(sandbox.window.HOKDraftSafety.REVIEWED_MODEL,false);
});
test("Jungle and Farm eligibility survives Roam screening",()=>{
 setup();
 a.state.role="Jungle";
 assert.ok(a.recommendationPool().some(x=>x.h.n==="Augran"));
 a.state.role="Farm Lane";
 a.state.allies=[null,null,null,null,null];
 assert.ok(a.recommendationPool().some(x=>x.h.n==="Lady Sun"));
});
test("Patch uses seven verified directional adjustments and no fictitious probabilities",()=>{
 assert.equal(Object.keys(sandbox.window.HOKDraftSafety.PATCH).length,8);
 assert.equal(a.scoreBreakdown(a.hero("Sun Ce")).patchPart,2);
 assert.equal(a.scoreBreakdown(a.hero("Yuhuan")).patchPart,2);
 assert.equal(a.scoreBreakdown(a.hero("Dun")).patchPart,-1);
 assert.equal(a.scoreBreakdown(a.hero("Dunshan")).patchPart,0);
});
test("Interface, PWA and separate MLBB shell continue to load independently",()=>{
 for(const id of ["matchIntent","heroExplorer","heroExplorerResult"])assert.match(html,new RegExp('id="'+id+'"'));
 assert.match(html,/draft-safety\.js\?v=0180-dunshan/);
 assert.match(html,/app\.js\?v=0180-dunshan/);
 assert.match(sw,/draft-safety\.js\?v=0180-dunshan/);
 assert.match(sw,/mlbb\/index\.html/);
 assert.match(html,/v0\.18\.0/);
});
