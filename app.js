
"use strict";
const CAMP_BRIDGE_BOOKMARKLET="javascript:(()=>{if(window.__HOK_DRAFT_SYNC_BRIDGE){alert(\"HoK Sync is already armed on this Camp page.\");return}window.__HOK_DRAFT_SYNC_BRIDGE=1;const END=\"/api/game/user/getprofileherolist\";const qs=new URLSearchParams((location.hash.split(\"?\")[1]||\"\"));const uid=qs.get(\"visitor_id\")||prompt(\"Enter the HoK UID to sync:\");if(!uid){window.__HOK_DRAFT_SYNC_BRIDGE=0;return}const safe=j=>{const d=j&&j.data;if(!d||!Array.isArray(d.heroList))return null;return{version:1,source:\"camp-bridge\",capturedAt:Date.now(),uid:String((d.userBasicInfo&&d.userBasicInfo.uid)||uid),characName:String((d.userBasicInfo&&d.userBasicInfo.characName)||\"\"),heroList:d.heroList.map(x=>({heroId:x.heroId,heroName:x.heroName,fightValue:x.fightValue,fightChange:x.fightChange,totalCnt:x.totalCnt,winRate:x.winRate,score:x.score,skilledLevel:x.skilledLevel,honorTitle:x.honorTitle,branchType:x.branchType}))}};const finish=j=>{if(window.__HOK_DRAFT_SYNC_DONE)return;const s=safe(j);if(!s)return;window.__HOK_DRAFT_SYNC_DONE=1;let sent=false;try{if(window.opener&&!window.opener.closed){window.opener.postMessage({type:\"HOK_CAMP_BRIDGE\",payload:s},\"*\");sent=true}}catch(e){}if(!sent){try{const b=new Blob([JSON.stringify(s,null,2)],{type:\"application/json\"}),a=document.createElement(\"a\");a.href=URL.createObjectURL(b);a.download=\"hok-camp-sync-\"+s.uid+\".json\";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),2000)}catch(e){}}alert(\"HoK Sync captured \"+s.heroList.length+\" hero records. \"+(sent?\"Return to the Draft Assistant tab.\":\"A small sync JSON file was downloaded; import it in the Power tab.\"))};const F=window.fetch;window.fetch=function(...a){return F.apply(this,a).then(r=>{try{const z=String((a[0]&&a[0].url)||a[0]||r.url||\"\");if(z.includes(END))r.clone().json().then(finish).catch(()=>{})}catch(e){}return r})};const O=XMLHttpRequest.prototype.open,S=XMLHttpRequest.prototype.send;XMLHttpRequest.prototype.open=function(m,z,...r){this.__hokDraftSyncUrl=String(z||\"\");return O.call(this,m,z,...r)};XMLHttpRequest.prototype.send=function(...a){if((this.__hokDraftSyncUrl||\"\").includes(END))this.addEventListener(\"load\",()=>{try{finish(JSON.parse(this.responseText))}catch(e){}},{once:true});return S.apply(this,a)};const dst=\"#/settings/personal-homepage?userType=3&visitor_id=\"+encodeURIComponent(uid);if(location.hash===dst){location.hash=\"#/battle-record?tab=battle\";setTimeout(()=>{location.hash=dst},800)}else{location.hash=dst}alert(\"HoK Sync is armed. Camp will open your profile. If it does not capture automatically, open your profile / hero-stats view without refreshing the page.\")})()";
const HEROES=[{"n":"Agudo","lane":"Jungle","tier":"C","archetype":"Tank Marksman","aliases":[]},{"n":"Alessio","lane":"Farm Lane","tier":"B","archetype":"Nimble Marksman","aliases":[]},{"n":"Allain","lane":"Clash Lane","tier":"C","archetype":"Berserker","aliases":[]},{"n":"Angela","lane":"Mid Lane","tier":"S","archetype":"Artillery Mage","aliases":[]},{"n":"Annette","lane":"Roam","tier":"C","archetype":"Defensive Support","aliases":[]},{"n":"Ao'yin","lane":"Farm Lane","tier":"S","archetype":"Artillery Marksman","aliases":["Loong","Ao Yin"]},{"n":"Arke","lane":"Jungle","tier":"B","archetype":"Burst Assassin","aliases":[]},{"n":"Arli","lane":"Farm Lane","tier":"B","archetype":"Nimble Marksman","aliases":["Gongsun Li"]},{"n":"Arthur","lane":"Clash Lane","tier":"B","archetype":"Charger","aliases":[]},{"n":"Ata","lane":"Clash Lane","tier":"C","archetype":"Vanguard Tank","aliases":[]},{"n":"Athena","lane":"Jungle","tier":"C","archetype":"Assassin Fighter","aliases":[]},{"n":"Augran","lane":"Jungle","tier":"S","archetype":"Assassin Fighter","aliases":[]},{"n":"Bai Qi","lane":"Clash Lane","tier":"C","archetype":"Vanguard Tank","aliases":[]},{"n":"Biron","lane":"Clash Lane","tier":"B","archetype":"Heavy Fighter","aliases":[]},{"n":"Butterfly","lane":"Jungle","tier":"C","archetype":"Assassin Fighter","aliases":[]},{"n":"Cai Yan","lane":"Roam","tier":"S","archetype":"Buff Support","aliases":[]},{"n":"Chano","lane":"Farm Lane","tier":"B","archetype":"Artillery Marksman","aliases":[]},{"n":"Charlotte","lane":"Clash Lane","tier":"B","archetype":"Charger","aliases":[]},{"n":"Chicha","lane":"Clash Lane","tier":"A","archetype":"Charger","aliases":[]},{"n":"Cirrus","lane":"Jungle","tier":"C","archetype":"Burst Assassin","aliases":[]},{"n":"Consort Yu","lane":"Farm Lane","tier":"A","archetype":"DPS Marksman","aliases":[]},{"n":"Da Qiao","lane":"Roam","tier":"A","archetype":"Tactical Support","aliases":[]},{"n":"Daji","lane":"Mid Lane","tier":"S","archetype":"Artillery Mage","aliases":[]},{"n":"Devara","lane":"Clash Lane","tier":"B","archetype":"Berserker","aliases":[]},{"n":"Dharma","lane":"Clash Lane","tier":"C","archetype":"Charger","aliases":[]},{"n":"Di Renjie","lane":"Farm Lane","tier":"B","archetype":"DPS Marksman","aliases":[]},{"n":"Dian Wei","lane":"Jungle","tier":"B","archetype":"Berserker","aliases":[]},{"n":"Diaochan","lane":"Mid Lane","tier":"B","archetype":"Formation Mage","aliases":[]},{"n":"Dolia","lane":"Roam","tier":"S","archetype":"Buff Support","aliases":[]},{"n":"Donghuang","lane":"Roam","tier":"A","archetype":"Offensive Support","aliases":[]},{"n":"Dr Bian","lane":"Mid Lane","tier":"C","archetype":"Formation Mage","aliases":[]},{"n":"Dun","lane":"Clash Lane","tier":"A","archetype":"Guardian Tank","aliases":[]},{"n":"Dyadia","lane":"Roam","tier":"A","archetype":"Buff Support","aliases":[]},{"n":"Erin","lane":"Farm Lane","tier":"A","archetype":"Nimble Marksman","aliases":[]},{"n":"Fang","lane":"Farm Lane","tier":"B","archetype":"Artillery Marksman","aliases":[]},{"n":"Fatih","lane":"Clash Lane","tier":"C","archetype":"Berserker","aliases":[]},{"n":"Feyd","lane":"Jungle","tier":"B","archetype":"Roving Assassin","aliases":[]},{"n":"Florentino","lane":"Clash Lane","tier":"A","archetype":"Duelist Fighter","aliases":[]},{"n":"Flowborn (Assassin)","lane":"Jungle","tier":"A","archetype":"Roving Assassin","aliases":["Flowborn Assassin"]},{"n":"Flowborn (Mage)","lane":"Mid Lane","tier":"C","archetype":"Artillery Mage","aliases":["Flowborn Mage"]},{"n":"Flowborn (Marksman)","lane":"Farm Lane","tier":"B","archetype":"Nimble Marksman","aliases":["Flowborn Marksman"]},{"n":"Flowborn (Roamer)","lane":"Roam","tier":"B","archetype":"Buff Support","aliases":["Flowborn Support","Flowborn Roam"]},{"n":"Flowborn (Tank)","lane":"Clash Lane","tier":"C","archetype":"Vanguard Tank","aliases":["Flowborn Tank"]},{"n":"Fuzi","lane":"Clash Lane","tier":"C","archetype":"Berserker","aliases":[]},{"n":"Gan & Mo","lane":"Mid Lane","tier":"C","archetype":"Artillery Mage","aliases":[]},{"n":"Gao","lane":"Mid Lane","tier":"C","archetype":"Formation Mage","aliases":[]},{"n":"Gao Changgong","lane":"Jungle","tier":"A","archetype":"Burst Assassin","aliases":["Prince of Lanling"]},{"n":"Garo","lane":"Farm Lane","tier":"A","archetype":"DPS Marksman","aliases":[]},{"n":"Garuda","lane":"Mid Lane","tier":"B","archetype":"Artillery Mage","aliases":[]},{"n":"Guan Yu","lane":"Clash Lane","tier":"C","archetype":"Charger","aliases":[]},{"n":"Guiguzi","lane":"Roam","tier":"C","archetype":"Offensive Support","aliases":[]},{"n":"Han Xin","lane":"Jungle","tier":"C","archetype":"Roving Assassin","aliases":[]},{"n":"Haya","lane":"Mid Lane","tier":"S","archetype":"Artillery Mage","aliases":[]},{"n":"Heino","lane":"Mid Lane","tier":"B","archetype":"Formation Mage","aliases":[]},{"n":"Hou Yi","lane":"Farm Lane","tier":"S","archetype":"DPS Marksman","aliases":[]},{"n":"Huang Zhong","lane":"Farm Lane","tier":"C","archetype":"DPS Marksman","aliases":[]},{"n":"Jing","lane":"Jungle","tier":"C","archetype":"Roving Assassin","aliases":[]},{"n":"Kaizer","lane":"Clash Lane","tier":"A","archetype":"Assassin Fighter","aliases":["Kai"]},{"n":"Kongming","lane":"Mid Lane","tier":"A","archetype":"Ambush Mage","aliases":["Kong Ming"]},{"n":"Kui","lane":"Roam","tier":"B","archetype":"Offensive Support","aliases":[]},{"n":"Lady Sun","lane":"Farm Lane","tier":"A","archetype":"Artillery Marksman","aliases":[]},{"n":"Lady Zhen","lane":"Mid Lane","tier":"B","archetype":"Control Mage","aliases":[]},{"n":"Lam","lane":"Jungle","tier":"A","archetype":"Roving Assassin","aliases":[]},{"n":"Lapulapu","lane":"Roam","tier":"C","archetype":"Defensive Support","aliases":[]},{"n":"Li Bai","lane":"Jungle","tier":"C","archetype":"Roving Assassin","aliases":[]},{"n":"Li Xin","lane":"Clash Lane","tier":"S","archetype":"Berserker","aliases":[]},{"n":"Lian Po","lane":"Clash Lane","tier":"B","archetype":"Vanguard Tank","aliases":[]},{"n":"Liang","lane":"Mid Lane","tier":"S","archetype":"Control Mage","aliases":[]},{"n":"Liu Bang","lane":"Clash Lane","tier":"C","archetype":"Guardian Tank","aliases":[]},{"n":"Liu Bei","lane":"Jungle","tier":"C","archetype":"Berserker","aliases":[]},{"n":"Liu Shan","lane":"Roam","tier":"B","archetype":"Tactical Support","aliases":[]},{"n":"Lorion","lane":"Mid Lane","tier":"C","archetype":"Formation Mage","aliases":[]},{"n":"Lu Bu","lane":"Clash Lane","tier":"B","archetype":"Heavy Fighter","aliases":[]},{"n":"Luara","lane":"Farm Lane","tier":"A","archetype":"DPS Marksman","aliases":[]},{"n":"Luban No.7","lane":"Farm Lane","tier":"A","archetype":"DPS Marksman","aliases":[]},{"n":"Luna","lane":"Jungle","tier":"C","archetype":"Charger","aliases":[]},{"n":"Mai Shiranui","lane":"Mid Lane","tier":"B","archetype":"Ambush Mage","aliases":[]},{"n":"Marco Polo","lane":"Farm Lane","tier":"A","archetype":"Nimble Marksman","aliases":[]},{"n":"Mayene","lane":"Clash Lane","tier":"C","archetype":"Charger","aliases":[]},{"n":"Meng Ya","lane":"Farm Lane","tier":"C","archetype":"DPS Marksman","aliases":[]},{"n":"Menki","lane":"Jungle","tier":"C","archetype":"Formation Mage","aliases":[]},{"n":"Mi Yue","lane":"Clash Lane","tier":"B","archetype":"Formation Mage","aliases":[]},{"n":"Milady","lane":"Mid Lane","tier":"S","archetype":"Formation Mage","aliases":[]},{"n":"Ming","lane":"Roam","tier":"C","archetype":"Buff Support","aliases":[]},{"n":"Mozi","lane":"Mid Lane","tier":"A","archetype":"Control Mage","aliases":[]},{"n":"Mulan","lane":"Clash Lane","tier":"C","archetype":"Assassin Fighter","aliases":[]},{"n":"Musashi","lane":"Jungle","tier":"B","archetype":"Assassin Fighter","aliases":[]},{"n":"Nakoruru","lane":"Jungle","tier":"C","archetype":"Burst Assassin","aliases":[]},{"n":"Nezha","lane":"Clash Lane","tier":"C","archetype":"Charger","aliases":[]},{"n":"Nuwa","lane":"Mid Lane","tier":"A","archetype":"Artillery Mage","aliases":[]},{"n":"Pei","lane":"Jungle","tier":"C","archetype":"Roving Assassin","aliases":[]},{"n":"Sakeer","lane":"Roam","tier":"C","archetype":"Buff Support","aliases":[]},{"n":"Shangguan","lane":"Mid Lane","tier":"C","archetype":"Ambush Mage","aliases":[]},{"n":"Shi","lane":"Mid Lane","tier":"B","archetype":"Control Mage","aliases":[]},{"n":"Shouyue","lane":"Farm Lane","tier":"B","archetype":"Artillery Marksman","aliases":[]},{"n":"Sima Yi","lane":"Jungle","tier":"C","archetype":"Burst Assassin","aliases":[]},{"n":"Sun Bin","lane":"Roam","tier":"C","archetype":"Tactical Support","aliases":[]},{"n":"Sun Ce","lane":"Clash Lane","tier":"B","archetype":"Charger","aliases":[]},{"n":"Ukyo Tachibana","lane":"Jungle","tier":"C","archetype":"Assassin Fighter","aliases":[]},{"n":"Umbrosa","lane":"Clash Lane","tier":"B","archetype":"Charger","aliases":[]},{"n":"Wang Zhaojun","lane":"Mid Lane","tier":"A","archetype":"Control Mage","aliases":["Princess Frost"]},{"n":"Wukong","lane":"Jungle","tier":"A","archetype":"Burst Assassin","aliases":[]},{"n":"Wuyan","lane":"Clash Lane","tier":"C","archetype":"Heavy Fighter","aliases":[]},{"n":"Xiang Yu","lane":"Clash Lane","tier":"B","archetype":"Guardian Tank","aliases":[]},{"n":"Xiao Qiao","lane":"Mid Lane","tier":"A","archetype":"Artillery Mage","aliases":[]},{"n":"Xuance","lane":"Jungle","tier":"B","archetype":"Roving Assassin","aliases":[]},{"n":"Yang Jian","lane":"Clash Lane","tier":"C","archetype":"Assassin Fighter","aliases":[]},{"n":"Yango","lane":"Clash Lane","tier":"C","archetype":"Roving Assassin","aliases":[]},{"n":"Yao","lane":"Jungle","tier":"C","archetype":"Assassin Fighter","aliases":[]},{"n":"Yaria","lane":"Roam","tier":"A","archetype":"Buff Support","aliases":[]},{"n":"Ying","lane":"Jungle","tier":"C","archetype":"Assassin Fighter","aliases":[]},{"n":"Yixing","lane":"Mid Lane","tier":"B","archetype":"Formation Mage","aliases":[]},{"n":"Yuhuan","lane":"Mid Lane","tier":"C","archetype":"Formation Mage","aliases":[]},{"n":"Zhang Fei","lane":"Roam","tier":"B","archetype":"Defensive Support","aliases":[]},{"n":"Zhou Yu","lane":"Mid Lane","tier":"C","archetype":"Formation Mage","aliases":[]},{"n":"Zhuangzi","lane":"Roam","tier":"B","archetype":"Defensive Support","aliases":[]},{"n":"Zilong","lane":"Jungle","tier":"B","archetype":"Assassin Fighter","aliases":[]},{"n":"Ziya","lane":"Mid Lane","tier":"C","archetype":"Artillery Mage","aliases":[]}];
const META_SNAPSHOT="2026-09-28";
const STORAGE="hokDraftAssistantV01";
const DATA_SCHEMA_VERSION=161;
const RECOVERY_KEY="hokDraftAssistantRecoveryV161";
const PRE_MIGRATION_KEY="hokDraftAssistantPreMigrationV161";
const DIAG_LIMIT=80;
let extensionSyncState={state:"READY",updatedAt:Date.now(),message:"Ready"};
const DEFAULT_OWNED=["Dun","Allain","Lian Po","Kaizer","Marco Polo","Hou Yi","Lady Sun","Angela","Daji","Wang Zhaojun","Lam","Zhang Fei","Biron","Sun Ce"];
let state;
try{state=JSON.parse(localStorage.getItem(STORAGE)||"null")}catch(e){state=null}
if(!state||!Array.isArray(state.accounts)||!state.accounts.length)state={accounts:[{id:"main",name:"Main Account",owned:[...DEFAULT_OWNED]}],active:"main",role:"Clash Lane",rank:"Platinum",allies:[null,null,null,null,null],enemies:[null,null,null,null,null],bans:[null,null,null,null,null]};
if(!state.rank)state.rank="Platinum";
for(const k of ["allies","enemies","bans"]){if(!Array.isArray(state[k])||state[k].length!==5)state[k]=[null,null,null,null,null];state[k]=state[k].map(x=>x==="Princess Frost"?"Wang Zhaojun":x)}
for(const a of state.accounts){
  if(!Array.isArray(a.owned))a.owned=[];
  a.owned=a.owned.map(x=>x==="Princess Frost"?"Wang Zhaojun":x).filter((x,i,arr)=>arr.indexOf(x)===i);
  if(typeof a.uid!=="string")a.uid="";
  if(!a.heroPower||typeof a.heroPower!=="object")a.heroPower={};
  if(!Array.isArray(a.syncHistory))a.syncHistory=[];
  if(!a.workspace||typeof a.workspace!=="object"){
    const legacyActive=a.id===state.active;
    a.workspace={rank:legacyActive?state.rank:"Platinum",role:legacyActive?(state.role||"Clash Lane"):"Clash Lane",allies:legacyActive?[...state.allies]:[null,null,null,null,null],enemies:legacyActive?[...state.enemies]:[null,null,null,null,null],bans:legacyActive?[...state.bans]:[null,null,null,null,null]};
  }
  if(!["Gold","Platinum","Diamond","Master","Grandmaster"].includes(a.workspace.rank))a.workspace.rank="Platinum";
  if(!["Clash Lane","Jungle","Mid Lane","Farm Lane","Roam"].includes(a.workspace.role))a.workspace.role="Clash Lane";
  for(const k of ["allies","enemies","bans"]){if(!Array.isArray(a.workspace[k])||a.workspace[k].length!==5)a.workspace[k]=[null,null,null,null,null];}
}
{const activeProfile=state.accounts.find(a=>a.id===state.active)||state.accounts[0];state.active=activeProfile.id;state.rank=activeProfile.workspace.rank;state.role=activeProfile.workspace.role;state.allies=[...activeProfile.workspace.allies];state.enemies=[...activeProfile.workspace.enemies];state.bans=[...activeProfile.workspace.bans];}
if(Number(state.schemaVersion||0)<DATA_SCHEMA_VERSION){
  try{localStorage.setItem(PRE_MIGRATION_KEY,JSON.stringify({savedAt:Date.now(),fromVersion:Number(state.schemaVersion||0),state}))}catch(e){}
  state.schemaVersion=DATA_SCHEMA_VERSION;
}
for(const a of state.accounts){
  if(!a.powerDetails||typeof a.powerDetails!=="object")a.powerDetails={};
  if(!a.rankingTargets||typeof a.rankingTargets!=="object")a.rankingTargets={};
  if(!Array.isArray(a.extendedCaptures))a.extendedCaptures=[];
  if(!Array.isArray(a.diagnostics))a.diagnostics=[];
  if(!Array.isArray(a.syncHistory))a.syncHistory=[];
  if(!a.lastGoodSnapshot||typeof a.lastGoodSnapshot!=="object")a.lastGoodSnapshot=null;
}

