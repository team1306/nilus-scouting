{% load static %}

var CACHE = 'network-or-cache';

/* On install, cache some resource.*/
self.addEventListener('install', function (evt) {
  console.log('The service worker is being installed. 1');

  /* Ask the service worker to keep installing until the returning promise
   resolves. */
  evt.waitUntil(precache());
});

/* On fetch, use cache but update the entry with the latest contents
 from the server. */
self.addEventListener('fetch', function (evt) {
  console.log('The service worker is serving the asset.');
  /* Try network and if it fails, go for the cached copy. */
  evt.respondWith(fromNetwork(evt.request, 400).catch(function () {
    console.log('Fetching from cache');
    return fromCache(evt.request);
  }));
});

/* Open a cache and use `addAll()` with an array of assets to add all of them
 to the cache. Return a promise resolving when all the assets are added. */
function precache() {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll([
      "{% url 'season2020:home' %}",
      "{% url 'season2020:submit_view' %}",
      "{% url 'season2020:scout' %}",
      "{% static 'season2020/js/query-parameters.js' %}",
    ]);
  });
}

/* Time limited network request. If the network fails or the response is not
 served before timeout, the promise is rejected. */
function fromNetwork(request, timeout) {
  return new Promise(function (fulfill, reject) {
    /* Reject in case of timeout. */
    var timeoutId = setTimeout(reject, timeout);
    /* Fulfill in case of success. */
    fetch(request).then(function (response) {
      clearTimeout(timeoutId);
      cacheResponse = response.clone();
      fulfill(response);
      /* Update cache with most recent fetch */
      caches.open(CACHE).then(function (cache) {
        return cache.put(request, cacheResponse);
      });
      /* Reject also if network fetch rejects. */
    }, reject);
  });
}

/* Open the cache where the assets were stored and search for the requested
 resource. Notice that in case of no matching, the promise still resolves
 but it does with `undefined` as value. */
function fromCache(request) {
  request = removeQueryParameters(request);
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}

/* Remove query parameters from request url.
  This will create a new Request, where query parameters ("/?field:value...")
  are removed from the url. This is so the cache is able to fetch and serve the
  url without query parameters, which can then be read by the served content.
  
  Some information from the request is not copied over; use this onlyl for requests
  that will be sent to the cache.

  @param {Request} request - resource requested
  @return {Request} request without query parameterss
*/
function removeQueryParameters(request) {
  let url = new URL(request.url);
  url.fragment = '';
  url.search = '';
  // by passing in only the url, some information is lost. 
  return new Request(url);
}