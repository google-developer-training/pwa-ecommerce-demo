/*
Copyright 2016 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
// This file will be replaced by the generated service worker when we work with
// the sw-precache and sw-toolbox libraries.

// TODO SW-3 - cache the application shell

// TODO SW-4 - use the cache-first strategy to fetch and cache resources in the
// fetch event listener



// TODO SW-5 - delete outdated caches in the activate event listener

(function() {
    console.log('Entering ServiceWorker script');


    var staticCacheName = 'e-commerce-v1';


    self.addEventListener('fetch', function(event) {
        console.log('Fetch event for ', event.request.url);
        event.respondWith(
            caches.match(event.request).then(function(response) {
                if (response) {
                    console.log('Found ', event.request.url, ' in cache');
                    return response;
                }
                console.log('Network request for ', event.request.url);
                return fetch(event.request).then(function(response) {
                    if (response.status === 404) {
                        return caches.match('pages/404.html');
                    }
                    return caches.open(staticCacheName).then(function(cache) {
                        if (event.request.url.indexOf('test') < 0) {
                            cache.put(event.request.url, response.clone());
                        }
                        return response;
                    });
                });
            }).catch(function(error) {
                console.log('Error, ', error);
                return caches.match('pages/offline.html');
            })
        );
    });
})();