let picker={group:"allies",index:0},rosterFilter="All",pickerLaneFilter="All",pickerOwnedOnly=false,pickerPage=1,powerLaneFilter="All",powerSort="highest";const PICKER_PAGE_SIZE=18;
const PHASES={intention:{seconds:20,total:"Pre-ban: ~15–20s",label:"intention",title:"Intention — decide your likely role/hero pool",text:"Use this window to set your role, confirm your account roster, and identify 2–3 safe candidates before bans begin."},ban:{seconds:30,total:"Ban phase: ~60–90s total",label:"ban turn",title:"Ban Turn — remove the biggest draft threat",text:"Use the enemy/ally context already entered. A ban turn is short, so prioritize high-impact threats rather than searching the full roster."},pick:{seconds:20,total:"Pick phase: up to ~200s total",label:"pick turn",title:"Pick Turn — make the decision, not the whole analysis",text:"Enter visible picks continuously. When your turn starts, the assistant should already have your best owned options ranked."},adjustment:{seconds:20,total:"Adjustment: 20s",label:"adjustment",title:"Adjustment — finalize the loadout and swaps",text:"Use the final window for teammate swaps, Arcana, and Challenger Spell checks. Hero recommendations are effectively locked at this point."}};
function isBlindRank(){return state.rank==="Gold"||state.rank==="Platinum"}
function isDraftRank(){return !isBlindRank()}
function visibleAllies(){return isBlindRank()?state.allies.slice(0,4):state.allies}

let draftPhase="pick",timerRemaining=20,timerRunning=false,timerHandle=null;
const $=id=>document.getElementById(id);
const UI_SCALE_KEY="hokDraftUiScale";
function initialUiScale(){
  let saved=null;
  try{saved=localStorage.getItem(UI_SCALE_KEY)}catch(e){}
  if(saved&&["100","115","125","135"].includes(saved))return saved;
  return window.innerWidth>=801?"125":"100";
}
function applyUiScale(value){
  const v=["100","115","125","135"].includes(String(value))?String(value):"125";
  document.body.dataset.uiScale=v;
  const el=$("uiScale");if(el)el.value=v;
  try{localStorage.setItem(UI_SCALE_KEY,v)}catch(e){}
}
const acct=()=>state.accounts.find(a=>a.id===state.active)||state.accounts[0];
function snapshotWorkspace(){const a=acct();if(!a)return;a.workspace={rank:state.rank,role:state.role,allies:[...state.allies],enemies:[...state.enemies],bans:[...state.bans]}}
function loadWorkspace(a){if(!a)return;const w=a.workspace||{};state.rank=w.rank||"Platinum";state.role=w.role||"Clash Lane";state.allies=Array.isArray(w.allies)?[...w.allies]:[null,null,null,null,null];state.enemies=Array.isArray(w.enemies)?[...w.enemies]:[null,null,null,null,null];state.bans=Array.isArray(w.bans)?[...w.bans]:[null,null,null,null,null]}
const save=()=>{snapshotWorkspace();try{localStorage.setItem(STORAGE,JSON.stringify(state))}catch(e){}};
function pushDiag(type,message,extra={}){
  const a=acct?.(); if(!a)return;
  if(!Array.isArray(a.diagnostics))a.diagnostics=[];
  a.diagnostics.push({ts:Date.now(),type:String(type||"info"),message:String(message||""),...extra});
  a.diagnostics=a.diagnostics.slice(-DIAG_LIMIT);
}
function extensionAvailable(){return typeof chrome!=="undefined"&&!!chrome.runtime?.id}
function safeNumber(v,min=-Infinity,max=Infinity){const n=Number(v);return Number.isFinite(n)&&n>=min&&n<=max?n:null}
function sanitizeUid(v){return String(v??"").replace(/[^\d]/g,"").slice(0,32)}
function makeSyncHash(heroList){return heroList.map(x=>`${x.heroId??x.heroName}:${Number(x.fightValue)||0}`).sort().join("|")}
function downloadJsonFile(name,obj){
  const blob=new Blob([JSON.stringify(obj,null,2)],{type:"application/json"});
  const url=URL.createObjectURL(blob);
  if(extensionAvailable()&&chrome.downloads?.download){
    chrome.downloads.download({url,filename:name,saveAs:true},()=>setTimeout(()=>URL.revokeObjectURL(url),3000));
  }else{
    const a=document.createElement("a");a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);
  }
}
function backupPayload(){snapshotWorkspace();return{product:"HoK Solo Draft Assistant",schemaVersion:DATA_SCHEMA_VERSION,exportedAt:Date.now(),metaSnapshot:META_SNAPSHOT,state}}
function validateBackupObject(obj){
  if(!obj||typeof obj!=="object")throw new Error("Backup is not a JSON object.");
  const s=obj.state||obj;
  if(!Array.isArray(s.accounts)||!s.accounts.length)throw new Error("Backup has no account profiles.");
  if(s.accounts.length>20)throw new Error("Backup has an unexpected number of accounts.");
  for(const a of s.accounts){if(!a||typeof a!=="object"||typeof a.id!=="string"||!Array.isArray(a.owned))throw new Error("Backup account structure is invalid.");}
  return structuredClone(s);
}
function exportBackup(){downloadJsonFile(`hok-assistant-backup-${new Date().toISOString().slice(0,10)}.json`,backupPayload());$("backupStatus").textContent="Backup export prepared."}
async function restoreBackup(file){
  if(!file){$("backupStatus").textContent="Choose a backup JSON first.";return}
  try{
    const parsed=JSON.parse(await file.text()),incoming=validateBackupObject(parsed);
    const names=incoming.accounts.map(a=>a.name||a.id).join(", ");
    if(!confirm(`Restore ${incoming.accounts.length} account(s): ${names}? Your current state will be placed in the local recovery slot first.`))return;
    try{localStorage.setItem(RECOVERY_KEY,JSON.stringify({savedAt:Date.now(),state}))}catch(e){}
    incoming.schemaVersion=DATA_SCHEMA_VERSION;
    state=incoming;localStorage.setItem(STORAGE,JSON.stringify(state));location.reload();
  }catch(err){$("backupStatus").textContent="Restore rejected: "+(err?.message||String(err));}
}
function exportDiagnostics(){
  const safeAccounts=state.accounts.map(a=>({id:a.id,name:a.name,uidMasked:compactUid(a.uid),lastCampSyncAt:a.lastCampSyncAt||null,lastCampSyncCount:a.lastCampSyncCount||0,campSyncMethod:a.campSyncMethod||null,syncHistory:(a.syncHistory||[]).slice(-20),diagnostics:(a.diagnostics||[]).slice(-50),extendedEndpoints:(a.extendedCaptures||[]).slice(-20).map(x=>({ts:x.ts,endpoint:x.endpoint,kind:x.kind,keys:x.keys||[]}))}));
  downloadJsonFile(`hok-assistant-diagnostics-${new Date().toISOString().slice(0,10)}.json`,{schemaVersion:DATA_SCHEMA_VERSION,exportedAt:Date.now(),extensionSyncState,accounts:safeAccounts});
}
function syncStateLabel(s){return({READY:"Ready",OPENING_CAMP:"Opening Camp",WAITING_FOR_CAMP:"Waiting for Camp",CAPTURING_PROFILE:"Capturing Profile",CAPTURING_POWER:"Capturing Power",CAPTURING_RANKINGS:"Capturing Rankings",VALIDATING:"Validating",SAVING:"Saving",UPDATED:"Updated",LOGIN_REQUIRED:"Login Required",WRONG_ACCOUNT:"Wrong Account",TIMEOUT:"Timed Out",PARTIAL:"Partial Update",API_CHANGED:"Camp API Changed",PERMISSION_REQUIRED:"Permission Required",NETWORK_OFFLINE:"Offline",CAMP_CLOSED:"Camp Closed",FAILED:"Failed"})[s]||String(s||"Ready")}
const SYNC_STEPS=["OPENING_CAMP","WAITING_FOR_CAMP","CAPTURING_PROFILE","VALIDATING","SAVING","UPDATED"];
function renderSyncPipeline(){
  const root=$("syncPipeline");if(!root)return;
  const current=extensionSyncState?.state||"READY",fail=["LOGIN_REQUIRED","WRONG_ACCOUNT","TIMEOUT","PARTIAL","API_CHANGED","PERMISSION_REQUIRED","NETWORK_OFFLINE","CAMP_CLOSED","FAILED"].includes(current);
  const idx=SYNC_STEPS.indexOf(current);
  root.innerHTML=SYNC_STEPS.map((s,i)=>`<span class="sync-step ${fail&&i===Math.max(0,idx)?"fail":idx>=0&&i<idx?"done":s===current?"active":current==="UPDATED"?"done":""}">${esc(syncStateLabel(s))}</span>`).join("");
  const box=$("syncFailureBox");if(!box)return;
  box.innerHTML=fail?`<div class="sync-failure"><strong>${esc(syncStateLabel(current))}</strong>${esc(extensionSyncState.message||"The sync did not complete. Existing data was not erased.")}<div class="row"><button type="button" class="btn" id="retrySyncInline">Retry</button><button type="button" class="btn" id="diagInline">Export Diagnostics</button></div></div>`:"";
}
function setExtensionSyncState(s,message="",extra={}){
  extensionSyncState={...extensionSyncState,...extra,state:s,updatedAt:Date.now(),message:message||syncStateLabel(s)};
  renderCampSyncDashboard();
  if(["TIMEOUT","FAILED","CAMP_CLOSED","API_CHANGED","LOGIN_REQUIRED","PERMISSION_REQUIRED","NETWORK_OFFLINE","WRONG_ACCOUNT"].includes(s))pushDiag("sync-failure",extensionSyncState.message,{state:s});
}

const hero=n=>HEROES.find(h=>h.n===n);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

