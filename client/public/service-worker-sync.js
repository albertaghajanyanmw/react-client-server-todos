importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

if (workbox) {
  console.log('Workbox successfully is loaded');
} else {
  console.log('Failed to load Workbox.');
}

const { backgroundSync, routing, strategies } = workbox;

const backSync = new backgroundSync.BackgroundSyncPlugin('addTask');

// todo update url
routing.registerRoute(
  new RegExp('http://localhost:4000/api/tasks'),
  new strategies.NetworkOnly({ plugins: [backSync] }),
  'POST'
);

const handlePush = (event) => {
  const data = event.data.json()
  console.log('New notification', data)
  return event.waitUntil(
    self.registration.showNotification(data.notification.title, {
      body:data.notification.body,
      icon:data.icon
    })
  );
}

self.addEventListener('push', handlePush);

routing.registerRoute(
  /\.(?:css|html|js|svg)$/,
  new strategies.StaleWhileRevalidate({ cacheName: 'static' })
);

// if (process.env.NODE_ENV === 'production') {
//   precaching.precacheAndRoute(self.__WB_MANIFEST)
// }