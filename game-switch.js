/* v0.17: shell-only navigation. HoK state/engine are not touched. */
(()=>{'use strict';
const root=document.querySelector('.app');if(!root||document.getElementById('multiGameShell'))return;
const shell=document.createElement('div');shell.id='multiGameShell';shell.className='game-shell';
shell.innerHTML='<div class="game-header"><div><div class="game-brand-title">Solo Draft Assistant</div><div class="game-brand-sub">Independent game workspaces · HoK data stays in HoK</div></div><div class="game-theme-tools"><label for="globalGameTheme">Appearance</label><select id="globalGameTheme" aria-label="Appearance"><option value="native">Game colors</option><option value="classic">Classic blue</option></select></div></div><nav class="game-navigation" aria-label="Game workspaces"><a class="game-destination" href="./index.html" aria-current="page"><span class="game-initials">HoK</span><span><b>Honor of Kings</b><small>Existing draft assistant</small></span><span class="game-selected">ACTIVE</span></a><a class="game-destination" href="./mlbb/index.html"><span class="game-initials">ML</span><span><b>Mobile Legends</b><small>MLBB drafting workspace</small></span></a></nav>';
root.prepend(shell);
const hokHref=/\/app\.html$/i.test(window.location.pathname)?'./app.html':'./index.html';shell.querySelector('.game-destination').href=hokHref;
const appearance=shell.querySelector('#globalGameTheme');const key='solo_draft_appearance_v1';
let val='native';try{val=localStorage.getItem(key)==='classic'?'classic':'native'}catch(_){}appearance.value=val;
appearance.addEventListener('change',()=>{try{localStorage.setItem(key,appearance.value)}catch(_){}});
const originalH1=root.querySelector('h1');if(originalH1){originalH1.classList.add('hok-shell-hidden')};
})();