const TYPE_TRAITS={"Vanguard Tank":["frontline","cc","engage","durable"],"Guardian Tank":["frontline","peel","cc","durable"],"Heavy Fighter":["frontline","sustain","damage","duelist"],"Duelist Fighter":["damage","duelist","mobility"],"Charger":["engage","mobility","cc","damage"],"Berserker":["sustain","damage","duelist"],"Assassin Fighter":["damage","mobility","duelist"],"Roving Assassin":["assassin","mobility","damage","splitpush"],"Burst Assassin":["assassin","burst","mobility"],"Ambush Mage":["burst","mobility","damage"],"Artillery Mage":["poke","waveclear","damage"],"Formation Mage":["zone","waveclear","damage"],"Control Mage":["cc","zone","waveclear","damage"],"DPS Marksman":["damage","dps","objective","scaling"],"Nimble Marksman":["damage","dps","mobility","objective"],"Artillery Marksman":["damage","poke","objective"],"Buff Support":["support","utility","sustain","peel"],"Tactical Support":["support","utility","peel"],"Offensive Support":["support","cc","engage"],"Defensive Support":["support","frontline","peel","cc"],"Tank Marksman":["sustain","objective","utility"]};
const BASE={"Vanguard Tank":[5,2,4],"Guardian Tank":[5,2,4],"Heavy Fighter":[5,4,4],"Duelist Fighter":[4,5,2],"Charger":[4,4,3],"Berserker":[5,4,3],"Assassin Fighter":[4,5,3],"Roving Assassin":[4,5,1],"Burst Assassin":[4,5,2],"Ambush Mage":[4,5,2],"Artillery Mage":[4,4,4],"Formation Mage":[4,4,3],"Control Mage":[4,3,4],"DPS Marksman":[3,5,4],"Nimble Marksman":[4,5,2],"Artillery Marksman":[3,5,3],"Buff Support":[3,2,4],"Tactical Support":[3,2,3],"Offensive Support":[4,2,3],"Defensive Support":[4,2,4],"Tank Marksman":[4,3,3],"Flexible":[3,3,3]};
const RANK_WEIGHT={"Gold":{solo:7,carry:5,ease:6,fit:8,meta:3},"Platinum":{solo:7,carry:5,ease:5,fit:9,meta:4},"Diamond":{solo:6,carry:5,ease:3,fit:10,meta:5},"Master":{solo:5,carry:4,ease:2,fit:11,meta:6},"Grandmaster":{solo:4,carry:4,ease:1,fit:12,meta:7}};
const TIER_SCORE={S:5,A:4,B:3,C:2};
const MATCHUP_SNAPSHOT="late September 2026";
const STRONG_AGAINST={"Alessio":["Han Xin","Mai Shiranui","Sima Yi"],"Allain":["Kongming","Milady","Yixing"],"Angela":["Augran","Diaochan","Jing"],"Arli":["Sima Yi","Zilong"],"Athena":["Da Qiao","Luna","Shi"],"Augran":["Luna","Shangguan","Zhou Yu"],"Biron":["Kongming","Shangguan","Ziya"],"Butterfly":["Heino","Gan & Mo","Diaochan"],"Cai Yan":["Arthur","Cirrus","Li Xin"],"Charlotte":["Lady Zhen","Mai Shiranui","Ziya"],"Daji":["Augran","Jing","Xuance"],"Dharma":["Heino","Mi Yue","Yixing"],"Di Renjie":["Mai Shiranui","Ukyo Tachibana","Ying"],"Dian Wei":["Zhou Yu","Yixing","Mi Yue"],"Diaochan":["Mulan","Nakoruru","Xuance"],"Dolia":["Dharma","Augran","Mozi"],"Donghuang":["Allain","Cirrus","Kaizer"],"Dr Bian":["Mai Shiranui","Diaochan"],"Dun":["Diaochan","Fang","Erin"],"Dyadia":["Dian Wei","Liu Bei","Musashi"],"Erin":["Ying","Han Xin","Lam"],"Fang":["Mai Shiranui","Nakoruru","Zilong"],"Fuzi":["Milady","Luna","Mai Shiranui"],"Gan & Mo":["Cirrus","Jing","Pei"],"Gao":["Mai Shiranui","Wukong","Xuance"],"Garo":["Nakoruru","Xuance","Li Bai"],"Guan Yu":["Daji","Mi Yue","Yixing"],"Guiguzi":["Li Xin","Mozi","Zilong"],"Han Xin":["Lu Bu","Dun","Xiang Yu"],"Haya":["Sakeer","Zilong","Milady"],"Heino":["Diaochan","Mulan","Wukong"],"Hou Yi":["Cirrus","Mulan","Xuance"],"Huang Zhong":["Xuance","Mai Shiranui","Jing"],"Jing":["Dharma","Ata","Lian Po"],"Kaizer":["Da Qiao","Diaochan","Daji"],"Kongming":["Han Xin","Jing","Ukyo Tachibana"],"Kui":["Kaizer","Xiang Yu"],"Lady Sun":["Diaochan","Nakoruru","Ying"],"Lady Zhen":["Cirrus","Nakoruru","Sima Yi"],"Lam":["Lu Bu","Wuyan","Xiang Yu"],"Li Bai":["Dun","Lian Po","Liu Shan"],"Li Xin":["Da Qiao","Liang"],"Lian Po":["Luban No.7","Marco Polo"],"Liang":["Han Xin","Lam","Mulan"],"Liu Bang":["Marco Polo","Meng Ya","Shouyue"],"Liu Bei":["Lady Zhen","Nuwa","Xiao Qiao"],"Liu Shan":["Arthur","Augran","Biron"],"Lu Bu":["Heino","Daji","Luna"],"Luara":["Diaochan","Mulan","Lam"],"Luban No.7":["Ying","Ukyo Tachibana","Lam"],"Luna":["Yuhuan","Lady Zhen","Heino"],"Marco Polo":["Cirrus","Mai Shiranui","Wukong"],"Mayene":["Nuwa","Mi Yue","Liang"],"Meng Ya":["Mai Shiranui","Pei","Diaochan"],"Menki":["Lady Zhen","Mai Shiranui","Xiao Qiao"],"Milady":["Nakoruru","Pei","Mai Shiranui"],"Ming":["Cirrus","Menki","Wuyan"],"Mozi":["Cirrus","Lam","Li Bai"],"Mulan":["Liang","Mi Yue","Nuwa"],"Musashi":["Diaochan","Luna","Shangguan"],"Nakoruru":["Wukong","Athena","Xiang Yu"],"Nezha":["Mai Shiranui","Mozi","Nuwa"],"Nuwa":["Mulan","Nakoruru","Pei"],"Pei":["Arthur","Lu Bu","Wuyan"],"Sakeer":["Ying","Luna"],"Shangguan":["Diaochan","Mulan","Sima Yi"],"Shi":["Li Bai","Wukong","Ukyo Tachibana"],"Shouyue":["Diaochan","Nakoruru","Ying"],"Sima Yi":["Lu Bu","Wuyan","Menki"],"Sun Bin":["Kaizer","Musashi"],"Sun Ce":["Liang","Gan & Mo","Mi Yue"],"Ukyo Tachibana":["Arthur","Lian Po","Wuyan"],"Wukong":["Dun","Lian Po","Xiang Yu"],"Wuyan":["Kongming","Lady Zhen","Liang"],"Xiao Qiao":["Ukyo Tachibana","Han Xin"],"Yang Jian":["Diaochan","Luna","Dr Bian"],"Yao":["Angela","Mi Yue","Ziya"],"Yaria":["Dian Wei","Dun","Mayene"],"Ying":["Kongming","Liang","Yuhuan"],"Yixing":["Augran","Cirrus","Lam"],"Yuhuan":["Mai Shiranui","Nakoruru","Wukong"],"Zhang Fei":["Arli","Consort Yu","Marco Polo"],"Zhou Yu":["Cirrus","Nakoruru","Xuance"],"Zhuangzi":["Cirrus","Dian Wei","Menki"],"Zilong":["Heino","Lady Zhen"],"Ziya":["Diaochan","Ying","Zilong"]};
const EXPLICIT_SYNERGY=[["Allain","Lam"],["Allain","Yaria"],["Lam","Lady Zhen"],["Lam","Gan & Mo"],["Lam","Mi Yue"],["Marco Polo","Dharma"],["Marco Polo","Liu Shan"],["Marco Polo","Zhang Fei"],["Liang","Dyadia"],["Liang","Ming"],["Liang","Yaria"],["Butterfly","Liu Bang"],["Butterfly","Yaria"],["Butterfly","Liu Shan"],["Ukyo Tachibana","Luna"],["Ukyo Tachibana","Mai Shiranui"],["Ukyo Tachibana","Xiao Qiao"],["Ying","Dyadia"],["Ying","Yaria"],["Ying","Zhuangzi"],["Da Qiao","Arli"],["Da Qiao","Di Renjie"],["Da Qiao","Shouyue"],["Dun","Luban No.7"],["Dun","Li Bai"],["Huang Zhong","Bai Qi"],["Huang Zhong","Xiang Yu"]];
const DIRECT_MATCHUP_EDGE_COUNT=249;
function traits(h){return TYPE_TRAITS[h?.archetype]||[]} function baseStats(h){return BASE[h?.archetype]||BASE.Flexible} function searchable(h){return [h.n,...(h.aliases||[]),h.lane,h.archetype].join(" ").toLowerCase()}
function displayName(h){if(!h)return "Unknown";if(h.n==="Wang Zhaojun")return "Princess Frost";if(h.n==="Gao Changgong")return "Prince of Lanling";if(h.n==="Ao'yin")return "Ao'yin / Loong";if(h.n==="Arli")return "Arli / Gongsun Li";return h.n}
function setStatus(s){$("status").textContent=s}

function showTab(name){
  const map={draft:"draftTab",roster:"rosterTab",power:"powerTab",accounts:"accountsTab"};
  for(const [k,id] of Object.entries(map)){$ (id).classList.toggle("hidden",k!==name)}
  document.querySelectorAll("#mainTabs .tab").forEach(b=>b.classList.toggle("active",b.dataset.tab===name));
  if(name==="roster")renderRoster();if(name==="power")renderPower();if(name==="accounts")renderAccounts();
  setStatus(name[0].toUpperCase()+name.slice(1)+" tab active.");
}

function compactUid(uid){if(!uid)return "UID not set";return uid.length>6?"UID ••••"+uid.slice(-4):"UID "+uid}
function renderQuickAccounts(){
  const root=$("quickAccounts");if(!root)return;
  root.innerHTML=state.accounts.map(a=>{
    const w=a.workspace||{},records=Object.values(a.heroPower||{}).filter(r=>Number.isFinite(Number(r?.current))),tracked=records.length;
    const latest=records.map(r=>Number(r?.updatedAt)||0).sort((x,y)=>y-x)[0]||0;
    return `<button type="button" class="quick-account ${a.id===state.active?"active":""}" data-quick-account="${esc(a.id)}" title="Switch to ${esc(a.name)}"><div class="quick-account-name">${esc(a.name)}</div><div class="quick-account-meta">${esc(compactUid(a.uid))} • ${a.owned.length} owned • ${tracked} tracked</div><div class="quick-account-meta"><span class="account-sync-dot ${tracked?"good":""}"></span>${tracked?(latest?"Power "+esc(relativeTime(latest))+" • ":"Manual Power • "):"No Power entered • "}${esc(w.rank||"Platinum")}</div></button>`
  }).join("")||`<div class="quick-account-empty">Create an account profile to begin.</div>`;
}
function renderAccounts(){
  $("accountSelect").innerHTML=state.accounts.map(a=>`<option value="${esc(a.id)}" ${a.id===state.active?"selected":""}>${esc(a.name)}${a.uid?" • "+esc(a.uid):""}</option>`).join("");
  $("accountList").innerHTML=state.accounts.map(a=>`<div class="power-row account-row" data-account-row="${esc(a.id)}"><div class="power-row-top"><div><div class="hero-name">${esc(a.name)}</div><div class="hero-meta">${a.owned.length} owned • ${Object.keys(a.heroPower||{}).length} power entries • ${(a.workspace||{}).rank||"Platinum"}</div></div><span class="uid-badge ${a.uid?"linked":""}">${a.uid?"UID "+esc(a.uid):"UID not set"}</span></div><div class="account-profile-grid" style="margin-top:9px"><div><label>Account label</label><input class="account-name-input" data-id="${esc(a.id)}" type="text" value="${esc(a.name)}" placeholder="Account label"/></div><div><label>HoK UID</label><input class="account-uid-input" data-id="${esc(a.id)}" type="text" inputmode="numeric" autocomplete="off" value="${esc(a.uid||"")}" placeholder="HoK UID"/></div><div><label>Rank</label><select class="account-rank-input" data-id="${esc(a.id)}">${["Gold","Platinum","Diamond","Master","Grandmaster"].map(r=>`<option ${((a.workspace||{}).rank||"Platinum")===r?"selected":""}>${r}</option>`).join("")}</select></div><div class="profile-save-wrap"><button type="button" class="btn account-save-profile" data-id="${esc(a.id)}">Save Profile</button></div></div><div class="row" style="margin-top:8px"><button type="button" class="btn account-use" data-id="${esc(a.id)}">Use Account</button>${state.accounts.length>1?`<button type="button" class="btn account-delete" data-id="${esc(a.id)}">Delete</button>`:""}</div></div>`).join("");
  renderQuickAccounts();
}
function activateAccount(id){
  if(id===state.active){renderQuickAccounts();return}
  save();
  const next=state.accounts.find(a=>a.id===id);if(!next)return;
  state.active=id;loadWorkspace(next);save();
  picker={group:"allies",index:0};pickerPage=1;
  timerRunning=false;if(timerHandle){clearInterval(timerHandle);timerHandle=null}draftPhase="pick";timerRemaining=PHASES.pick.seconds;
  renderAll();renderPower();
  setStatus("Switched to "+next.name+" • "+state.rank+". Roster, draft workspace and Hero Power data changed with the account.");
}
let lastDeletedAccount=null;
function deleteAccount(id){
  if(state.accounts.length<=1){setStatus("Keep at least one account profile.");return}
  const victim=state.accounts.find(a=>a.id===id);if(!victim)return;
  if(!confirm(`Remove ${victim.name}? You can undo during this session, and backups remain available.`))return;
  lastDeletedAccount={account:structuredClone(victim),index:state.accounts.findIndex(a=>a.id===id),wasActive:state.active===id};
  const wasActive=state.active===id;state.accounts=state.accounts.filter(a=>a.id!==id);
  if(wasActive){state.active=state.accounts[0].id;loadWorkspace(state.accounts[0])}
  save();renderAll();renderPower();setStatus("Account removed. Use Undo Delete in Accounts if needed.")
}
function undoDeleteAccount(){
  if(!lastDeletedAccount){setStatus("Nothing to undo.");return}
  const {account,index}=lastDeletedAccount;if(state.accounts.some(a=>a.id===account.id)){lastDeletedAccount=null;return}
  state.accounts.splice(Math.min(Math.max(index,0),state.accounts.length),0,account);lastDeletedAccount=null;save();renderAll();setStatus("Deleted account restored.")
}
function saveAccountProfile(id,row){
  const a=state.accounts.find(x=>x.id===id);if(!a)return;
  const name=(row?.querySelector(".account-name-input")?.value||"").trim();
  const uid=(row?.querySelector(".account-uid-input")?.value||"").trim();
  const rank=(row?.querySelector(".account-rank-input")?.value||"Platinum").trim();
  if(!name){setStatus("Account label cannot be blank.");return}
  if(uid&&state.accounts.some(x=>x.id!==id&&x.uid===uid)){setStatus("That HoK UID is already assigned to another account.");return}
  a.name=name;a.uid=uid;if(!a.workspace)a.workspace={};a.workspace.rank=rank;
  if(id===state.active){state.rank=rank}
  save();renderAll();renderPower();setStatus("Saved profile for "+name+" • "+rank+(uid?" • UID "+uid:""));
}
function powerRecord(a,name){if(!a.heroPower||typeof a.heroPower!=="object")a.heroPower={};return a.heroPower[name]||null}
function lastPowerDelta(rec){if(!rec)return null;if(Array.isArray(rec.history)&&rec.history.length>=2)return rec.history[rec.history.length-1].value-rec.history[rec.history.length-2].value;const d=Number(rec.reportedChange);return Number.isFinite(d)?d:null}
function formatPower(n){return Number(n||0).toLocaleString()}
function formatPowerDate(ts){if(!ts)return "Never";try{return new Date(ts).toLocaleString([], {month:"short",day:"numeric",hour:"numeric",minute:"2-digit"})}catch(e){return "Updated"}}
function relativeTime(ts){
  if(!ts)return "Never";
  const d=Math.max(0,Date.now()-Number(ts)),m=Math.floor(d/60000);
  if(m<1)return "just now";if(m<60)return m+"m ago";
  const h=Math.floor(m/60);if(h<24)return h+"h ago";
  const days=Math.floor(h/24);if(days<30)return days+"d ago";
  return Math.floor(days/30)+"mo ago";
}
function syncIsStale(a){return !!a?.lastCampSyncAt&&(Date.now()-Number(a.lastCampSyncAt)>86400000)}
function renderCampSyncDashboard(){
  const a=acct(),tracked=Object.values(a.heroPower||{}).filter(r=>Number.isFinite(Number(r?.current))).length,badge=$("campSyncBadge");
  if(!badge)return;
  badge.className="sync-badge good";badge.textContent="MANUAL MODE";
  $("campSyncSummary").innerHTML=[
    ["Account",esc(a.name||"—")],["UID",a.uid?esc(compactUid(a.uid)):"Not set"],["Tracked",String(tracked)],["Storage","Local"]
  ].map(x=>`<div class="sync-cell"><strong>${x[1]}</strong><span>${x[0]}</span></div>`).join("");
  $("campStaleWarning").innerHTML="";
  $("campSyncInfo").textContent=a.uid?"Open Camp when you want to check current Hero Power, then enter it below.":"Add this account's HoK UID under Accounts to enable the Camp shortcut.";
  const hist=(a.syncHistory||[]).filter(x=>x.method==="manual").slice(-10).reverse();
  $("campSyncHistory").innerHTML=hist.length?hist.map(x=>`<div class="sync-history-row"><span>${esc(formatPowerDate(x.ts))}</span><span>${x.hero?esc(displayName(hero(x.hero)))+" • ":""}${x.value!=null?formatPower(x.value):""}</span></div>`).join(""):`<div class="muted" style="padding:8px 0">No manual Power history for this account yet.</div>`;
}

