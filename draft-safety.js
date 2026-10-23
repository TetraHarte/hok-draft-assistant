/* v0.18.0: conservative draft-safety screen, NOT a statistically validated win predictor. */
(function(root){
"use strict";
const REVIEWED_MODEL=false;
const ROLES=["Clash Lane","Jungle","Mid Lane","Farm Lane"];
const ANCHORS=new Set(["Dun","Lian Po","Ata","Flowborn (Tank)","Bai Qi","Xiang Yu","Liu Bang","Zhang Fei","Dunshan"]);
const KNOWN_DIVE=new Set(["Lam","Jing","Han Xin","Butterfly","Nakoruru","Wukong","Arke","Sima Yi","Gao Changgong","Li Bai","Zilong"]);
const PATCH_DATE="2026-10-21";
const OFFICIAL_SOURCE="https://www.honorofkings.com/global-en/news-detail.html?content_id=aca43154a906da4284abe1ea47fe9521f856&father_content_id=aca43154a906da4284abe1ea47fe9521f856&sid=576";
const PATCH={
 "Sun Ce":{direction:"Buff",impact:"Reassess Clash/Jungle engage and damage"},
 "Yuhuan":{direction:"Buff",impact:"Reassess sustain and conditional Roam viability"},
 "Lady Sun":{direction:"Buff",impact:"Reassess Farm Lane damage and protection needs"},
 "Arke":{direction:"Buff",impact:"Reassess assassin dive threats and Jungle priority"},
 "Zilong":{direction:"Adjusted",impact:"Recheck engage, damage and Jungle reliability"},
 "Lian Po":{direction:"Adjusted",impact:"Recheck frontline reliability"},
 "Dun":{direction:"Adjusted",impact:"Recheck Clash/Roam initiation and durability"},
 "Dunshan":{direction:"New hero",impact:"Provisional Roam tank; validate projectile block, displacement and tower protection"}
};
const has=(h,t)=>(h.traits||[]).includes(t);
const numberWith=(a,t)=>a.filter(x=>has(x,t)).length;
function roleCoverage(allies){
 const aa=(allies||[]).filter(Boolean);
 if(aa.length>4)return{status:"invalid",reason:"Five allied entries are present. For a Roam pick, enter only the other four teammates; leave your own hero unentered.",assignments:[]};
 if(new Set(aa.map(x=>x.name)).size!==aa.length)return{status:"invalid",reason:"Duplicate teammates cannot satisfy different lane assignments.",assignments:[]};
 if(aa.length<4)return{status:"incomplete",reason:aa.length+"/4 teammates entered. Cannot confirm full Clash/Jungle/Mid/Farm coverage.",assignments:[]};
 const solutions=[];
 function match(i,used,entries){
   if(i===aa.length){solutions.push(entries);return}
   const h=aa[i],lanes=Array.isArray(h.lanes)&&h.lanes.length?h.lanes:[h.lane];
   for(const lane of ROLES){
     if(!used.has(lane)&&lanes.includes(lane)){
       match(i+1,new Set([...used,lane]),[...entries,{name:h.name,lane,primary:h.lane===lane}]);
     }
   }
 }
 match(0,new Set(),[]);
 if(!solutions.length)return{status:"invalid",reason:"The four entered heroes cannot fill Clash, Jungle, Mid, and Farm using documented roles. Check teammate lane assignments.",assignments:[]};
 const primary=solutions.find(x=>x.every(y=>y.primary));
 if(primary)return{status:"primary",reason:"All four teammate lanes can be filled using primary roles (assignments not independently confirmed).",assignments:primary};
 const best=[...solutions].sort((x,y)=>y.filter(e=>e.primary).length-x.filter(e=>e.primary).length)[0];
 return{status:"flex-unconfirmed",reason:"Lane coverage depends on unconfirmed flex-role assignments: "+best.filter(e=>!e.primary).map(e=>e.name+" → "+e.lane).join(", ")+".",assignments:best};
}
function safety(candidate,allies,enemies,{blind=false,validated=false,hardCounter=false}={}){
 const cs=candidate?.traits||[];
 if(cs.includes("frontline"))return{status:"frontline",reasons:["Frontline Roamer; ordinary draft ranking applies (not a win guarantee)."],complete:false};
 const aa=(allies||[]).filter(Boolean),ee=blind?[]:(enemies||[]).filter(Boolean);
 const role=roleCoverage(aa),reasons=[],n=t=>numberWith(aa,t);
 const anchor=aa.filter(h=>ANCHORS.has(h.name)||(has(h,"frontline")&&["Vanguard Tank","Guardian Tank"].includes(h.archetype))).length;
 const secondary=aa.filter(h=>has(h,"frontline")&&!ANCHORS.has(h.name)&&!["Vanguard Tank","Guardian Tank"].includes(h.archetype)).length;
 const dive=ee.filter(h=>has(h,"assassin")||KNOWN_DIVE.has(h.name)).length;
 const cc=n("cc")+(cs.includes("cc")?1:0),peel=n("peel")+(cs.includes("peel")?1:0);
 const damage=aa.filter(h=>["DPS Marksman","Nimble Marksman","Artillery Marksman","Control Mage","Artillery Mage","Formation Mage","Ambush Mage","Burst Assassin","Roving Assassin","Assassin Fighter","Duelist Fighter","Heavy Fighter","Berserker","Charger"].includes(h.archetype)||has(h,"damage")||has(h,"dps")||has(h,"burst")).length;
 const physical=aa.some(h=>h.lane==="Farm Lane"&&/Marksman/.test(h.archetype)||["Assassin Fighter","Heavy Fighter","Berserker","Roving Assassin","Burst Assassin"].includes(h.archetype));
 const magic=aa.some(h=>/Mage/.test(h.archetype));
 const complete=role.status==="primary"&&!blind&&ee.length===5;
 const info={role,complete,anchor,secondary,dive,reasons};
 if(role.status==="invalid"){reasons.push(role.reason);return{...info,status:"rejected"}}
 if(role.status==="incomplete"){reasons.push(role.reason,"Insufficient information for an automatic non-tank Roam recommendation.");return{...info,status:"insufficient"}}
 if(role.status==="flex-unconfirmed"){reasons.push(role.reason,"Confirm the teammate's assigned flex lane before considering a non-tank Roamer.");return{...info,status:"manual-review"}}
 const issues=[];
 if(anchor<1)issues.push("No verified durable frontline anchor.");
 if(n("engage")<1)issues.push("Allied initiation is too weak for this team-dependent Roam pick.");
 if(cc<2)issues.push("Insufficient reliable crowd control across allies and proposed Roamer.");
 if(damage<2||!physical||!magic)issues.push("Damage distribution requires review; viable physical/magic pressure has not been established.");
 if(peel<1)issues.push("No identified ally protection or disengagement for vulnerable carries.");
 if(dive>=2&&anchor<2)issues.push("Heavy enemy dive with only one frontline anchor; the Roam pick needs specialist review.");
 if(hardCounter)issues.push("Known counter or matchup warnings against the proposed Roamer.");
 if(issues.length){reasons.push(...issues);return{...info,status:"rejected"}}
 reasons.push(role.reason);
 if(anchor===1)reasons.push("One frontline anchor: limited margin for positioning mistakes or concentrated enemy damage.");
 else reasons.push("Multiple frontline anchors are present.");
 if(blind)reasons.push("Enemy composition is hidden; only ally structure can be screened.");
 else if(ee.length<5)reasons.push("Enemy lineup incomplete ("+ee.length+"/5). Counter exposure unknown.");
 else reasons.push("Enemy champions are visible, but hero-specific matchup data remain provisional.");
 if(!REVIEWED_MODEL||!validated)reasons.push("Unvalidated heuristic: no 99% safety claim or win-rate guarantee.");
 return{...info,status:complete&&anchor>=2&&REVIEWED_MODEL&&validated?"approved":"conditional"};
}
root.HOKDraftSafety=Object.freeze({safety,roleCoverage,PATCH,PATCH_DATE,OFFICIAL_SOURCE,REVIEWED_MODEL});
})(typeof window!=="undefined"?window:globalThis);
