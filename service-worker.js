const CACHE_NAME = "firstpwa1";
var urlsToCache = [
    "/",
    "/manifest.json",
    "/navbar.html",
    "/index.html",
    "/pages/home.html",
    "/pages/about.html",
    "/pages/contact.html",
    "/pages/galery.html",
    "/img/icon.png",
    "/img/icon2.png",
    "/img/icon3.png",
    "/img/icon4.png",
    "/img/3x3.png",
    "/img/birtday.png",
    "/img/sunset.jpg",
    "/img/travel.png",
    "/img/wedding.png",
    "/css/materialize.min.css",
    "/css/style.css",
    "/js/materialize.min.js",
    "/js/navbar.js"
];

// Instal Service Worker
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                return cache.addAll(urlsToCache);
            })
    );
})

// Delete Cache
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys()
            .then(function (cacheNames) {
                return Promise.all(
                    cacheNames.map(function (cacheName) {
                        if (cacheName != CACHE_NAME) {
                            console.log("ServiceWorker: cache " + cacheName + " dihapus");
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
    );
})

// Use Aset
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request, { cacheName: CACHE_NAME })
            .then(function (response) {
                if (response) {
                    console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                    return response;
                }

                console.log("ServiceWorker: Memuat aset dari server: ", event.request.url);
                return fetch(event.request);
            })
    );
});