function renderPowerLaneFilters(){const fs=["All","Clash Lane","Jungle","Mid Lane","Farm Lane","Roam"];$ ("powerLaneFilters").innerHTML=fs.map(f=>`<button type="button" class="btn mode ${powerLaneFilter===f?"active":""}" data-power-lane="${esc(f)}">${f==="All"?"All":f.replace(" Lane","")}</button>`).join("")}

function powerDetailsFor(a,name){return a?.powerDetails?.[name]||{}}
function rankingTargetFor(a,name){
  const t=a?.rankingTargets?.[name]||{};
  const candidates=[["localCutoff",t.localCutoff],["top100",t.top100],["top20",t.top20]].filter(x=>Number.isFinite(Number(x[1]))&&Number(x[1])>0);
  if(!candidates.length)return null;
  const [type,value]=candidates.sort((x,y)=>Number(x[1])-Number(y[1]))[0];return{type,value:Number(value)};
}
function rankGap(a,name){const r=powerRecord(a,name),t=rankingTargetFor(a,name);if(!t||!Number.isFinite(Number(r?.current)))return null;return Math.max(0,t.value-Number(r.current))}
function grindInfo(a,h){
  const r=powerRecord(a,h.n),d=powerDetailsFor(a,h.n),target=rankingTargetFor(a,h.n),cur=Number(r?.current)||0,wr=Number(r?.campWinRate),delta=lastPowerDelta(r)||0;
  if(Number.isFinite(Number(d.activenessMultiplier))&&Number(d.activenessMultiplier)<100)return{score:95+(100-Number(d.activenessMultiplier))/10,label:`Raise activeness from ${Math.round(d.activenessMultiplier)}% toward 100%`};
  if(target&&cur>0){const gap=Math.max(0,target.value-cur),ratio=gap/Math.max(1,target.value);return{score:85-ratio*45+(Number.isFinite(wr)?wr*10:0)+Math.min(10,Math.max(0,delta)/100),label:gap?`${formatPower(gap)} power to ${target.type==="top20"?"Top-20 reference":"ranking cutoff"}`:"At or above captured ranking target"}}
  if(Number.isFinite(wr)&&wr>=.6)return{score:55+wr*20+Math.min(10,Math.max(0,delta)/100),label:`Strong ${Math.round(wr*100)}% Camp win rate with room to build power`};
  return{score:30+Math.min(20,Math.max(0,delta)/50),label:delta>0?`Recent +${formatPower(delta)} momentum`:"No extended ranking target captured yet"};
}
function progressionAdvice(a,h){
  const d=powerDetailsFor(a,h.n),r=powerRecord(a,h.n),target=rankingTargetFor(a,h.n),cur=Number(r?.current)||0;
  if(Number.isFinite(Number(d.activenessMultiplier))&&Number(d.activenessMultiplier)<100)return `Raise Activeness first. ${Math.round(d.activenessMultiplier)}% is reducing the power multiplier.`;
  if(Number.isFinite(Number(d.rankedPerformancePower))&&Number(d.rankedPerformancePower)<250)return `Ranked Performance is the clearest headroom: ${formatPower(d.rankedPerformancePower)} / 500 captured.`;
  if(Number.isFinite(Number(d.victoryPower))&&Number(d.victoryPower)<1500)return `Victory Power has substantial headroom: ${formatPower(d.victoryPower)} / 3,000 captured.`;
  if(target&&cur<target.value)return `${formatPower(target.value-cur)} more Hero Power to the nearest captured ranking target.`;
  if(Number.isFinite(Number(r?.reportedChange))&&Number(r.reportedChange)>0)return `Current Camp sync reports +${formatPower(r.reportedChange)} power change. Keep the current momentum.`;
  return `Keep syncing after sessions so the assistant can identify the next efficient progression target.`;
}
let quickPowerDrafts={};
function quickDraftKey(accountId,heroName){return accountId+"::"+heroName}
function renderQuickPowerGrid(){
  const root=$("quickPowerGrid");if(!root)return;
  const a=acct(),owned=new Set(a.owned);
  const list=HEROES.filter(h=>owned.has(h.n)).sort((x,y)=>displayName(x).localeCompare(displayName(y)));
  root.innerHTML=list.length?list.map(h=>{
    const r=powerRecord(a,h.n),key=quickDraftKey(a.id,h.n),draft=quickPowerDrafts[key];
    const val=draft!==undefined?draft:(Number.isFinite(Number(r?.current))?r.current:"");
    const dirty=draft!==undefined&&String(draft)!==String(r?.current??"");
    return `<div class="quick-power-item ${dirty?"dirty":""}">
      <div class="quick-power-label"><strong>${esc(displayName(h))}</strong><span>${esc(h.lane)}</span></div>
      <input class="quick-power-input" data-quick-hero="${esc(h.n)}" type="number" min="0" step="1" inputmode="numeric" enterkeyhint="next" value="${esc(String(val))}" placeholder="Hero Power"/>
    </div>`
  }).join(""):`<div class="power-empty">Mark heroes as owned in Roster to use Quick Power Entry.</div>`;
}
function saveManualHeroPower(name,value,{rerender=true}={}){
  const a=acct(),n=Number(value);
  if(!Number.isFinite(n)||n<0){setStatus("Enter a valid non-negative Hero Power.");return false}
  if(!a.heroPower)a.heroPower={};if(!Array.isArray(a.syncHistory))a.syncHistory=[];
  const now=Date.now(),old=a.heroPower[name]||{current:null,best:null,history:[]};
  if(!Array.isArray(old.history))old.history=[];
  const previous=Number.isFinite(Number(old.current))?Number(old.current):null;
  if(previous!==n||!old.history.length)old.history.push({value:n,ts:now,source:"manual"});
  old.history=old.history.slice(-40);old.current=n;old.best=Math.max(Number(old.best)||0,n);old.updatedAt=now;old.source="manual";old.reportedChange=null;
  a.heroPower[name]=old;
  a.syncHistory.push({ts:now,count:1,method:"manual",hero:name,previous,value:n});
  a.syncHistory=a.syncHistory.slice(-50);
  delete quickPowerDrafts[quickDraftKey(a.id,name)];
  save();
  if(rerender){renderPower();renderAll()}
  return true;
}
function saveAllQuickPower(){
  const a=acct(),inputs=[...$("quickPowerGrid").querySelectorAll(".quick-power-input")];let count=0;
  for(const input of inputs){
    const name=input.dataset.quickHero,raw=input.value.trim();if(raw==="")continue;
    const n=Number(raw),r=powerRecord(a,name);if(!Number.isFinite(n)||n<0)continue;
    if(Number(r?.current)!==n){if(saveManualHeroPower(name,n,{rerender:false}))count++}
    delete quickPowerDrafts[quickDraftKey(a.id,name)];
  }
  save();renderPower();renderAll();
  setStatus(count?`Saved ${count} manual Hero Power update${count===1?"":"s"}.`:"No Hero Power changes to save.");
}
function clearQuickDrafts(){
  const a=acct();
  for(const k of Object.keys(quickPowerDrafts))if(k.startsWith(a.id+"::"))delete quickPowerDrafts[k];
  renderQuickPowerGrid();setStatus("Unsaved Hero Power edits cleared.");
}

function renderPower(){
  const a=acct();if(!a.heroPower)a.heroPower={};if(!Array.isArray(a.syncHistory))a.syncHistory=[];
  renderCampSyncDashboard();renderQuickPowerGrid();
  const entries=Object.entries(a.heroPower).filter(([name,r])=>r&&Number.isFinite(Number(r.current)));
  const tracked=entries.length,top=[...entries].sort((x,y)=>Number(y[1].current)-Number(x[1].current))[0]||null;
  const today=new Date().toDateString(),todayCount=(a.syncHistory||[]).filter(x=>x.method==="manual"&&new Date(x.ts).toDateString()===today).length;
  $("powerAccountHeader").innerHTML=`<div class="power-account"><div><strong>${esc(a.name)}</strong><div class="uid-line ${a.uid?"":"uid-missing"}">${a.uid?"HoK UID "+esc(a.uid):"No HoK UID linked"}</div></div><span class="uid-badge linked">Manual Power</span></div>`;
  $("powerSummary").innerHTML=`<div class="power-stat"><strong>${tracked}</strong><span>heroes tracked</span></div><div class="power-stat"><strong>${top?esc(displayName(hero(top[0])))+" • "+formatPower(top[1].current):"—"}</strong><span>highest current power</span></div><div class="power-stat"><strong>${todayCount}</strong><span>manual updates today</span></div>`;
  renderPowerLaneFilters();
  const q=$("powerSearch").value.toLowerCase().trim(),owned=new Set(a.owned);
  let list=HEROES.filter(h=>(owned.has(h.n)||powerRecord(a,h.n))&&(powerLaneFilter==="All"||h.lane===powerLaneFilter)&&searchable(h).includes(q));
  const deltaOf=h=>{const d=lastPowerDelta(powerRecord(a,h.n));return Number.isFinite(d)?d:0};
  const currentOf=h=>{const r=powerRecord(a,h.n);return Number.isFinite(Number(r?.current))?Number(r.current):-1};
  if(powerSort==="highest")list.sort((x,y)=>currentOf(y)-currentOf(x)||displayName(x).localeCompare(displayName(y)));
  else if(powerSort==="lowest")list.sort((x,y)=>(currentOf(x)<0?Infinity:currentOf(x))-(currentOf(y)<0?Infinity:currentOf(y))||displayName(x).localeCompare(displayName(y)));
  else if(powerSort==="gain")list.sort((x,y)=>deltaOf(y)-deltaOf(x)||currentOf(y)-currentOf(x));
  else if(powerSort==="loss")list.sort((x,y)=>deltaOf(x)-deltaOf(y)||currentOf(y)-currentOf(x));
  else list.sort((x,y)=>displayName(x).localeCompare(displayName(y)));
  $("powerList").innerHTML=list.length?list.map(h=>{
    const r=powerRecord(a,h.n),cur=r?.current??null,best=r?.best??cur,delta=lastPowerDelta(r),hist=(r?.history||[]).slice(-6).reverse();
    const dc=delta==null?"flat":delta>0?"up":delta<0?"down":"flat",ds=delta==null?"No previous manual comparison":(delta>0?"+":"")+formatPower(delta)+" since previous tracked value";
    const updated=r?.updatedAt?relativeTime(r.updatedAt):"Never";
    return `<div class="power-row">
      <div class="power-row-top"><div><div class="hero-name">${esc(displayName(h))}</div><div class="hero-meta">${esc(h.lane)} • ${owned.has(h.n)?"Owned roster":"Tracked"} • Manual</div></div><div style="text-align:right"><div class="power-current">${cur!=null?formatPower(cur):"—"}</div><div class="power-delta ${dc}">${esc(ds)}</div></div></div>
      <div class="manual-power-card">
        <div class="manual-power-stats">
          <div><strong>${cur!=null?formatPower(cur):"—"}</strong><span>Current Hero Power</span></div>
          <div><strong>${best!=null?formatPower(best):"—"}</strong><span>Personal best</span></div>
          <div><strong>${esc(updated)}</strong><span>Last updated</span></div>
        </div>
        <div class="manual-primary"><input class="power-input" data-hero="${esc(h.n)}" type="number" min="0" step="1" inputmode="numeric" enterkeyhint="done" value="${cur!=null?String(cur):""}" placeholder="Hero Power"/><button type="button" class="btn power-save" data-hero="${esc(h.n)}">Save Power</button></div>
        <div class="manual-note">Saved only to ${esc(a.name)}. Draft comfort uses this account's current value.</div>
      </div>
      ${hist.length?`<div class="power-history">${hist.map(x=>`<span class="history-chip">${formatPower(x.value)} • ${esc(formatPowerDate(x.ts))}</span>`).join("")}</div>`:""}
    </div>`
  }).join(""):`<div class="power-empty">No owned or manually tracked heroes match this filter.</div>`;
}
function saveHeroPower(name,inputEl){
  if(!inputEl)return;
  if(saveManualHeroPower(name,inputEl.value))setStatus(displayName(hero(name))+" Hero Power saved manually for "+acct().name+".");
}

function campNameToLocal(name){
  const direct=hero(name);if(direct)return direct.n;
  const aliases={"Princess Frost":"Wang Zhaojun","Prince of Lanling":"Gao Changgong","Gongsun Li":"Arli","Loong":"Ao'yin","Ao Yin":"Ao'yin","Kai":"Kaizer"};
  if(aliases[name]&&hero(aliases[name]))return aliases[name];
  const low=String(name||"").toLowerCase();
  const found=HEROES.find(h=>h.n.toLowerCase()===low||(h.aliases||[]).some(a=>a.toLowerCase()===low));
  return found?.n||null;
}

