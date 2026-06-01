const CACHE_NAME = 'gomoku-game-v1';
const urlsToCache = [
  './',
  './index.html',
  './gomoku.html',
  './五子棋.html',
  './manifest.json'
];

// 安裝 Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// 激活 Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 攔截請求，優先使用快取
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') {
    return;
  }
  // For navigation requests (HTML) try network first to get latest
  if (event.request.mode === 'navigate' || event.request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(event.request).then(response => {
        if (response && response.status === 200) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        }
        return response;
      }).catch(() => caches.match('./五子棋.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request).then(resp => {
        if (!resp || resp.status !== 200) return resp;
        const resClone = resp.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, resClone));
        return resp;
      }))
  );
});

// Listen for messages from client (e.g., to skipWaiting)
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
