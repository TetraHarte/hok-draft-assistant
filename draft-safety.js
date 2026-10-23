/* v0.18.0 conservative draft safety evaluator.
 * Heuristic screening only. No empirical 99% confidence or win-rate guarantee.
 * All recommendations stay provisional until a separately validated model is released.
 */
(function(root){
"use strict";
const REVIEWED_MODEL=false; // Do not enable based on hand-written tests alone.
const ANCHORS=new Set(["Dun","Lian Po","Ata","Flowborn (Tank)","Bai Qi","Xiang Yu","Liu Bang","Zhang Fei","Dunshan"]);
const KNOWN_DIVE=new Set(["Lam","Jing","Han Xin","Butterfly","Nakoruru","Wukong","Arke","Sima Yi","Prince of Lanling","Gao Changgong","Li Bai","Zilong"]);
const PATCH_DATE="2026-10-21";
const OFFICIAL_SOURCE="https://www.honorofkings.com/global-en/news-detail.html?content_id=aca43154a906da4284abe1ea47fe9521f856&father_content_id=aca43154a906da4284abe1ea47fe9521f856&sid=576";
const PATCH={
 "Sun Ce":{direction:"Buff",impact:"Review Clash/Jungle mobility, pressure and draft priority"},
 "Yuhuan":{direction:"Buff",impact:"Reassess sustain and conditional Roam viability"},
 "Lady Sun":{direction:"Buff",impact:"Reassess Farm Lane damage and protection needs"},
 "Arke":{direction:"Buff",impact:"Reassess assassin dive threats and Jungle priority"},
 "Zilong":{direction:"Adjusted",impact:"Recheck engage, damage and Jungle reliability"},
 "Lian Po":{direction:"Adjusted",impact:"Recheck frontline strength before approving non-tank Roam"},
 "Dun":{direction:"Adjusted",impact:"Recheck Clash/Roam damage and initiation ratings"},
 "Dunshan":{direction:"New hero",impact:"Provisional Roam tank; test projectile-blocking, displacement and tower protection"}
};
const FLAGS={
 frontline:h=>(h.traits||[]).includes("frontline"),
 cc:h=>(h.traits||[]).includes("cc"),
 engage:h=>(h.traits||[]).includes("engage"),
 peel:h=>(h.traits||[]).includes("peel"),
 damage:h=>(h.traits||[]).some(t=>["damage","dps","burst"].includes(t))
};
function safety(candidate,allies,enemies,{blind=false,validated=false,hardCounter=false}={}){
 const cs=candidate?.traits||[];
 // This gate protects team-dependent Roam selections, not frontline roamers.
 if(cs.includes("frontline"))return{status:"frontline",reasons:["Frontline Roamer; evaluated by the standard draft model."],complete:false};
 const aa=(allies||[]).filter(Boolean),ee=blind?[]:(enemies||[]).filter(Boolean);
 const reasons=[];
 const count=k=>aa.filter(FLAGS[k]).length;
 const anchor=aa.filter(h=>ANCHORS.has(h.name)||((h.traits||[]).includes("frontline")&&["Vanguard Tank","Guardian Tank","Defensive Support"].includes(h.archetype))).length;
 const secondary=aa.filter(h=>FLAGS.frontline(h)&&!ANCHORS.has(h.name)).length;
 const frontline=anchor+secondary*0.5;
 const dive=ee.filter(e=>(e.traits||[]).includes("assassin")||KNOWN_DIVE.has(e.name)).length;
 const protectedCarries=aa.filter(h=>h.lane==="Mid Lane"||h.lane==="Farm Lane").length;
 const adequateFrontline=anchor>=1&&frontline>=1.5; // anchor + reliable secondary presence
 const strongFrontline=anchor>=2||anchor>=1&&secondary>=1;
 const enoughEngage=count("engage")>=1;
 const enoughControl=count("cc")>=1||cs.includes("cc");
 const enoughPeel=count("peel")>=1||cs.includes("peel");
 const enoughDamage=count("damage")>=2;
 const complete=aa.length>=4&&!blind&&ee.length>=5;
 let critical=false;
 if(aa.length>=3&&anchor===0){reasons.push("No established frontline anchor among visible allies.");critical=true}
 if(aa.length===4&&!adequateFrontline){reasons.push("Too little dependable frontline coverage for a non-tank Roamer.");critical=true}
 if(aa.length===4&&!enoughEngage){reasons.push("No reliable ally initiation; this Roamer does not solve it.");critical=true}
 if(aa.length===4&&!enoughControl){reasons.push("Insufficient reliable crowd control.");critical=true}
 if(aa.length===4&&!enoughDamage){reasons.push("Allied damage profile needs review before removing a frontline slot.");critical=true}
 if(aa.length===4&&protectedCarries>=2&&!enoughPeel){reasons.push("Vulnerable carries lack sufficient peel.");critical=true}
 if(aa.length>=3&&dive>=2&&!enoughPeel&&protectedCarries>=2){reasons.push("Enemy dive threatens carries without reliable peel.");critical=true}
 if(hardCounter){reasons.push("Visible enemy counter warning requires matchup review.");critical=true}
 if(critical)return{status:"rejected",reasons,complete,frontline,anchor,dive};
 if(aa.length<4)reasons.push("Incomplete allied composition: "+aa.length+"/4 teammate heroes entered.");
 else if(!strongFrontline)reasons.push("Frontline relies on one anchor and limited secondary coverage.");
 else reasons.push("Visible allies provide frontline depth and initiation.");
 if(blind)reasons.push("Enemy lineup is hidden in this rank; matchup safety cannot be verified.");
 else if(ee.length<5)reasons.push("Enemy lineup incomplete: "+ee.length+"/5 known.");
 if(!enoughPeel&&protectedCarries>=2)reasons.push("Carry protection is limited; evaluate enemy engage carefully.");
 // Never label an unvalidated heuristic with a measured 99% confidence.
 if(!REVIEWED_MODEL||!validated)reasons.push("Not empirically validated to 99% precision; no win-rate guarantee.");
 return{status:complete&&strongFrontline&&enoughEngage&&enoughControl&&enoughPeel&&enoughDamage&&REVIEWED_MODEL&&validated?"approved":"conditional",reasons,complete,frontline,anchor,dive};
}
root.HOKDraftSafety=Object.freeze({safety,PATCH,PATCH_DATE,OFFICIAL_SOURCE,REVIEWED_MODEL});
})(typeof window!=="undefined"?window:globalThis);