function normalizeCampProfilePayload(raw){
  if(!raw||typeof raw!=="object")return null;
  const queue=[raw];const seen=new Set();let depth=0;
  while(queue.length&&depth<80){
    const o=queue.shift();depth++;
    if(!o||typeof o!=="object"||seen.has(o))continue;seen.add(o);
    if(Array.isArray(o.heroList)){
      return {
        uid:String(o?.userBasicInfo?.uid??o?.uid??raw?.uid??""),
        characName:String(o?.userBasicInfo?.characName??o?.characName??raw?.characName??""),
        userBasicInfo:o.userBasicInfo||null,
        heroList:o.heroList,
        envelopeKeys:Object.keys(raw).slice(0,30),
        dataKeys:Object.keys(o).slice(0,40)
      };
    }
    for(const k of ["data","result","payload","body","response","content"]){
      if(o[k]&&typeof o[k]==="object")queue.push(o[k]);
    }
  }
  return null;
}
function validateCampHeroPayload(data){
  const normalized=normalizeCampProfilePayload(data);
  const heroList=normalized?.heroList||null;
  if(!heroList||!heroList.length){
    const msg=String(data?.returnMsg||data?.message||data?.msg||data?.data?.returnMsg||data?.data?.message||"");
    if(/login|log in|auth|unauthor|session|expired/i.test(msg))setExtensionSyncState("LOGIN_REQUIRED","HoK Camp needs you to sign in or re-authorize this account.");
    pushDiag("profile-shape-rejected","Camp profile response was captured but did not expose a usable heroList.",{
      envelopeKeys:data&&typeof data==="object"?Object.keys(data).slice(0,30):[],
      nestedDataKeys:data?.data&&typeof data.data==="object"?Object.keys(data.data).slice(0,40):[]
    });
    throw new Error(msg||"Camp profile response was captured, but its hero-list shape was not recognized. Existing data was left unchanged.");
  }
  if(heroList.length>500)throw new Error("Camp hero response was unexpectedly large.");
  const cleaned=[];
  for(const item of heroList){
    const heroId=safeNumber(item?.heroId,1,1000000),name=String(item?.heroName||"").trim(),power=safeNumber(item?.fightValue,0,100000);
    if(!name||power==null)continue;
    cleaned.push({...item,heroId,heroName:name,fightValue:power,
      fightChange:safeNumber(item?.fightChange,-100000,100000),
      totalCnt:safeNumber(item?.totalCnt,0,1000000),
      winRate:safeNumber(item?.winRate,0,1),
      score:safeNumber(item?.score,0,1000)});
  }
  if(!cleaned.length)throw new Error("Camp hero records did not contain valid Hero Power values.");
  return {heroList:cleaned,profile:normalized};
}
function applyCampHeroData(data,method="extension",rank=null,expectedAccountId=null){
  const info=$("campSyncInfo"),a=acct();
  try{
    setExtensionSyncState("VALIDATING","Validating Camp hero data.");
    if(expectedAccountId&&a.id!==expectedAccountId)throw new Error("The sync belongs to another assistant account. Switch to that account and retry.");
    const validated=validateCampHeroPayload(data),heroList=validated.heroList,profile=validated.profile||{};
    const uid=sanitizeUid(profile.uid??profile?.userBasicInfo?.uid??data?.userBasicInfo?.uid??data?.uid??"");
    const campName=String(profile.characName??profile?.userBasicInfo?.characName??data?.userBasicInfo?.characName??data?.characName??"").trim();
    pushDiag("profile-shape-accepted",`Camp hero profile recognized with ${heroList.length} hero records.`,{
      envelopeKeys:profile.envelopeKeys||[],
      dataKeys:profile.dataKeys||[]
    });
    if(a.uid&&uid&&sanitizeUid(a.uid)!==uid){setExtensionSyncState("WRONG_ACCOUNT","Camp returned a different HoK UID. No data was saved.");throw new Error("Camp returned UID "+uid+", but the active account uses UID "+a.uid+".");}
    if(!a.uid&&uid)a.uid=uid;
    if(campName&&(!a.name||/^Account\b|^Main Account$|^Alt/i.test(a.name)))a.name=campName;
    const previousSnapshot={ts:Date.now(),heroPower:structuredClone(a.heroPower||{}),powerDetails:structuredClone(a.powerDetails||{}),rankingTargets:structuredClone(a.rankingTargets||{})};
    const nextPower=structuredClone(a.heroPower||{});
    const nextOwned=[...a.owned];
    const now=Date.now();let imported=0,unmatched=[],addedOwned=0,suspicious=[];
    for(const item of heroList){
      const local=campNameToLocal(item?.heroName),value=Number(item?.fightValue);
      if(!local||!Number.isFinite(value)){if(item?.heroName)unmatched.push(String(item.heroName));continue}
      if(!nextOwned.includes(local)){nextOwned.push(local);addedOwned++}
      const old=nextPower[local]||{current:null,best:null,history:[]};
      if(!Array.isArray(old.history))old.history=[];
      if(Number.isFinite(Number(old.current))&&value>50000&&value>Number(old.current)*10){suspicious.push(local);continue}
      if(Number(old.current)!==value||!old.history.length)old.history.push({value,ts:now,source:"camp"});
      old.history=old.history.slice(-30);
      old.current=value;old.best=Math.max(Number(old.best)||0,value);old.updatedAt=now;old.source="camp";
      old.reportedChange=item.fightChange;
      old.campHeroId=item.heroId??null;old.campGames=item.totalCnt;old.campWinRate=item.winRate;old.campScore=item.score;
      old.campSkilledLevel=item?.skilledLevel??null;old.campHonorTitle=item?.honorTitle||null;old.campBranchType=item?.branchType??null;old.campSyncedAt=now;
      nextPower[local]=old;imported++;
    }
    if(!imported)throw new Error("No Camp heroes matched the assistant roster.");
    setExtensionSyncState("SAVING","Saving a validated snapshot.");
    a.lastGoodSnapshot=previousSnapshot;
    a.heroPower=nextPower;a.owned=nextOwned;
    if(rank){if(!a.workspace)a.workspace={};a.workspace.rank=rank;if(a.id===state.active)state.rank=rank}
    const hash=makeSyncHash(heroList);
    a.lastCampSyncAt=now;a.lastCampSyncCount=imported;a.campSyncMethod=method;a.lastSyncHash=hash;
    if(!Array.isArray(a.syncHistory))a.syncHistory=[];
    if(a.syncHistory.at(-1)?.hash!==hash)a.syncHistory.push({ts:now,count:imported,addedOwned,method,uid:a.uid||uid||"",hash});
    a.syncHistory=a.syncHistory.slice(-30);
    pushDiag("sync-success",`Imported ${imported} hero records.`,{method,unmatched:unmatched.length,suspicious:suspicious.length});
    save();renderAll();renderPower();
    info.textContent=`Updated ${imported} hero records${addedOwned?" • "+addedOwned+" added to roster":""}${rank?" • rank "+rank:""}${campName?" • "+campName:""}${unmatched.length?" • "+unmatched.length+" unmatched":""}${suspicious.length?" • "+suspicious.length+" suspicious values retained from prior snapshot":""}.`;
    setStatus("Camp sync imported "+imported+" Hero Power records for "+a.name+".");
    setExtensionSyncState(suspicious.length?"PARTIAL":"UPDATED",suspicious.length?"Sync completed with suspicious values preserved from the previous snapshot.":"Power update complete.");
    if(extensionAvailable())chrome.runtime.sendMessage({type:"HOK_SYNC_COMMIT_OK",accountId:a.id,uid:a.uid,count:imported}).catch?.(()=>{});
    return {imported,unmatched,uid,campName,suspicious};
  }catch(err){
    if(!["WRONG_ACCOUNT","PARTIAL"].includes(extensionSyncState.state))setExtensionSyncState("FAILED",err?.message||String(err));
    info.textContent="Camp sync failed: "+(err?.message||String(err));
    setStatus("Camp sync failed. Existing data was not erased.");
    if(extensionAvailable())chrome.runtime.sendMessage({type:"HOK_SYNC_COMMIT_FAIL",accountId:a?.id,reason:err?.message||String(err)}).catch?.(()=>{});
    return null;
  }
}

function walkObjects(value,path="",out=[]){
  if(value==null||typeof value!=="object")return out;
  if(Array.isArray(value)){value.forEach((v,i)=>walkObjects(v,path+"["+i+"]",out));return out}
  out.push({value,path});
  for(const [k,v] of Object.entries(value))if(v&&typeof v==="object")walkObjects(v,path?(path+"."+k):k,out);
  return out;
}
function resolveCampHeroObject(o){
  const name=String(o?.heroName||o?.name||o?.hero?.heroName||"").trim();
  if(name){const local=campNameToLocal(name);if(local)return local}
  const id=Number(o?.heroId??o?.hero?.heroId);
  if(Number.isFinite(id)){
    const a=acct();for(const [n,r] of Object.entries(a.heroPower||{}))if(Number(r?.campHeroId)===id)return n;
  }
  return null;
}
function firstNumeric(o,keys,min=-Infinity,max=Infinity){
  for(const k of keys){if(o&&Object.prototype.hasOwnProperty.call(o,k)){const n=safeNumber(o[k],min,max);if(n!=null)return n}}
  return null;
}
function applyExtendedCampData(payload,endpoint="unknown",kind="extended"){
  const a=acct();if(!a)return;
  if(!a.powerDetails)a.powerDetails={};if(!a.rankingTargets)a.rankingTargets={};if(!Array.isArray(a.extendedCaptures))a.extendedCaptures=[];
  let changed=0;
  for(const node of walkObjects(payload)){
    const o=node.value,local=resolveCampHeroObject(o);if(!local)continue;
    const d={...(a.powerDetails[local]||{})};
    const victory=firstNumeric(o,["victoryPower","winPower","victoryFightValue","winFightValue"],0,100000);
    const perf=firstNumeric(o,["rankedPerformancePower","performancePower","rankPerformancePower","rankFightValue"],0,100000);
    const active=firstNumeric(o,["activenessMultiplier","activityMultiplier","activeMultiplier","activityRate"],0,500);
    const peak=firstNumeric(o,["peakPerformancePower","peakPower","peakFightValue"],0,100000);
    const peakMult=firstNumeric(o,["peakMultiplier","peakPowerMultiplier"],0,500);
    if(victory!=null){d.victoryPower=victory;changed++}
    if(perf!=null){d.rankedPerformancePower=perf;changed++}
    if(active!=null){d.activenessMultiplier=active<=5?active*100:active;changed++}
    if(peak!=null){d.peakPerformancePower=peak;changed++}
    if(peakMult!=null){d.peakMultiplier=peakMult<=5?peakMult*100:peakMult;changed++}
    if(changed)d.updatedAt=Date.now();
    a.powerDetails[local]=d;
    const t={...(a.rankingTargets[local]||{})};
    const localCut=firstNumeric(o,["localCutoff","cityCutoff","minimumPower","minPowerToRank","rankThreshold","powerRequired"],0,100000);
    const top20=firstNumeric(o,["top20Power","top20Target","top20Threshold","percentile20Power"],0,100000);
    const top100=firstNumeric(o,["top100Power","rank100Power","lastWeekTop100","number100Power"],0,100000);
    if(localCut!=null){t.localCutoff=localCut;t.updatedAt=Date.now();changed++}
    if(top20!=null){t.top20=top20;t.updatedAt=Date.now();changed++}
    if(top100!=null){t.top100=top100;t.updatedAt=Date.now();changed++}
    a.rankingTargets[local]=t;
  }
  const keys=[...new Set(walkObjects(payload).flatMap(x=>Object.keys(x.value||{})))].slice(0,80);
  a.extendedCaptures.push({ts:Date.now(),endpoint,kind,keys});a.extendedCaptures=a.extendedCaptures.slice(-30);
  pushDiag("extended-capture",`Captured sanitized Camp response: ${endpoint}`,{kind,changed,keys:keys.slice(0,25)});
  save();renderPower();
  if(changed)setStatus(`Merged ${changed} extended Power/ranking field${changed===1?"":"s"} from Camp.`);
}
function openCampProfileForActiveAccount(){
  const a=acct(),info=$("campSyncInfo");
  if(!a.uid){info.textContent="Add the HoK UID for this account in Accounts first.";showTab("accounts");return}
  const url="https://camp.honorofkings.com/h5/app/index.html#/settings/personal-homepage?userType=3&visitor_id="+encodeURIComponent(a.uid);
  if(extensionAvailable()&&chrome.tabs?.create){
    chrome.tabs.create({url,active:true}).catch(err=>{info.textContent="Could not open Camp: "+(err?.message||String(err))});
  }else{
    const w=window.open(url,"hokCampReference");
    if(!w){info.textContent="The browser blocked the Camp tab. Allow pop-ups and try again.";return}
  }
  info.textContent="Camp opened for reference. Enter Hero Power manually in the assistant.";
  setStatus("Camp profile opened. Manual Hero Power mode is active.");
}

async function copyCampBridgeHelper(){
  const info=$("campSyncInfo");
  try{
    if(navigator.clipboard&&navigator.clipboard.writeText){
      await navigator.clipboard.writeText(CAMP_BRIDGE_BOOKMARKLET);
      info.textContent="Bookmark helper copied. Create/edit a bookmark named “HoK Sync” and paste it into the bookmark URL/address field.";
      setStatus("Camp Sync helper copied to clipboard.");
      return;
    }
  }catch(e){}
  window.prompt("Copy this entire bookmark URL, then save it as a bookmark named HoK Sync:",CAMP_BRIDGE_BOOKMARKLET);
  info.textContent="Helper shown in a copy box. Save it as the URL of a bookmark named “HoK Sync”.";
}

async function importCampBridgeJsonFile(file){
  const info=$("campSyncInfo");
  if(!file){info.textContent="Choose a Camp bridge JSON file first.";return}
  try{
    const j=JSON.parse(await file.text()),payload=j?.payload||j;
    if(payload?.source!=="camp-bridge"&&!Array.isArray(payload?.heroList))throw new Error("This does not look like a HoK Camp bridge export.");
    applyCampHeroData(payload,"bridge-json");
  }catch(err){
    info.textContent="Bridge JSON import failed: "+(err?.message||String(err));
    setStatus("Camp bridge JSON import failed.");
  }
}

function receiveCampBridgeMessage(event){
  if(event.origin!=="https://camp.honorofkings.com")return;
  const msg=event.data;
  if(!msg||msg.type!=="HOK_CAMP_BRIDGE"||!msg.payload)return;
  applyCampHeroData(msg.payload,"bridge");
}

function harResponseJson(entry){
  try{
    const c=entry?.response?.content||{};let t=c.text;
    if(!t)return null;
    if(c.encoding==="base64")t=atob(t);
    return JSON.parse(t);
  }catch(e){return null}
}
function extractCampRank(harEntries){
  for(let i=harEntries.length-1;i>=0;i--){
    const e=harEntries[i],url=e?.request?.url||"";
    if(!url.includes("/game/profile/index"))continue;
    const j=harResponseJson(e),mods=j?.data?.head?.mods||[];
    for(const m of mods){
      const n=String(m?.name||"");
      if(/^Grandmaster\b/i.test(n))return "Grandmaster";
      if(/^Master\b/i.test(n))return "Master";
      if(/^Diamond\b/i.test(n))return "Diamond";
      if(/^Platinum\b/i.test(n))return "Platinum";
      if(/^Gold\b/i.test(n))return "Gold";
    }
  }
  return null;
}
async function importCampHarFile(file){
  const info=$("campSyncInfo"),a=acct();
  if(!file){info.textContent="Choose a legacy .har file first.";return}
  info.textContent="Reading legacy HAR locally…";
  try{
    const raw=await file.text(),har=JSON.parse(raw),entries=har?.log?.entries;
    if(!Array.isArray(entries))throw new Error("This file does not contain a HAR entries list.");
    let payload=null;
    for(let i=entries.length-1;i>=0;i--){
      const e=entries[i],url=e?.request?.url||"";
      if(!url.includes("/api/game/user/getprofileherolist"))continue;
      const j=harResponseJson(e);
      if(j?.data?.heroList&&Array.isArray(j.data.heroList)){payload=j;break}
    }
    if(!payload)throw new Error("No Camp getprofileherolist response was found.");
    const rank=extractCampRank(entries);
    const result=applyCampHeroData(payload.data,"har",rank);
    if(!result)throw new Error("Camp hero data could not be applied.");
  }catch(err){
    info.textContent="Import failed: "+(err?.message||String(err));
    setStatus("Camp sync import failed.");
  }
}


