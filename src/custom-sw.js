function preventDefaultActions (e) {
  if (e.request.url.match('/signin')) {
    console.log('requesting /signin...')
    return false;                
  }
}

self.addEventListener( 'fetch', preventDefaultActions);
//Ran when SW is installed. 
self.addEventListener('install', function (event) {
    console.log("[ServiceWorker] Installed");
});

//Service Worker Activate
self.addEventListener('activate', function(event) {
    console.log("[ServiceWorker] Activating");
});

