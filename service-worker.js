const CACHE_NAME = 'muzeum-boskovicka-v1'; // Změněn název cache
const urlsToCache = [
  './',
  './index.html',
  './juxtapose.html', // Nová cesta k juxtapose mapě
  './1.png',
  './2.png',
  './logo.png', // Logo pro úvodní stránku
  './pozadi.jpg', // Pozadí pro obě stránky
  './manifest.json',
  // Pokud byste měli ikony pro PWA, přidejte je zde:
  // './icons/icon-192x192.png',
  // './icons/icon-512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});