function renderSlots(){for(const g of ["allies","enemies","bans"]){const root=$(g==="allies"?"allySlots":g==="enemies"?"enemySlots":"banSlots");const arr=(g==="allies"&&isBlindRank())?state[g].slice(0,4):state[g];root.innerHTML=arr.map((n,i)=>{const h=hero(n),emptyLabel=(g==="allies"&&isBlindRank())?`teammate ${i+1}`:`${g.slice(0,-1)} ${i+1}`;return `<button type="button" class="slot ${n?"filled":""}" data-slot-group="${g}" data-slot-index="${i}">${n?`<span class="x" data-clear="1">×</span><div>${esc(displayName(h))}<small>${esc(h?.lane||"")}</small></div>`:emptyLabel}</button>`}).join("")}}
function renderModes(){const groups=isBlindRank()?["allies"]:["allies","enemies","bans"];if(isBlindRank()&&picker.group!=="allies")picker={group:"allies",index:0};$("modeButtons").innerHTML=groups.map(g=>`<button type="button" class="btn mode ${picker.group===g?"active":""}" data-mode="${g}">${isBlindRank()?"Teammates":g[0].toUpperCase()+g.slice(1)}</button>`).join("")}
function available(n){const used=isBlindRank()?visibleAllies():[...state.allies,...state.enemies,...state.bans];return !used.includes(n)}
function renderPickerLaneFilters(){const filters=["All","Clash Lane","Jungle","Mid Lane","Farm Lane","Roam"];$('pickerLaneFilters').innerHTML=filters.map(f=>`<button type="button" class="btn mode ${pickerLaneFilter===f?"active":""}" data-picker-lane="${esc(f)}">${f==="All"?"All":f.replace(" Lane","")}</button>`).join("");$('pickerOwnedToggle').classList.toggle('active',pickerOwnedOnly);$('pickerOwnedToggle').textContent='Owned only: '+(pickerOwnedOnly?'On':'Off')}
function renderPicker(){const q=$("heroSearch").value.toLowerCase().trim(),owned=new Set(acct().owned);let filtered=HEROES.filter(h=>searchable(h).includes(q)&&(pickerLaneFilter==="All"||h.lane===pickerLaneFilter)&&(!pickerOwnedOnly||owned.has(h.n)));const pages=Math.max(1,Math.ceil(filtered.length/PICKER_PAGE_SIZE));pickerPage=Math.min(Math.max(1,pickerPage),pages);const start=(pickerPage-1)*PICKER_PAGE_SIZE,shown=filtered.slice(start,start+PICKER_PAGE_SIZE);$("pickerResultCount").textContent=filtered.length+" hero"+(filtered.length===1?"":"es");$("pickerPageInfo").textContent=pickerPage+" / "+pages;$("pickerPrev").disabled=pickerPage<=1;$("pickerNext").disabled=pickerPage>=pages;$("heroPicker").innerHTML=shown.length?shown.map(h=>`<button type="button" class="hero hero-pick" data-hero="${esc(h.n)}" ${available(h.n)?"":"disabled"}><div><div class="hero-name">${esc(displayName(h))}</div><div class="hero-meta">${esc(h.lane)} • ${esc(h.archetype)}</div></div><div><span class="pill tier${h.tier}">${h.tier}</span> <span class="pill ${owned.has(h.n)?"owned":""}">${owned.has(h.n)?"OWNED":"NOT OWNED"}</span></div></button>`).join(""):`<div class="picker-empty">No heroes match these filters.</div>`}
function pickHero(n){if(!available(n))return;const arr=state[picker.group],limit=(isBlindRank()&&picker.group==="allies")?4:arr.length;let i=Math.min(picker.index,limit-1);if(arr[i]){i=-1;for(let j=0;j<limit;j++){if(!arr[j]){i=j;break}}}if(i<0)i=0;arr[i]=n;let next=-1;for(let j=i+1;j<limit;j++){if(!arr[j]){next=j;break}}if(next>=0)picker.index=next;save();renderSlots();renderPicker();liveAnalyze();setStatus(displayName(hero(n))+" added to "+(isBlindRank()?"teammates":""+picker.group)+".")}
function renderRosterFilters(){const fs=["All","Clash Lane","Jungle","Mid Lane","Farm Lane","Roam"];$("rosterFilters").innerHTML=fs.map(f=>`<button type="button" class="btn mode ${rosterFilter===f?"active":""}" data-roster-filter="${f}">${f==="All"?"All":f.replace(" Lane","")}</button>`).join("")}
function renderRoster(){const q=$("rosterSearch").value.toLowerCase().trim(),a=acct(),owned=new Set(a.owned),list=HEROES.filter(h=>(rosterFilter==="All"||h.lane===rosterFilter)&&searchable(h).includes(q));$("ownedCount").textContent=a.owned.length;$("rosterList").innerHTML=list.map(h=>`<button type="button" class="hero roster-hero" data-hero="${esc(h.n)}"><div><div class="hero-name">${esc(displayName(h))}</div><div class="hero-meta">${esc(h.lane)} • ${esc(h.archetype)}</div></div><div><span class="pill tier${h.tier}">${h.tier}</span> <span class="pill ${owned.has(h.n)?"owned":""}">${owned.has(h.n)?"OWNED":"ADD"}</span></div></button>`).join("")}
function toggleOwned(n){const a=acct();a.owned=a.owned.includes(n)?a.owned.filter(x=>x!==n):[...a.owned,n];save();renderRoster();renderPicker();renderAccounts();renderPower();liveAnalyze();setStatus(displayName(hero(n))+(a.owned.includes(n)?" added to roster.":" removed from roster."))}
function composition(names){const hs=names.filter(Boolean).map(hero).filter(Boolean),c=t=>hs.filter(h=>traits(h).includes(t)).length;return{count:hs.length,frontline:c("frontline"),cc:c("cc"),engage:c("engage"),damage:c("damage")+c("burst")+c("dps"),peel:c("peel"),mobility:c("mobility"),poke:c("poke"),sustain:c("sustain"),assassin:c("assassin"),dps:c("dps"),support:c("support"),squishy:hs.filter(h=>["Mid Lane","Farm Lane"].includes(h.lane)).length}}
function allyIssues(){const allyNames=visibleAllies(),t=composition(allyNames),out=[];if(t.frontline===0)out.push("No frontline");if(t.cc===0)out.push("Low crowd control");if(t.engage===0)out.push("No reliable engage");if(t.damage<=1&&t.count>=2)out.push("Low damage pressure");if(t.peel===0&&t.squishy>=2)out.push("Backline lacks peel");const farms=allyNames.filter(Boolean).map(hero).filter(h=>h?.lane==="Farm Lane").length;if(farms>=2)out.push("Multiple farm carries");if(t.frontline===0&&t.squishy>=3)out.push("Fragile composition");return out}
function enemyProfile(){if(isBlindRank())return[];const t=composition(state.enemies),out=[];if(t.assassin>=2||t.engage>=2)out.push("Heavy dive");if(t.frontline>=2)out.push("Heavy frontline");if(t.squishy>=3)out.push("Exposed backline");if(t.cc>=3)out.push("Heavy CC");if(t.sustain>=2)out.push("High sustain");return out}
function fitScore(h,issues,enemy){const tr=traits(h);let x=0;if(issues.includes("No frontline")&&tr.includes("frontline"))x+=4;if(issues.includes("Low crowd control")&&tr.includes("cc"))x+=3;if(issues.includes("No reliable engage")&&tr.includes("engage"))x+=3;if(issues.includes("Low damage pressure")&&(tr.includes("damage")||tr.includes("burst")||tr.includes("dps")))x+=3;if(issues.includes("Backline lacks peel")&&tr.includes("peel"))x+=3;if(issues.includes("Fragile composition")&&(tr.includes("frontline")||tr.includes("peel")))x+=3;if(enemy.includes("Heavy dive")&&(tr.includes("frontline")||tr.includes("peel")||tr.includes("cc")))x+=2.5;if(enemy.includes("Heavy frontline")&&tr.includes("dps"))x+=2.5;if(enemy.includes("Exposed backline")&&(tr.includes("engage")||tr.includes("assassin")||tr.includes("mobility")))x+=2;if(enemy.includes("Heavy CC")&&(tr.includes("poke")||tr.includes("durable")))x+=1.5;return x}
function directCountersOf(name){const out=[];for(const [attacker,targets] of Object.entries(STRONG_AGAINST))if(targets.includes(name))out.push(attacker);return out}
function matchupInfo(h){
  if(isBlindRank())return{strong:[],danger:[],laneStrong:[],laneDanger:[],score:0,evidence:0};
  const enemies=state.enemies.filter(Boolean),strong=(STRONG_AGAINST[h.n]||[]).filter(n=>enemies.includes(n)),danger=directCountersOf(h.n).filter(n=>enemies.includes(n));
  const laneStrong=strong.filter(n=>hero(n)?.lane===h.lane),laneDanger=danger.filter(n=>hero(n)?.lane===h.lane);
  const rankScale={Gold:.75,Platinum:.85,Diamond:1,Master:1.1,Grandmaster:1.2}[state.rank]||1;
  let raw=0;
  strong.forEach((n,i)=>raw+=(i===0?11:7));
  danger.forEach((n,i)=>raw-=(i===0?13:9));
  raw+=laneStrong.length*5-laneDanger.length*7;
  return{strong,danger,laneStrong,laneDanger,score:raw*rankScale,evidence:strong.length+danger.length};
}
function explicitSynergyPartners(name){const out=[];for(const pair of EXPLICIT_SYNERGY){if(pair[0]===name)out.push(pair[1]);else if(pair[1]===name)out.push(pair[0])}return out}
function synergyInfo(h){const allies=visibleAllies().filter(Boolean),explicit=explicitSynergyPartners(h.n).filter(n=>allies.includes(n)),labels=[],tr=traits(h);let generic=0;const allyHeroes=allies.map(hero).filter(Boolean);const allyTraits=new Set(allyHeroes.flatMap(a=>traits(a)));const allyHasFarm=allyHeroes.some(a=>a.lane==="Farm Lane");const allyHasSquishy=allyHeroes.filter(a=>["Farm Lane","Mid Lane"].includes(a.lane)).length>=2;if((tr.includes("frontline")||tr.includes("peel"))&&allyHasSquishy){generic+=3;labels.push("frontline for carries")}if(tr.includes("engage")&&(allyTraits.has("burst")||allyTraits.has("damage")||allyTraits.has("dps"))){generic+=2;labels.push("engage + follow-up")}if(tr.includes("cc")&&allyTraits.has("assassin")){generic+=2;labels.push("CC setup for assassin")}if((tr.includes("dps")||tr.includes("damage"))&&(allyTraits.has("frontline")||allyTraits.has("cc"))){generic+=2;labels.push("damage behind setup")}if((tr.includes("support")||tr.includes("peel"))&&allyHasFarm){generic+=2;labels.push("protects farm carry")}if(tr.includes("assassin")&&(allyTraits.has("cc")||allyTraits.has("engage"))){generic+=2;labels.push("assassin follow-up")}generic=Math.min(generic,7);return{explicit,labels:[...new Set(labels)].slice(0,3),score:explicit.length*9+generic}}
function blindPickBonus(h){const enemies=isBlindRank()?0:state.enemies.filter(Boolean).length;if(enemies>=2)return 0;const [solo,carry,ease]=baseStats(h),tr=traits(h);let b=(solo-3)*(isBlindRank()?5:3)+(ease-2)*(isBlindRank()?3:2);if(tr.includes("sustain")||tr.includes("mobility")||tr.includes("frontline"))b+=isBlindRank()?4:2;return Math.max(0,b)}

function heroPowerComfort(h){
  const a=acct(),r=powerRecord(a,h.n),cur=Number(r?.current);
  if(!Number.isFinite(cur)||cur<=0)return{score:0,current:null,percentile:null,fresh:false,label:"No account power"};
  const vals=a.owned.map(n=>hero(n)).filter(x=>x&&x.lane===h.lane).map(x=>Number(powerRecord(a,x.n)?.current)).filter(v=>Number.isFinite(v)&&v>0).sort((x,y)=>x-y);
  let percentile=.5;
  if(vals.length>1){const below=vals.filter(v=>v<cur).length,equal=vals.filter(v=>v===cur).length;percentile=(below+Math.max(0,equal-1)/2)/(vals.length-1)}
  const fresh=!!a.lastCampSyncAt&&!syncIsStale(a);
  let score=vals.length===1?4:2+8*Math.max(0,Math.min(1,percentile));
  if(!fresh)score*=.75;
  score=Math.min(10,Math.max(1,score));
  return{score,current:cur,percentile,fresh,label:`${formatPower(cur)} account power`};
}

