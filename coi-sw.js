// Retired. An earlier build used this worker for cross-origin isolation, which crashed iPhone Safari.
// It now unregisters itself and reloads any page it controlled.
self.addEventListener("install",()=>self.skipWaiting());
self.addEventListener("activate",e=>e.waitUntil(self.registration.unregister().then(()=>self.clients.matchAll({type:"window"})).then(cs=>cs.forEach(c=>c.navigate(c.url)))));
