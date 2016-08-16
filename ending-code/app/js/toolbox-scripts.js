(function(global) {
  'use strict';

  // The route for any requests from the googleapis origin
  global.toolbox.router.get('/(.*)', global.toolbox.cacheFirst, {
    cache: {
      name: 'googleapis',
      maxEntries: 20,
    },
    origin: /\.googleapis\.com$/
  });

  // We want no more than 50 images in the cache. We check using a cache first strategy
  global.toolbox.router.get('/images/(.*)', global.toolbox.cacheFirst, {
    cache: {
      name: 'images-cache',
      maxEntries: 50
    }
  });

  // pull content under pages using network first
  global.toolbox.router.get('/pages/(.+)', global.toolbox.networkFirst, {
    cache: {
      name: 'content-cache-v1'
    }
  });

  // pull video using network only. We don't want such large files from the cache
  global.toolbox.router.get('/video/(.+)', global.toolbox.networkOnly);
  // If the video comes from youtube or vimeo still use networkOnly
  global.toolbox.router.get('(.+)', global.toolbox.networkOnly, {
    origin: /\.(?:youtube|vimeo)\.com$/
  });

  // the default route is global and uses cacheFirst
  global.toolbox.router.get('/*', global.toolbox.cacheFirst);
})(self);
