// Global variables
var cacheName = 'static_shell-v1';
var resourcesToPrecache = [
    '/',
    'index.html',
    'index-style.css',
    'index_scripts.js'
]    

// Precaches the resources listed in "resourcesToPrecache";
self.addEventListener('install', function(event){
    console.log("Service worker install event. ");
    event.waitUntil(
        caches.open(cacheName)
        .then(function(cache){
            return cache.addAll(resourcesToPrecache);
        })
    );
});


self.addEventListener('fetch', function(event){
    event.respondWith(
        caches.match(event.request) ||
            fetch(event.request)
    );
});
