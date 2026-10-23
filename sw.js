/* v0.18.0 multi-game offline shell: draft safety and Oct 21 patch. */
const CACHE="solo-draft-v0180-dunshan";
const APP_SHELL=["./","./index.html","./draft-safety.js?v=0180-dunshan","./app.js?v=0180-dunshan","./game-switch.js","./game-switch.css","./manifest.webmanifest","./icons/icon-180.png","./icons/icon-192.png","./icons/icon-512.png","./mlbb/index.html"];
self.addEventListener("install",event=>{event.waitUntil(caches.open(CACHE).then(c=>c.addAll(APP_SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith("hok-draft-")||k.startsWith("solo-draft-")).filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",event=>{
 if(event.request.method!=="GET")return;
 const url=new URL(event.request.url);if(url.origin!==self.location.origin)return;
 if(event.request.mode==="navigate"){
  event.respondWith(fetch(event.request).then(response=>{if(response&&response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy))}return response}).catch(async()=>{const cache=await caches.open(CACHE);return (await cache.match(event.request))||(await cache.match(url.pathname.includes("/mlbb/")?"./mlbb/index.html":"./index.html"))}));
  return;
 }
 // Load core scripts and styles from the network first; keep an offline copy as fallback.
 if(url.pathname.endsWith("/draft-safety.js")||url.pathname.endsWith("/app.js")||url.pathname.endsWith("/game-switch.js")||url.pathname.endsWith("/game-switch.css")){
   event.respondWith((async()=>{
     try{
       const response=await fetch(event.request);
       if(response&&response.ok){const cache=await caches.open(CACHE);await cache.put(event.request,response.clone())}
       return response;
     }catch(error){const cached=await caches.match(event.request);if(cached)return cached;throw error}
   })());
   return;
 }
 event.respondWith(caches.match(event.request).then(hit=>hit||fetch(event.request).then(response=>{if(response&&response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy))}return response})));
});