// Nome do cache
const CACHE_NAME = 'astrologia-indiana-v1';

// Arquivos para cache
const urlsToCache = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/js/app.js',
  '/js/auth.js',
  '/js/airtable.js',
  '/js/config.js',
  '/js/utils.js',
  '/js/ui.js',
  '/js/map-queue.js',
  '/js/new-sale.js',
  '/js/clients.js',
  '/js/video-calls.js',
  '/js/financial.js',
  '/js/settings.js',
  '/assets/logo.png',
  '/assets/user-avatar.png',
  '/manifest.json'
];

// Instalar Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Interceptar requisições
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});