importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
    console.log("Workbox berhasil dimuat");
} else {
    console.log("Workbox gagal dimuat");
}

// Cache HTML
workbox.precaching.precacheAndRoute([
    { url: '/', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/pages/home.html', revision: '1' },
    { url: '/pages/match.html', revision: '1' },
    { url: '/pages/saved.html', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/matchdetail.html', revision: '1' },
    { url: '/js.js', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/manifest.json', revision: '1' }
]);

workbox.routing.registerRoute(
    new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'halaman'
    })
);

// Bug (?)
workbox.routing.registerRoute(
    new RegExp('/matchdetail.html'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'halaman',
    })
);

// Cache api-football
workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate()
)

// Simpan gambar 30 hari
workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
        cacheName: 'cache-gambar',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 80,
                maxAgeSeconds: 30 * 24 * 60 * 60,
            }),
        ],
    }),
);

// Cache font 30 hari
workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    workbox.strategies.cacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds: 30 * 24 * 60 * 60,
                maxEntries: 5,
            }),
        ],
    })
);

// Cache js dan css
workbox.routing.registerRoute(
    /\.(?:js|css)$/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'static-resources',
    })
);

self.addEventListener('push', function (event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = "Push message no payload";
    }

    var options = {
        body: body,
        icon: 'icon.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(self.registration.showNotification("Push Notification", options));
});