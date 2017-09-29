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

var staticCacheName = 'e-commerce-v1';

self.addEventListener('install', event => {
  // install
});

self.addEventListener('fetch', event => {
  // fetch
});

self.addEventListener('activate', event => {
  let cacheList = [staticCacheName]

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          // delete old versions
          if (cacheList.indexOf(cacheName) === -1) {
            return caches.delete(cacheName)
          }
        })
      );
    })
  );
});
