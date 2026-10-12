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
const ctx={
 localStorage:{getItem(){return null},setItem(){}},
 window:{innerWidth:1280,addEventListener(){}},
 document:{getElementById(){return null}},
 navigator:{},
 structuredClone:x=>JSON.parse(JSON.stringify(x))
};
vm.createContext(ctx);
vm.runInContext(app.slice(0,bootstrap)+
 "\nglobalThis.testApi={HEROES,state,hero,heroPlaysLane,laneLabel,quickPool,candidateTier,candidateStats,scoreBreakdown,confidenceInfo,adaptiveBuild,isNonRoamFlex,isRoamFlex};",ctx);
const a=ctx.testApi;
const added={
 "Chicha":["Jungle","Farm Lane"],
 "Arthur":["Jungle"],"Ata":["Jungle"],"Augran":["Clash Lane"],"Charlotte":["Jungle"],"Dharma":["Jungle"],"Fatih":["Jungle"],"Flowborn (Tank)":["Jungle"],"Kaizer":["Jungle"],"Mayene":["Jungle"],"Menki":["Clash Lane"],"Mi Yue":["Jungle"],"Musashi":["Clash Lane"],"Sun Ce":["Jungle"],"Ukyo Tachibana":["Clash Lane"],"Umbrosa":["Jungle"],"Wuyan":["Jungle"],"Yang Jian":["Jungle"],"Yango":["Jungle"],"Yao":["Clash Lane"],
 "Donghuang":["Clash Lane"],"Lapulapu":["Clash Lane"],"Zhuangzi":["Clash Lane"],
 "Da Qiao":["Mid Lane"],"Diaochan":["Clash Lane"],"Heino":["Clash Lane"],
 "Chano":["Jungle"],"Fang":["Jungle"],"Kongming":["Jungle"],"Sima Yi":["Mid Lane"]
};

test("All 119 heroes remain unique; 42 multi-lane heroes hold 46 extra lane assignments",()=>{
 assert.equal(a.HEROES.length,119);
 assert.equal(new Set(a.HEROES.map(x=>x.n)).size,119);
 assert.equal(a.HEROES.filter(h=>(h.secondaryLanes||[]).length).length,42);
 assert.equal(a.HEROES.reduce((s,h)=>s+(h.secondaryLanes||[]).length,0),46);
 assert.equal(Object.keys(added).length,30);
 assert.equal(Object.values(added).flat().length,31);
});

test("All 31 newly added positions can be selected, scored and drafted when owned",()=>{
 a.state.accounts[0].owned=a.HEROES.map(h=>h.n);
 a.state.rank="Platinum";
 for(const [name,lanes] of Object.entries(added)){
   const hero=a.hero(name);
   assert.ok(hero,name);
   for(const lane of lanes){
     a.state.role=lane;
     assert.equal(a.heroPlaysLane(hero,lane),true,name+" "+lane);
     assert.equal(a.isNonRoamFlex(hero),true,name+" "+lane);
     assert.equal(a.quickPool().some(x=>x.h.n===name),true,name+" "+lane+" draft");
     assert.ok(Number.isFinite(a.scoreBreakdown(hero).total),name+" "+lane+" score");
     const build=a.adaptiveBuild(hero);
     assert.equal(build.items.length,6,name+" "+lane+" items");
     assert.equal(new Set(build.items).size,6,name+" "+lane+" unique items");
     assert.match(build.source,/provisional|editorial/i,name+" "+lane+" build source");
     if(lane==="Jungle"){
       assert.equal(build.spell,"Smite",name+" "+lane+" spell");
       assert.ok(["Rapacious Bite","Runeblade","Giant's Grip"].includes(build.items[0]),name+" jungle equipment");
     }else{
       assert.notEqual(build.spell,"Smite",name+" "+lane+" must not use Smite");
       assert.ok(!["Rapacious Bite","Runeblade","Giant's Grip"].includes(build.items[0]),name+" "+lane+" no jungle equipment");
     }
   }
 }
});

test("Chicha retains Clash primary plus Jungle and Farm, with distinct loadouts",()=>{
 const chicha=a.hero("Chicha");
 assert.equal(a.laneLabel(chicha),"Clash Lane / Jungle / Farm Lane");
 a.state.role="Clash Lane";
 assert.equal(a.isNonRoamFlex(chicha),false);
 assert.match(a.adaptiveBuild(chicha).source,/Curated/);
 a.state.role="Jungle";
 const j=a.adaptiveBuild(chicha);
 assert.equal(j.spell,"Smite");
 assert.equal(j.items[0],"Rapacious Bite");
 a.state.role="Farm Lane";
 const f=a.adaptiveBuild(chicha);
 assert.notEqual(f.spell,"Smite");
 assert.equal(f.items[0],"Boots of Dexterity");
});

test("Diaochan primary Mid and new Clash flex have independent baseline; flex strength conservative",()=>{
 const d=a.hero("Diaochan");
 assert.equal(a.laneLabel(d),"Mid Lane / Clash Lane");
 a.state.role="Mid Lane";
 assert.equal(a.isNonRoamFlex(d),false);
 a.state.role="Clash Lane";
 assert.equal(a.isNonRoamFlex(d),true);
 assert.equal(a.adaptiveBuild(d).items[0],"Boots of Resistance");
 assert.ok(["B","C"].includes(a.candidateTier(d)));
 assert.notEqual(a.confidenceInfo(d,a.scoreBreakdown(d)).level,"High");
});

test("Original Roam-specific templates and existing draft role filters are preserved",()=>{
 a.state.role="Roam";
 const mozi=a.hero("Mozi");
 assert.equal(a.isRoamFlex(mozi),true);
 assert.ok(a.adaptiveBuild(mozi).items[0].startsWith("Crimson Shadow"));
 assert.ok(a.quickPool().some(x=>x.h.n==="Mozi"));
 a.state.role="Jungle";
 assert.equal(a.heroPlaysLane(a.hero("Dun"),"Jungle"),false);
 a.state.role="Mid Lane";
 assert.equal(a.heroPlaysLane(a.hero("Wang Wei"),"Mid Lane"),true);
 assert.equal(a.heroPlaysLane(a.hero("Wang Wei"),"Clash Lane"),false);
});

test("Saved-account schema and PWA cache version remain compatible",()=>{
 assert.match(app,/const DATA_SCHEMA_VERSION=161;/);
 assert.match(app,/const STORAGE="hokDraftAssistantV01";/);
 assert.match(html,/v0\.17\.5/);
 assert.match(html,/app\.js\?v=0175-flex-lanes/);
 assert.match(sw,/solo-draft-v0175-flex-lanes/);
 assert.match(sw,/app\.js\?v=0175-flex-lanes/);
});
