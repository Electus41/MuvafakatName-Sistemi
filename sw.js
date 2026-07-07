const CACHE_ADI = 'muvafakatname-v1';
const ONBELLEK_DOSYALARI = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_ADI).then(function(cache) {
      return cache.addAll(ONBELLEK_DOSYALARI);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(anahtarlar) {
      return Promise.all(
        anahtarlar.filter(function(k) { return k !== CACHE_ADI; })
                  .map(function(k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(cevap) {
      return cevap || fetch(event.request);
    })
  );
});