const ITEM_KIND={
  "Boots of Fortitude":"defense","Boots of Resistance":"defense","Boots of Dexterity":"core","Boots of the Arcane":"core","Boots of Tranquility":"core",
  "Blazing Cape":"defense","Ominous Premonition":"defense","Eye of the Phoenix":"defense","Frigid Charge":"defense","Glacial Buckler":"defense","Succubus Cloak":"defense","Spikemail":"counter","Longnight Guardian":"defense","Sage's Sanctuary":"defense",
  "Axe of Torment":"core","Pure Sky":"core","Starbreaker":"counter","Cuirass of Savagery":"core","Overlord's Might":"core","Blood Rage":"core","Frostscar's Embrace":"defense","Mortal Punisher":"counter",
  "Doomsday":"core","Shadow Ripper":"core","Eternity Blade":"core","Daybreaker's Virtue":"counter","Bloodweeper":"core","Sunchaser":"core","Master Sword":"core","Sparkforged Dagger":"core",
  "Scepter of Reverberation":"core","Savant's Wrath":"core","Insatiable Tome":"core","Void Staff":"counter","Venomous Staff":"counter","Frozen Breath":"core","Mask of Agony":"core","Splendor":"defense","Holy Grail":"core",
  "Guardian - Radiance":"core","Guardian - Redemption":"core","Guardian - Starspring":"core","Dawnlight":"core","Crimson Shadow - Radiance":"core","Crimson Shadow - Redemption":"core",
  "Rapacious Bite":"core","Runeblade":"core","Giant's Grip":"core","Dragon's Rage":"core","Deepfrost Siege":"core","Twinblades of Destruction":"core","Meteor":"core","Nettle Gauntlet":"core","Relentless Blade":"core"
};
const BUILD_OVERRIDES={
  "Dun":{label:"Full tank",items:["Boots of Fortitude","Blazing Cape","Ominous Premonition","Eye of the Phoenix","Frigid Charge","Glacial Buckler"],spell:"Execute",arcana:"Fate • Hunt • Void",source:"Curated S16 public build baseline"},
  "Sun Ce":{label:"AD penetration",items:["Meteor","Boots of Fortitude","Axe of Torment","Frigid Charge","Succubus Cloak","Spikemail"],spell:"Flash",arcana:"Red Moon • Mutation • Hunt",source:"Curated S16 public build baseline"},
  "Umbrosa":{label:"Sustained fighter",items:["Boots of Fortitude","Axe of Torment","Deepfrost Siege","Spikemail","Overlord's Might","Pure Sky"],spell:"Flash",arcana:"Mutation • Hunt • Eagle Eye",source:"Curated S16 public build baseline"},
  "Chicha":{label:"Attack speed",items:["Twinblades of Destruction","Boots of Dexterity","Sparkforged Dagger","Doomsday","Spikemail","Daybreaker's Virtue"],spell:"Flash",arcana:"Attack-speed fighter preset",source:"Curated S16 public build baseline"}
};
function genericBuild(h){
  const a=h.archetype.toLowerCase(),lane=h.lane;
  if(a.includes("tank"))return{label:"Tank teamfight",items:["Boots of Fortitude","Blazing Cape","Ominous Premonition","Succubus Cloak","Frigid Charge","Sage's Sanctuary"],spell:lane==="Roam"?"Flash":"Execute",arcana:"Tank / durability preset",source:"Archetype fallback"};
  if(a.includes("support"))return{label:"Utility support",items:["Boots of Tranquility","Guardian - Radiance","Dawnlight","Ominous Premonition","Succubus Cloak","Frigid Charge"],spell:"Flash",arcana:"Support / cooldown preset",source:"Archetype fallback"};
  if(a.includes("mage"))return{label:a.includes("ambush")?"Burst magic":"Magic damage",items:["Boots of the Arcane","Scepter of Reverberation","Savant's Wrath","Insatiable Tome","Void Staff","Splendor"],spell:"Flash",arcana:"Magic penetration preset",source:"Archetype fallback"};
  if(a.includes("marksman"))return{label:a.includes("dps")?"DPS marksman":"Carry marksman",items:["Boots of Dexterity","Doomsday","Shadow Ripper","Eternity Blade","Daybreaker's Virtue","Bloodweeper"],spell:"Flash",arcana:"Attack speed / crit preset",source:"Archetype fallback"};
  if(a.includes("assassin"))return{label:"Burst assassin",items:[lane==="Jungle"?"Rapacious Bite":"Boots of Resistance","Boots of Resistance","Axe of Torment","Cuirass of Savagery","Starbreaker","Sage's Sanctuary"].slice(0,6),spell:lane==="Jungle"?"Smite":"Flash",arcana:"Physical penetration preset",source:"Archetype fallback"};
  return{label:"Bruiser",items:[lane==="Jungle"?"Rapacious Bite":"Boots of Resistance","Axe of Torment","Pure Sky","Cuirass of Savagery","Starbreaker","Sage's Sanctuary"].slice(0,6),spell:lane==="Jungle"?"Smite":"Flash",arcana:"Fighter / penetration preset",source:"Archetype fallback"};
}
function enemyBuildSignals(){
  if(isBlindRank())return{blind:true,frontline:false,sustain:false,dive:false,cc:false};
  const p=enemyProfile();return{blind:false,frontline:p.includes("Heavy frontline"),sustain:p.includes("High sustain"),dive:p.includes("Heavy dive"),cc:p.includes("Heavy CC")};
}
function swapOne(items,from,to){const x=[...items],i=x.indexOf(from);if(i>=0)x[i]=to;else if(!x.includes(to))x[x.length-1]=to;return x}
function adaptiveBuild(h){
  const base=structuredClone(BUILD_OVERRIDES[h.n]||genericBuild(h)),sig=enemyBuildSignals(),variants=[];
  const safe={...base,label:sig.blind?"Safe blind":"Standard",items:[...base.items]};
  variants.push({name:"Standard",items:[...safe.items],why:"Balanced baseline when no specific enemy itemization pressure is confirmed."});
  let chosen={...safe,why:sig.blind?"Enemy draft is hidden. Start with the safe core and adapt after loading in.":"The current draft does not force a stronger build pivot."};
  const isMagic=h.archetype.includes("Mage"),isTank=h.archetype.includes("Tank")||h.archetype.includes("Support"),isMarks=h.archetype.includes("Marksman");
  if(sig.sustain){
    const anti=isMagic?"Venomous Staff":"Mortal Punisher";let items=[...base.items];if(!items.includes(anti))items[isTank?5:4]=anti;
    variants.push({name:"Anti-heal",items,why:`Enemy sustain is high; add ${anti}.`});chosen={...base,label:"Anti-heal",items,why:`High enemy sustain makes ${anti} the most valuable counter pivot.`};
  }
  if(sig.frontline){
    let items=[...base.items],anti=isMagic?"Void Staff":(isMarks?"Daybreaker's Virtue":"Starbreaker");if(!items.includes(anti))items[4]=anti;
    variants.push({name:"Anti-tank",items,why:`Multiple frontliners increase the value of ${anti}.`});if(!sig.sustain)chosen={...base,label:"Anti-tank",items,why:`The enemy has heavy frontline, so penetration becomes a higher priority.`};
  }
  if(sig.dive||sig.cc){
    let items=[...base.items];const defensive=isTank?"Longnight Guardian":"Sage's Sanctuary";if(!items.includes(defensive))items[5]=defensive;if(sig.cc&&items.includes("Boots of Fortitude"))items=swapOne(items,"Boots of Fortitude","Boots of Resistance");
    variants.push({name:"Anti-burst",items,why:`Enemy ${sig.cc?"control":"dive"} pressure warrants earlier survivability.`});if(!sig.sustain&&!sig.frontline)chosen={...base,label:"Anti-burst",items,why:`The draft shows heavy ${sig.cc?"crowd control":"dive"}, so survivability is prioritized over greedier damage.`};
  }
  const swaps=[];if(!sig.blind){swaps.push("Heavy healing → anti-heal");swaps.push("2+ frontliners → penetration");if(sig.cc||sig.dive)swaps.push("Burst/CC → defensive slot earlier")}else{swaps.push("See heavy healing → anti-heal");swaps.push("See tanks stacking defense → penetration");swaps.push("Getting bursted → defensive slot")}
  return{...chosen,spell:base.spell,arcana:base.arcana,source:base.source,variants:variants.slice(0,3),swaps};
}
function itemInitials(name){return name.split(/\s+/).filter(Boolean).map(x=>x[0]).join("").replace(/[^A-Z0-9]/g,"").slice(0,3)||"IT"}
function renderBuildPreview(h){
  const b=adaptiveBuild(h);
  const items=b.items.slice(0,6).map((it,i)=>`<div class="item-card ${ITEM_KIND[it]||""}"><div class="item-icon">${esc(itemInitials(it))}</div><div class="item-name">${esc(it)}</div><div class="item-num">${i+1}</div></div>`).join("");
  const vars=b.variants.map((v,i)=>`<div class="variant-card ${i===0&&b.label==="Standard"?"recommended":v.name===b.label?"recommended":""}"><strong>${esc(v.name)}</strong><span>${esc(v.why)}</span></div>`).join("");
  return `<div class="build-preview"><div class="build-head"><div class="build-title">Adaptive Build Preview</div><span class="build-badge">${esc(b.label)}</span></div><div class="item-strip">${items}</div><div class="build-reason">${esc(b.why)} <span class="muted">• ${esc(b.source)}</span></div><div class="build-swaps">${b.swaps.map(x=>`<span class="swap-chip">${esc(x)}</span>`).join("")}</div><details class="build-details"><summary>Show alternatives, spell & Arcana</summary><div class="build-variants">${vars}</div><div class="hero-meta" style="margin-top:7px">Spell: ${esc(b.spell)} • Arcana: ${esc(b.arcana)}</div></details></div>`;
}
function scoreBreakdown(h){const [solo,carry,ease]=baseStats(h),w=RANK_WEIGHT[state.rank],issues=allyIssues(),enemy=enemyProfile(),match=matchupInfo(h),syn=synergyInfo(h),comfort=heroPowerComfort(h);const soloPart=solo*w.solo+carry*w.carry+ease*w.ease;const repairPart=fitScore(h,issues,enemy)*w.fit;const metaPart=TIER_SCORE[h.tier]*w.meta;const blindPart=blindPickBonus(h);const comfortPart=comfort.score;const total=soloPart+repairPart+metaPart+match.score+syn.score+blindPart+comfortPart;return{total,soloPart,repairPart,metaPart,blindPart,comfortPart,comfort,match,syn}}
function scoreHero(h){return scoreBreakdown(h).total}
function confidenceInfo(h,b){const allies=visibleAllies().filter(Boolean).length,enemies=isBlindRank()?0:state.enemies.filter(Boolean).length,total=allies+enemies;let level="Low",why=isBlindRank()?"Limited teammate information":"Sparse draft information";if(isBlindRank()){if(allies>=3){level="High";why="Most teammate choices visible"}else if(allies>=1){level="Medium";why="Partial teammate composition"}}else if((b.match.evidence>=1&&total>=4)||total>=7){level="High";why=b.match.evidence?"Direct matchup evidence + developed draft":"Developed team compositions"}else if(total>=3||b.match.evidence>=1){level="Medium";why=b.match.evidence?"Some direct matchup evidence":"Partial composition information"}return{level,why,cls:level.toLowerCase()}}
function pickType(h,b){const [solo,carry,ease]=baseStats(h);if(isBlindRank()){if(b.repairPart>=30)return{label:"Team fix",cls:"teamfix"};if(b.syn.explicit.length)return{label:"Synergy pick",cls:"synergy"};if(solo>=4&&ease>=3)return{label:"Safe blind pick",cls:"safe"};if(carry>=5)return{label:"Carry pick",cls:"carry"};return{label:"Balanced blind pick",cls:"safe"}}if(b.match.laneDanger.length)return{label:"Risky countered pick",cls:"risk"};if(b.match.laneStrong.length||b.match.strong.length>=2)return{label:"Counterpick",cls:"counter"};if(b.repairPart>=30)return{label:"Team fix",cls:"teamfix"};if(b.syn.explicit.length)return{label:"Synergy pick",cls:"synergy"};if(state.enemies.filter(Boolean).length<=1&&solo>=4&&ease>=3)return{label:"Safe blind pick",cls:"safe"};if(carry>=5)return{label:"Carry pick",cls:"carry"};return{label:"Balanced pick",cls:"safe"}}
function reason(h,b){const tr=traits(h),issues=allyIssues(),enemy=enemyProfile(),bits=[],stats=baseStats(h),solo=stats[0],carry=stats[1],m=b||scoreBreakdown(h);if(m.comfort?.score>=7)bits.push("strong account comfort at "+formatPower(m.comfort.current)+" Hero Power");else if(m.comfort?.score>=4)bits.push("account familiarity boost from "+formatPower(m.comfort.current)+" Hero Power");if(isBlindRank()&&solo>=4)bits.push("safe blind-pick profile");if(m.match.laneStrong.length)bits.push("lane matchup edge into "+m.match.laneStrong.slice(0,2).map(n=>displayName(hero(n))).join(" + "));else if(m.match.strong.length)bits.push("direct matchup edge into "+m.match.strong.slice(0,2).map(n=>displayName(hero(n))).join(" + "));if(m.syn.explicit.length)bits.push("documented synergy with "+m.syn.explicit.slice(0,2).map(n=>displayName(hero(n))).join(" + "));if(solo>=5)bits.push("high solo-queue independence");else if(solo>=4)bits.push("reliable without coordinated teammates");if(issues.includes("No frontline")&&tr.includes("frontline"))bits.push("repairs your frontline");if(issues.includes("Low crowd control")&&tr.includes("cc"))bits.push("adds needed CC");if(issues.includes("No reliable engage")&&tr.includes("engage"))bits.push("adds initiation");if(issues.includes("Backline lacks peel")&&tr.includes("peel"))bits.push("protects your backline");if(enemy.includes("Heavy dive")&&(tr.includes("frontline")||tr.includes("peel")||tr.includes("cc")))bits.push("better into enemy dive");if(carry>=5)bits.push("high carry ceiling");if(h.tier==="S"||h.tier==="A")bits.push(h.tier+"-tier meta baseline");return(bits.slice(0,3).join("; ")||"solid role fit for this draft")+"."}
function detailTags(h,b){let html="";if(b.match.strong.length)html+=`<div class="recommendation-label">Direct matchup edges</div><div class="tags">${b.match.strong.map(n=>`<span class="tag match-good">✓ ${esc(displayName(hero(n)))}</span>`).join("")}</div>`;if(b.match.danger.length)html+=`<div class="recommendation-label">Enemy threats to this pick</div><div class="tags">${b.match.danger.map(n=>`<span class="tag match-bad">⚠ ${esc(displayName(hero(n)))}</span>`).join("")}</div>`;if(b.syn.explicit.length||b.syn.labels.length)html+=`<div class="recommendation-label">Synergy</div><div class="tags">${b.syn.explicit.map(n=>`<span class="tag syn-good">★ ${esc(displayName(hero(n)))}</span>`).join("")}${b.syn.labels.map(n=>`<span class="tag syn-good">+ ${esc(n)}</span>`).join("")}</div>`;if(b.comfort?.current!=null)html+=`<div class="recommendation-label">Your account</div><div class="tags"><span class="tag ${b.comfort.score>=7?"comfort-good":"comfort-mid"}">◆ ${formatPower(b.comfort.current)} Hero Power • +${Math.round(b.comfortPart)} comfort</span></div>`;if(b.match.laneDanger.length)html+=`<div class="warning-line">Lane warning: ${b.match.laneDanger.map(n=>esc(displayName(hero(n)))).join(" + ")} has direct evidence into this pick.</div>`;return html}
function draftPlan(){const issues=allyIssues(),enemy=enemyProfile(),allies=visibleAllies().filter(Boolean).length,enemies=isBlindRank()?0:state.enemies.filter(Boolean).length;const priority=issues.length?issues.slice(0,2).join(" + "):"No urgent team repair";const threat=isBlindRank()?"Hidden in blind pick":(enemy.length?enemy.slice(0,2).join(" + "):"Enemy draft still unclear");let info=isBlindRank()?"Blind selection":"Early draft";if(!isBlindRank()){if(allies+enemies>=7)info="Late draft";else if(allies+enemies>=4)info="Mid draft"}return{priority,threat,info,allies,enemies}}
function renderDraftSummary(){const p=draftPlan();const third=isBlindRank()?`${p.allies} of 4 teammate choices entered`:`${p.allies} ally / ${p.enemies} enemy picks entered`;$('draftSummary').innerHTML=`<div class="draft-summary"><div class="draft-summary-title">${isBlindRank()?"Blind-pick plan":"Draft plan"}</div><div class="draft-summary-grid"><div class="summary-cell"><strong>${esc(p.priority)}</strong><span>ally priority</span></div><div class="summary-cell"><strong>${esc(p.threat)}</strong><span>${isBlindRank()?"enemy information":"enemy read"}</span></div><div class="summary-cell"><strong>${esc(p.info)}</strong><span>${esc(third)}</span></div></div></div>`}
function analyze(silent=false){const owned=new Set(acct().owned),blocked=new Set(isBlindRank()?visibleAllies().filter(Boolean):[...state.allies,...state.enemies,...state.bans].filter(Boolean)),issues=allyIssues(),enemy=enemyProfile(),pool=HEROES.filter(h=>owned.has(h.n)&&h.lane===state.role&&!blocked.has(h.n)).map(h=>({h,b:scoreBreakdown(h)})).sort((a,b)=>b.b.total-a.b.total).slice(0,visibleRecommendationCount());let issueHtml="";const urgency=urgencyLevel();if(!isBlindRank()&&urgency==="emergency")issueHtml+=`<div class="urgent-banner">${timerRemaining}s left — emergency view: showing only the highest-ranked owned pick for ${esc(state.role)}.</div>`;else if(!isBlindRank()&&urgency==="commit")issueHtml+=`<div class="commit-banner">${timerRemaining}s left — commit view: shortlist reduced to the top 3.</div>`;if(isBlindRank())issueHtml+=`<div class="ok">${esc(state.rank)} Blind Pick: enemy matchup data is intentionally ignored until after selection.</div>`;issueHtml+=issues.length?`<div class="issues">${issues.map(x=>`<span class="issue">${esc(x)}</span>`).join("")}</div>`:`<div class="ok">No critical ally composition problem detected.</div>`;if(!isBlindRank()&&enemy.length)issueHtml+=`<div class="issues">${enemy.map(x=>`<span class="issue enemyissue">Enemy: ${esc(x)}</span>`).join("")}</div>`;if(!isBlindRank()){const directEnemies=state.enemies.filter(Boolean).filter(n=>directCountersOf(n).length||(STRONG_AGAINST[n]||[]).length);if(state.enemies.some(Boolean)&&!directEnemies.length)issueHtml+=`<div class="muted" style="margin-bottom:8px">No direct matchup record found for the entered enemy heroes; using composition logic.</div>`}$("teamIssues").innerHTML=issueHtml;renderDraftSummary();$("recommendations").innerHTML=pool.length?pool.map((x,i)=>{const h=x.h,b=x.b,tr=traits(h),type=pickType(h,b),conf=confidenceInfo(h,b);return `<div class="rec"><div class="rec-head"><div><span class="rank">#${i+1}</span> <strong>${esc(displayName(h))}</strong> <span class="pill tier${h.tier}">${h.tier}</span><span class="pick-badge ${type.cls}">${esc(type.label)}</span></div><div><span class="confidence ${conf.cls}">${conf.level} confidence</span> <span class="score">${Math.round(b.total)}</span></div></div><div class="reason">${esc(reason(h,b))}</div><div class="breakdown"><div class="metric"><strong>${Math.round(b.soloPart+b.blindPart)}</strong><span>Solo/Carry</span></div><div class="metric"><strong>${Math.round(b.repairPart)}</strong><span>Team Repair</span></div><div class="metric"><strong>${isBlindRank()?"N/A":((b.match.score>=0?"+":"")+Math.round(b.match.score))}</strong><span>${isBlindRank()?"Enemy Hidden":"Matchup"}</span></div><div class="metric"><strong>+${Math.round(b.syn.score)}</strong><span>Synergy</span></div><div class="metric"><strong>${b.comfort.current!=null?"+"+Math.round(b.comfortPart):"—"}</strong><span>Account Power</span></div></div>${detailTags(h,b)}${i<3?renderBuildPreview(h):""}<div class="tags">${tr.slice(0,5).map(t=>`<span class="tag">${esc(t)}</span>`).join("")}</div><div class="statline"><span>${esc(h.lane)} • ${esc(h.archetype)}</span><span>${esc(conf.why)}${isBlindRank()?" • blind-pick model":" • "+DIRECT_MATCHUP_EDGE_COUNT+" direct signals"}</span></div></div>`}).join(""):`<div class="muted">No available owned heroes are available for ${esc(state.role)}. Add heroes under Roster or change role.</div>`;if(!silent)setStatus(isBlindRank()?"Blind-pick recommendations analyzed from your roster and teammate composition.":"Draft analyzed with confidence-aware counters, synergy, and draft repair.")}
function hasDraftInput(){return isBlindRank()?visibleAllies().some(Boolean):[...state.allies,...state.enemies,...state.bans].some(Boolean)}
function liveAnalyze(){if(isBlindRank()||hasDraftInput())analyze(true)}

