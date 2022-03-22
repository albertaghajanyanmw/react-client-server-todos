const staticCacheName = 's-app-v3'
const dynamicCacheName = 'd-app-v3'

const assetUrls = [
  'index.html',
]

// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', async event => {
    console.log("SW instaling")
  const cache = await caches.open(staticCacheName)
  await cache.addAll(assetUrls)
})

// eslint-disable-next-line no-restricted-globals
self.addEventListener('activate', async event => {
    console.log("SW activateing")
  const cacheNames = await caches.keys()
  await Promise.all(
    cacheNames
      .filter(name => name !== staticCacheName)
      .filter(name => name !== dynamicCacheName)
      .map(name => caches.delete(name))
  )
})

// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', event => {
    console.log("SW fetch")

  const {request} = event

  const url = new URL(request.url)
// eslint-disable-next-line no-restricted-globals
  if (url.origin === location.origin) {
    event.respondWith(cacheFirst(request))
  } else {
    event.respondWith(networkFirst(request))
  }
})


async function cacheFirst(request) {
    console.log("SW cacheFirst")

  const cached = await caches.match(request)
  return cached ?? await fetch(request)
}

async function networkFirst(request) {
  const cache = await caches.open(dynamicCacheName)
  try {
    const response = await fetch(request)
    await cache.put(request, response.clone())
    return response
  } catch (e) {
    const cached = await cache.match(request)
    return cached ?? await caches.match('/offline.html')
  }
}