/*global workbox*/
if (workbox) {
    // adjust log level for displaying workbox logs
    workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);

    // apply precaching. In the built version, the precacheManifest will
    // be imported using importScripts (as is workbox itself) and we can
    // precache this. This is all we need for precaching
    self.__precacheManifest = [].concat(self.__precacheManifest || []);
    workbox.precaching.precacheAndRoute(self.__precacheManifest);

    // Make sure to return a specific response for all navigation requests.
    // Since we have a SPA here, this should be index.html always.
    // https://stackoverflow.com/questions/49963982/vue-router-history-mode-with-pwa-in-offline-mode
    workbox.routing.registerNavigationRoute('/index.html');

    workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg|webp|svg)$/,
      new workbox.strategies.NetworkFirst({
        cacheName: 'images',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
          }),
        ],
      })
    );

    workbox.routing.registerRoute(
      new RegExp('^https://laravel.lukas-cornille.be/images'),
      new workbox.strategies.NetworkFirst({
        cacheName: 'image-cache',
        plugins: [
          new workbox.cacheableResponse.Plugin({
            statuses: [0, 200],
          })
        ]
      })
    );

    workbox.routing.registerRoute(
      new RegExp('^https://node-edugaming.herokuapp.com/images/'),
      new workbox.strategies.NetworkFirst({
        cacheName: 'coach-image-cache',
        plugins: [
          new workbox.cacheableResponse.Plugin({
            statuses: [0, 200],
          })
        ]
      })
    )

    workbox.routing.registerRoute(
      new RegExp('^https://laravel.lukas-cornille.be/api/home'),
      new workbox.strategies.NetworkFirst({
        cacheName: 'home-cache',
        plugins: [
          new workbox.cacheableResponse.Plugin({
            statuses: [0, 200],
          })
        ]
      })
    );

    workbox.routing.registerRoute(
      new RegExp('^https://laravel.lukas-cornille.be/api/filters'),
      new workbox.strategies.NetworkFirst({
        cacheName: 'filters-cache',
        plugins: [
          new workbox.cacheableResponse.Plugin({
            statuses: [0, 200],
          })
        ]
      })
    );

}