function urgencyLevel(){if(isBlindRank()||draftPhase!=="pick")return "normal";if(timerRemaining<=5)return "emergency";if(timerRemaining<=10)return "commit";return "normal"}
function visibleRecommendationCount(){const u=urgencyLevel();return u==="emergency"?1:u==="commit"?3:5}
function updateRankModeUI(){const blind=isBlindRank();document.body.classList.toggle("blind-mode",blind);document.body.classList.toggle("draft-mode",!blind);$("allySectionTitle").textContent=blind?"Teammates / Intentions":"Allies";$("allySectionHint").textContent=blind?"enter up to 4 visible teammate choices":"tap a slot, then a hero";if(blind){picker={group:"allies",index:Math.min(picker.index,3)};$("blindRankBadge").textContent=state.rank+" • Blind Pick";$("rankModeNote").textContent=state.rank+" profile: no bans, no enemy counter data, higher weight on safe solo-queue picks."}renderModes();renderSlots();renderPicker()}
function updateClockUI(){const cfg=PHASES[draftPhase],m=Math.floor(timerRemaining/60),s=Math.max(0,timerRemaining%60),u=urgencyLevel();$("timerValue").textContent=String(m).padStart(2,"0")+":"+String(s).padStart(2,"0");$("timerLabel").textContent=cfg.label+" remaining";$("phaseTotalLabel").textContent=cfg.total;$("phaseGuideTitle").textContent=cfg.title;$("phaseGuideText").textContent=cfg.text;$("timerBox").className="timer-box"+(u!=="normal"?" "+u:"");$("decisionMode").className="decision-mode"+(u!=="normal"?" "+u:"");$("decisionMode").textContent=u==="emergency"?"Emergency: show top pick only":u==="commit"?"Commit: top 3 only":"Normal decision mode";$("timerStart").textContent=timerRunning?"Pause":"Start";document.querySelectorAll("[data-phase]").forEach(b=>b.classList.toggle("active",b.dataset.phase===draftPhase));const high=["Diamond","Master","Grandmaster"].includes(state.rank);$("clockRankNote").textContent=high?state.rank+" timing profile active":"Timing panel is tuned for Diamond–Grandmaster";if(hasDraftInput())analyze(true)}
function setDraftPhase(phase){if(!PHASES[phase])return;draftPhase=phase;timerRunning=false;if(timerHandle){clearInterval(timerHandle);timerHandle=null}timerRemaining=PHASES[phase].seconds;updateClockUI()}
function toggleTimer(){if(isBlindRank())return;if(timerRunning){timerRunning=false;if(timerHandle){clearInterval(timerHandle);timerHandle=null}updateClockUI();return}if(timerRemaining<=0)timerRemaining=PHASES[draftPhase].seconds;timerRunning=true;timerHandle=setInterval(()=>{timerRemaining=Math.max(0,timerRemaining-1);if(timerRemaining<=0){timerRunning=false;clearInterval(timerHandle);timerHandle=null}updateClockUI()},1000);updateClockUI()}
function resetTimer(){if(isBlindRank())return;timerRunning=false;if(timerHandle){clearInterval(timerHandle);timerHandle=null}timerRemaining=PHASES[draftPhase].seconds;updateClockUI()}

function renderAll(){renderAccounts();renderQuickAccounts();renderPickerLaneFilters();renderRosterFilters();renderRoster();renderPower();$("roleSelect").value=state.role;$("rankSelect").value=state.rank;updateRankModeUI();updateClockUI();if(hasDraftInput())analyze(true);else{renderDraftSummary();$("teamIssues").innerHTML=isBlindRank()?`<div class="ok">${esc(state.rank)} Blind Pick active. Enter teammate intentions if visible, or analyze immediately for a safe owned pick.</div>`:""}}


function isStandaloneMode(){
  return window.matchMedia?.("(display-mode: standalone)")?.matches===true||window.navigator.standalone===true;
}
function isIOSLike(){
  return /iPhone|iPad|iPod/i.test(navigator.userAgent)||(/Macintosh/i.test(navigator.userAgent)&&navigator.maxTouchPoints>1);
}
async function updateMobileReadiness(){
  const root=$("mobileReadiness");if(!root)return;
  const w=Math.round(window.innerWidth),h=Math.round(window.innerHeight);
  $("mobileViewport").textContent=`${w}×${h}`;
  let storage="Working",storageNote="";
  try{
    const key="hokMobilePersistenceProbe",old=localStorage.getItem(key),now=String(Date.now());
    localStorage.setItem(key,now);
    storage=old?"Passed":"Ready";
    storageNote=old?" Local storage survived a previous launch.":" A persistence marker was created; reopen later to verify it survives.";
  }catch(e){storage="Blocked";storageNote=" Local storage is unavailable."}
  $("mobileStorage").textContent=storage;
  const standalone=isStandaloneMode(),ios=isIOSLike(),ext=extensionAvailable();
  $("mobileInstall").textContent=ext?"Extension":standalone?"Home Screen":"Safari";
  $("mobileModeBadge").textContent=ext?"DESKTOP EXTENSION":standalone?"PWA INSTALLED":ios?"IPHONE SAFARI":"WEB";
  let offline="Web only";
  if("serviceWorker" in navigator&&(location.protocol==="https:"||location.hostname==="localhost"||location.hostname==="127.0.0.1")){
    try{
      const reg=await navigator.serviceWorker.register("./sw.js",{scope:"./"});
      await navigator.serviceWorker.ready;offline="Ready";
    }catch(e){offline="Failed"}
  }else if(ext){offline="N/A"}else if(location.protocol==="file:"){offline="Needs HTTPS"}
  $("mobileOffline").textContent=offline;
  const notes=[];
  if(ios&&!standalone)notes.push("Use Safari Share → Add to Home Screen for the real installed-app test.");
  if(location.protocol==="file:")notes.push("Offline/PWA installation cannot be tested from a local file; host this folder over HTTPS.");
  if(standalone)notes.push("Running from the Home Screen.");
  if(!navigator.onLine)notes.push("Currently offline.");
  notes.push(storageNote.trim());
  $("mobileReadyNote").textContent=notes.filter(Boolean).join(" ");
}
function registerMobileLifecycle(){
  window.addEventListener("resize",()=>updateMobileReadiness());
  window.addEventListener("online",updateMobileReadiness);
  window.addEventListener("offline",updateMobileReadiness);
  window.addEventListener("pagehide",()=>{try{save()}catch(e){}});
  document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden"){try{save()}catch(e){}}});
  updateMobileReadiness();
}
function wireEvents(){
  const scaleEl=$("uiScale");if(scaleEl)scaleEl.addEventListener("change",e=>{applyUiScale(e.target.value);setStatus(`Desktop UI size set to ${e.target.value}%.`)});
  $("mainTabs").addEventListener("click",e=>{const b=e.target.closest("[data-tab]");if(b)showTab(b.dataset.tab)});
  $("accountSelect").addEventListener("change",e=>activateAccount(e.target.value));
  $("roleSelect").addEventListener("change",e=>{state.role=e.target.value;save();if(isBlindRank())analyze(true);else liveAnalyze()});$("rankSelect").addEventListener("change",e=>{state.rank=e.target.value;if(acct().workspace)acct().workspace.rank=state.rank;save();renderQuickAccounts();updateRankModeUI();updateClockUI();analyze(true)});
  $("phaseButtons").addEventListener("click",e=>{const b=e.target.closest("[data-phase]");if(b)setDraftPhase(b.dataset.phase)});$("timerStart").addEventListener("click",toggleTimer);$("timerReset").addEventListener("click",resetTimer);
  $("heroSearch").addEventListener("input",()=>{pickerPage=1;renderPicker()});$("rosterSearch").addEventListener("input",renderRoster);$("powerSearch").addEventListener("input",renderPower);$("powerSort").addEventListener("change",e=>{powerSort=e.target.value;renderPower()});$("analyzeBtn").addEventListener("click",()=>analyze(false));
  $("pickerLaneFilters").addEventListener("click",e=>{const b=e.target.closest("[data-picker-lane]");if(!b)return;pickerLaneFilter=b.dataset.pickerLane;pickerPage=1;renderPickerLaneFilters();renderPicker()});
  $("pickerOwnedToggle").addEventListener("click",()=>{pickerOwnedOnly=!pickerOwnedOnly;pickerPage=1;renderPickerLaneFilters();renderPicker()});
  $("pickerPrev").addEventListener("click",()=>{if(pickerPage>1){pickerPage--;renderPicker();$("heroSearch").scrollIntoView({block:"center",behavior:"auto"})}});
  $("pickerNext").addEventListener("click",()=>{pickerPage++;renderPicker();$("heroSearch").scrollIntoView({block:"center",behavior:"auto"})});
  $("clearDraft").addEventListener("click",()=>{state.allies=[null,null,null,null,null];state.enemies=[null,null,null,null,null];state.bans=[null,null,null,null,null];save();renderSlots();renderPicker();$("teamIssues").innerHTML="";$("draftSummary").innerHTML="";$("recommendations").innerHTML='<div class="muted">Draft cleared.</div>';setStatus("Draft cleared.")});
  $("addAccount").addEventListener("click",()=>{const name=$("newAccountName").value.trim(),uid=$("newAccountUid").value.trim();if(!name){setStatus("Enter an account label first.");return}if(uid&&state.accounts.some(a=>a.uid===uid)){setStatus("That HoK UID is already assigned to another account.");return}save();const id="a"+Date.now();const fresh={id,name,uid,owned:[],heroPower:{},powerDetails:{},rankingTargets:{},extendedCaptures:[],diagnostics:[],syncHistory:[],workspace:{rank:"Platinum",role:"Clash Lane",allies:[null,null,null,null,null],enemies:[null,null,null,null,null],bans:[null,null,null,null,null]}};state.accounts.push(fresh);state.active=id;loadWorkspace(fresh);$("newAccountName").value="";$("newAccountUid").value="";save();renderAll();showTab("accounts");setStatus("Account created: "+name+(uid?" • UID "+uid:"")+" • Platinum workspace")});
  $("accountList").addEventListener("click",e=>{const use=e.target.closest(".account-use"),del=e.target.closest(".account-delete"),saveProfile=e.target.closest(".account-save-profile");if(use)activateAccount(use.dataset.id);if(del)deleteAccount(del.dataset.id);if(saveProfile){const row=e.target.closest("[data-account-row]");saveAccountProfile(saveProfile.dataset.id,row)}});
  $("exportBackup").addEventListener("click",exportBackup);
  $("importBackup").addEventListener("click",()=>restoreBackup($("importBackupFile").files?.[0]));
  $("exportDiagnostics").addEventListener("click",exportDiagnostics);
  document.addEventListener("click",e=>{if(e.target?.id==="retrySyncInline")openCampProfileForActiveAccount();if(e.target?.id==="diagInline")exportDiagnostics()});

  $("quickAccounts").addEventListener("click",e=>{const b=e.target.closest("[data-quick-account]");if(b)activateAccount(b.dataset.quickAccount)});
  $("manageAccountsBtn").addEventListener("click",()=>showTab("accounts"));
  $("modeButtons").addEventListener("click",e=>{const b=e.target.closest("[data-mode]");if(b){picker.group=b.dataset.mode;renderModes()}});
  $("heroPicker").addEventListener("click",e=>{const b=e.target.closest(".hero-pick");if(b&&!b.disabled)pickHero(b.dataset.hero)});
  $("rosterFilters").addEventListener("click",e=>{const b=e.target.closest("[data-roster-filter]");if(b){rosterFilter=b.dataset.rosterFilter;renderRosterFilters();renderRoster()}});
  $("rosterList").addEventListener("click",e=>{const b=e.target.closest(".roster-hero");if(b)toggleOwned(b.dataset.hero)});
  $("powerLaneFilters").addEventListener("click",e=>{const b=e.target.closest("[data-power-lane]");if(b){powerLaneFilter=b.dataset.powerLane;renderPower()}});
  $("powerList").addEventListener("click",e=>{const metric=e.target.closest(".metric-save");if(metric){savePowerMetrics(metric.dataset.hero,$("powerList"));return}const b=e.target.closest(".power-save");if(!b)return;const input=$("powerList").querySelector(`.power-input[data-hero="${b.dataset.hero}"]`);saveHeroPower(b.dataset.hero,input)});
  $("saveAllPower").addEventListener("click",saveAllQuickPower);
  $("clearPowerDrafts").addEventListener("click",clearQuickDrafts);
  $("quickPowerGrid").addEventListener("input",e=>{
    const input=e.target.closest(".quick-power-input");if(!input)return;
    const a=acct();quickPowerDrafts[quickDraftKey(a.id,input.dataset.quickHero)]=input.value;
    input.closest(".quick-power-item")?.classList.add("dirty");
  });
  $("quickPowerGrid").addEventListener("change",e=>{
    const input=e.target.closest(".quick-power-input");if(!input||input.value.trim()==="")return;
    const name=input.dataset.quickHero;
    if(saveManualHeroPower(name,input.value,{rerender:false})){
      input.closest(".quick-power-item")?.classList.remove("dirty");
      setStatus(displayName(hero(name))+" Hero Power saved manually.");
    }
  });
  $("quickPowerGrid").addEventListener("keydown",e=>{
    const input=e.target.closest(".quick-power-input");if(!input||e.key!=="Enter")return;
    e.preventDefault();
    const all=[...$("quickPowerGrid").querySelectorAll(".quick-power-input")],idx=all.indexOf(input),name=input.dataset.quickHero;
    if(saveManualHeroPower(name,input.value,{rerender:false})){
      save();renderPower();renderAll();setStatus(displayName(hero(name))+" Hero Power saved manually.");
      setTimeout(()=>{const refreshed=[...$("quickPowerGrid").querySelectorAll(".quick-power-input")];(refreshed[Math.min(idx+1,refreshed.length-1)]||refreshed[idx])?.focus()},50);
    }
  });
  $("campOpenProfile").addEventListener("click",openCampProfileForActiveAccount);
  $("campCopyHelper").addEventListener("click",()=>{$("quickPowerPanel")?.scrollIntoView({behavior:"smooth",block:"start"});setTimeout(()=>$("quickPowerGrid")?.querySelector(".quick-power-input")?.focus(),250)});
  for(const id of ["allySlots","enemySlots","banSlots"])$(id).addEventListener("click",e=>{const b=e.target.closest("[data-slot-group]");if(!b)return;const g=b.dataset.slotGroup,i=Number(b.dataset.slotIndex);if(e.target.closest("[data-clear]")){state[g][i]=null;save();renderSlots();renderPicker();liveAnalyze();return}picker={group:g,index:i};renderModes();setStatus("Select a hero for "+g+" slot "+(i+1)+".")});
}

async function consumePendingExtensionData(){
  if(!extensionAvailable())return;
  try{
    const stored=await chrome.storage.local.get(["hokPendingCampPayload","hokSyncRuntime"]);
    if(stored.hokSyncRuntime)setExtensionSyncState(stored.hokSyncRuntime.state||"READY",stored.hokSyncRuntime.message||"",stored.hokSyncRuntime);
    const p=stored.hokPendingCampPayload;
    if(p&&p.payload){
      const target=state.accounts.find(a=>a.id===p.accountId);
      if(target){
        if(state.active!==target.id)activateAccount(target.id);
        const result=applyCampHeroData(p.payload,"extension",null,p.accountId);
        if(result)await chrome.storage.local.remove("hokPendingCampPayload");
      }
    }
  }catch(err){pushDiag("extension-init",err?.message||String(err))}
}
function wireExtensionMessages(){
  if(!extensionAvailable())return;
  chrome.runtime.onMessage.addListener(msg=>{
    if(!msg||typeof msg!=="object")return;
    if(msg.type==="HOK_SYNC_STATE"){setExtensionSyncState(msg.state||"READY",msg.message||"",msg);return}
    if(msg.type==="HOK_CAMP_PROFILE_DATA"){
      const target=state.accounts.find(a=>a.id===msg.accountId);
      if(!target){setExtensionSyncState("FAILED","The captured Camp data does not map to a local assistant account.");return}
      if(state.active!==target.id)activateAccount(target.id);
      applyCampHeroData(msg.payload,"extension",null,msg.accountId);return;
    }
    if(msg.type==="HOK_CAMP_EXTENDED_DATA"){applyExtendedCampData(msg.payload,msg.endpoint,msg.kind||"extended");return}
  });
}

try{applyUiScale(initialUiScale());wireEvents();registerMobileLifecycle();save();renderAll();showTab("draft");setStatus("v0.16.1 ready • desktop extension + iPhone PWA compatibility + manual Hero Power loaded.")}catch(err){console.error(err);setStatus("Error: "+err.message)}