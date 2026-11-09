const CACHE_NAME = "nuestro-camino-v2";

const APP_SHELL = [
  "./",
  "./index.html",
  "./indexDias.html",
  "./indexTramos.html",
  "./indexCompleto.html",
  "./manifest.json",
  "./css/normalize.css",
  "./css/variables.css",
  "./css/style.css",
  "./css/styleMapas.css",
  "./css/leaflet.css",
  "./css/leaflet-elevation.css",
  "./css/lightbox.css",
  "./css/coordinatedimagepreview.css",
  "./js/components.js",
  "./js/common-data.js",
  "./js/map-initializer.js",
  "./js/mapaDias.js",
  "./js/mapaTramos.js",
  "./js/mapaCompleto.js",
  "./js/mFotos.js",
  "./js/leaflet-src.js",
  "./js/gpx.js",
  "./js/leaflet-gpxgroup.js",
  "./js/leaflet-elevation.js",
  "./js/jquery-3.5.0.min.js",
  "./js/bouncemarker.js",
  "./js/coordinatedimagepreview.js",
  "./js/lightbox.js",
  "./img/concha.ico",
  "./img/logoNC.png",
  "./img/logo2.png",
  "./img/zzz.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(APP_SHELL);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET" || !event.request.url.startsWith("http")) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === "basic") {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        if (event.request.mode === "navigate") {
          return caches.match("./index.html");
        }
      });
    })
  );
});
