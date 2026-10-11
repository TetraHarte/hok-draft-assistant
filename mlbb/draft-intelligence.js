/* MLBB Draft Intelligence v0.18 — matchup mechanics, not measured win rates.
 * Every signal describes a possible draft tool or exposure; never a guaranteed 1v1 result.
 * This module only receives explicit hero picks from the local MLBB workspace.
 */
(function () {
  'use strict';
  const groups = {
    dash: 'Fanny|Ling|Lancelot|Joy|Hayabusa|Nolan|Benedetta|Arlott|Chou|Guinevere|Harith|Wanwan|Lukas|Gusion|Paquito|Aamon|Lapu-Lapu|Selena|Mathilda|Irithel|Moskov|Claude|Sora|Lylia|Karina',
    projectile: 'Chang\'e|Granger|Beatrix|Layla|Clint|Brody|Bruno|Miya|Moskov|Cyclops|Harley|Xavier|Karrie|Hanabi|Melissa|Irithel|Cecilion',
    healing: 'Estes|Floryn|Rafaela|Angela|Ruby|Uranus|Esmeralda|Thamuz|Yu Zhong|Alpha|Alucard|Alice|Fredrinn|Minotaur|Kalea|Khaleed',
    shield: 'Esmeralda|Harith|Angela|Lolita|Freya|Silvanna|Mathilda|Aldous|Edith|Phoveus',
    basic: 'Miya|Layla|Moskov|Claude|Karrie|Wanwan|Bruno|Irithel|Hanabi|Melissa|Sun|Zilong|Freya|Argus',
    tank: 'Fredrinn|Barats|Baxia|Gatotkaca|Hylos|Belerick|Gloo|Uranus|Terizla|Minotaur|Tigreal|Atlas|Khufra|Akai|Edith|Grock',
    dive: 'Fanny|Ling|Lancelot|Hayabusa|Nolan|Gusion|Karina|Saber|Natalia|Helcurt|Chou|Arlott|Benedetta|Joy|Yin|Suyou',
    cc: 'Tigreal|Atlas|Khufra|Minotaur|Aurora|Vexana|Eudora|Franco|Kaja|Chou|Akai|Lolita|Gatotkaca|Ruby|Minsitthar|Carmilla|Zetian',
    immobile: 'Layla|Ixia|Cecilion|Gord|Yve|Xavier|Estes|Floryn|Odette|Zhask|Pharsa',
    aoe: 'Odette|Pharsa|Vexana|Aurora|Ixia|Yve|Vale|Xavier|Luo Yi|Cecilion|Gord|Chang\'e|Zhuxin|Zetian',
    setup: 'Tigreal|Atlas|Khufra|Minotaur|Carmilla|Ruby|Terizla|Gatotkaca|Akai|Lolita',
    peel: 'Diggie|Lolita|Minotaur|Rafaela|Mathilda|Angela|Floryn|Estes|Valir|Kaja|Akai',
    burst: 'Eudora|Aurora|Saber|Gusion|Harley|Kadita|Kagura|Nolan|Aamon|Karina|Vale|Lesley',
    protect: 'Angela|Estes|Floryn|Rafaela|Mathilda|Diggie|Lolita|Minotaur',
    backline: 'Layla|Ixia|Cecilion|Gord|Yve|Xavier|Odette|Pharsa|Zhask'
  };
  const tags=new Map();
  for(const [tag,names] of Object.entries(groups))for(const name of names.split('|')){
    if(!tags.has(name))tags.set(name,new Set());
    tags.get(name).add(tag);
  }
  const has=(hero,tag)=>!!(hero&&tags.get(typeof hero==='string'?hero:hero.name)?.has(tag));
  const rules=[
    {pick:'Khufra',tag:'dash',points:13,why:e=>'Bouncing Ball can punish '+e.name+'\'s movement skills'},
    {pick:'Minsitthar',tag:'dash',points:13,why:e=>'King\'s Calling restricts '+e.name+'\'s mobility in its area'},
    {pick:'Phoveus',tag:'dash',points:11,why:e=>'Phoveus can punish '+e.name+' for dashing nearby'},
    {pick:'Diggie',tag:'cc',points:12,why:e=>'Time Journey can protect allies from '+e.name+'\'s control; time the ultimate'},
    {pick:'Lolita',tag:'projectile',points:12,why:e=>'Guardian\'s Reflection can block/reflect some of '+e.name+'\'s projectiles; check ability interactions'},
    {pick:'Baxia',tag:'healing',points:11,why:e=>'Baxia applies healing/shield reduction against '+e.name+'; watch cleanse windows'},
    {pick:'Karrie',tag:'tank',points:12,why:e=>'Percentage-health-based sustained damage pressures '+e.name+'\'s durability'},
    {pick:'Valir',tag:'dive',points:10,why:e=>'Knockback and slowing can interrupt '+e.name+'\'s approach'},
    {pick:'Belerick',tag:'basic',points:9,why:e=>'Belerick can punish repeated basic attacks from '+e.name},
    {pick:'Esmeralda',tag:'shield',points:10,why:e=>'Shield absorption can challenge '+e.name+'\'s protective shields'},
    {pick:'Kaja',tag:'dive',points:11,why:e=>'Suppression can catch '+e.name+' after a committed dive'},
    {pick:'Franco',tag:'dive',points:11,why:e=>'Suppression threatens '+e.name+' when the diver commits'},
    {pick:'Akai',tag:'dive',points:8,why:e=>'Akai can disrupt '+e.name+'\'s access to the backline'},
    {pick:'Natalia',tag:'immobile',points:8,why:e=>'Natalia can threaten the relatively immobile '+e.name+' from an unseen angle'},
    {pick:'Saber',tag:'immobile',points:8,why:e=>'Single-target lock-on burst can threaten '+e.name+' if unprotected'}
  ];
  const perEnemyRule=(hero,enemy)=>rules.filter(r=>r.pick===hero.name&&has(enemy,r.tag));
  function review(hero,allyHeroes,enemyHeroes){
    const positives=[],cautions=[],synergies=[],targets=[];
    let matchup=0,risk=0,synergy=0;
    for(const enemy of enemyHeroes){
      const matches=perEnemyRule(hero,enemy).sort((a,b)=>b.points-a.points);
      if(matches.length){const r=matches[0];matchup+=r.points;positives.push(r.why(enemy));targets.push(enemy.name)}
      if(has(hero,'dash')&&['Khufra','Minsitthar','Phoveus'].includes(enemy.name)){
        risk+=12;cautions.push(enemy.name+' can punish dash-heavy approaches')}
      if(has(hero,'projectile')&&enemy.name==='Lolita'){
        risk+=9;cautions.push('Lolita can reflect/block relevant projectiles; check attack angles')}
      if(has(hero,'healing')&&enemy.name==='Baxia'){
        risk+=hero.name==='Floryn'?5:10;cautions.push('Baxia reduces healing; plan around cleanse/ultimate timing where available')}
      if(has(hero,'shield')&&enemy.name==='Esmeralda'){
        risk+=9;cautions.push('Esmeralda can absorb shields; do not depend on them alone')}
      if(has(hero,'basic')&&enemy.name==='Belerick'){
        risk+=7;cautions.push('Belerick can punish extended basic-attacking exchanges')}
      if(has(hero,'immobile')&&has(enemy,'dive')){
        risk+=5;cautions.push(enemy.name+' can threaten your limited escape options')}
    }
    const setup=allyHeroes.find(h=>has(h,'setup')),area=allyHeroes.find(h=>has(h,'aoe'));
    if(has(hero,'aoe')&&setup){
      synergy+=10;synergies.push(setup.name+' can set up your area damage')}
    if(has(hero,'setup')&&area){
      synergy+=10;synergies.push('Your initiation can set up '+area.name+'\'s area damage')}
    if(has(hero,'protect')&&allyHeroes.some(h=>has(h,'dive'))){
      synergy+=7;synergies.push('Protection can help an allied diver commit safely')}
    if((hero.traits.frontline||0)>=2&&allyHeroes.some(h=>has(h,'healing'))){
      synergy+=6;synergies.push('Provides a frontline for your team\'s healing support')}
    if(has(hero,'healing')&&allyHeroes.some(h=>(h.traits.frontline||0)>=2)){
      synergy+=5;synergies.push('Sustain supports your existing frontline')}
    const bonus=Math.min(matchup,26)+Math.min(synergy,16)-Math.min(risk,24);
    return {
      bonus,
      positives:[...new Set(positives)].slice(0,3),
      cautions:[...new Set(cautions)].slice(0,2),
      synergies:[...new Set(synergies)].slice(0,2),
      targets:[...new Set(targets)],
      matchupBonus:Math.min(matchup,26),
      riskPenalty:Math.min(risk,24),
      synergyBonus:Math.min(synergy,16)
    };
  }
  function teamReport(allyHeroes,enemyHeroes,role){
    const allyCount=allyHeroes.length,enemyCount=enemyHeroes.length;
    const enemySignals=[],opportunities=[];
    if(enemyHeroes.some(e=>has(e,'dash')))enemySignals.push('Mobile enemy threats: consider dash denial or reliable lock-on CC');
    if(enemyHeroes.some(e=>has(e,'cc')))enemySignals.push('Enemy crowd control: consider cleansing, shielding or safer engage timing');
    if(enemyHeroes.some(e=>has(e,'healing')))enemySignals.push('Enemy sustain: consider healing reduction and extended-fight damage');
    if(enemyHeroes.some(e=>has(e,'projectile')))enemySignals.push('Enemy projectiles: directional defense may help');
    if(enemyHeroes.some(e=>has(e,'tank')))enemySignals.push('Enemy frontline: sustained and percentage-health damage may help');
    if(enemyHeroes.some(e=>has(e,'dive')))enemySignals.push('Enemy divers: protect vulnerable allied damage dealers');
    const frontline=allyHeroes.some(h=>(h.traits.frontline||0)>=2);
    const control=allyHeroes.some(h=>(h.traits.cc||0)>=2);
    const magic=allyHeroes.some(h=>(h.traits.magic||0)>=2);
    const physical=allyHeroes.some(h=>(h.traits.physical||0)>=2);
    if(allyCount){
      if(!frontline)opportunities.push('No known reliable frontline yet');
      if(!control)opportunities.push('No known strong CC source yet');
      if(!magic)opportunities.push('No known primary magic damage yet');
      if(!physical)opportunities.push('No known primary physical damage yet');
    }
    const completeness=allyCount===0&&enemyCount===0?'No draft picks entered':enemyCount===0?'Ally composition only — enemies unknown':allyCount<3||enemyCount<3?'Partial draft — matchup signals provisional':'Multiple picks visible — evaluate specific threats';
    return {allyCount,enemyCount,completeness,enemySignals:enemySignals.slice(0,4),opportunities:opportunities.slice(0,4),role};
  }
  window.MLBB_DRAFT_INTELLIGENCE=Object.freeze({version:'0.18',review,teamReport,has,source:'Gameplay-mechanic heuristics; not a current-patch win-rate or guaranteed-counter model'});
})();
