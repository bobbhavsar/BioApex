// BioApex Service Worker - Live Network-First with Offline Fallback
const CACHE_NAME = 'bioapex-cache-v10';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './src/app.js',
  './src/data/curriculum.js',
  './src/data/quizBank.js',
  './src/components/simulators.js',
  './src/components/interactiveIllustrations.js'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Network-first strategy: always fetch live updates from network, fallback to cache if offline
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then((cached) => {
          return cached || caches.match('./index.html');
        });
      })
  );
});
