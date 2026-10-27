// Eerst netwerk, bij geen verbinding de laatst bewaarde versie
const CACHE = 'examencijfers-v12';
const CDN = ['https://cdn.jsdelivr.net', 'https://fonts.googleapis.com', 'https://fonts.gstatic.com'];
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  if (url.origin !== location.origin && !CDN.includes(url.origin)) return;
  e.respondWith(
    fetch(e.request).then(r => {
      const kopie = r.clone();
      caches.open(CACHE).then(c => c.put(e.request, kopie));
      return r;
    }).catch(() => caches.match(e.request))
  );
});
