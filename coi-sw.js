// Retired: removes the cross-origin-isolation service worker that the previous build installed.
self.addEventListener("install",()=>self.skipWaiting());
self.addEventListener("activate",e=>e.waitUntil(self.registration.unregister().then(()=>self.clients.matchAll({type:"window"})).then(cs=>cs.forEach(c=>c.navigate(c.url)))));
