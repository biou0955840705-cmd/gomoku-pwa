const CACHE_NAME = 'gomoku-game-v1';
const urlsToCache = [
  './',
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

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 如果快取中有，返回快取
        if (response) {
          return response;
        }

        // 否則從網絡獲取
        return fetch(event.request).then(response => {
          // 檢查回應有效性
          if (!response || response.status !== 200 || response.type === 'error') {
            return response;
          }

          // 複製回應並添加到快取
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
      .catch(() => {
        // 離線時返回快取的主文件
        return caches.match('./五子棋.html');
      })
  );
});
