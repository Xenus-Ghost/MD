const workbox = window.$workbox

if (workbox) {
  workbox.routing.registerRoute(
    /\.(mp4|webm|js|css|woff|jpg|png|webp)/,
    new workbox.strategies.CacheFirst({
      plugins: [new workbox.rangeRequests.Plugin()],
    }),
    'GET'
  )
} else {
  console.log('workbox not avail')
}
