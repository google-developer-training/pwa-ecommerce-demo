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

//jshint esversion: 6
export function replaceLocationHash(hash, baseUrl = window.location) {
  let url = urlWithHash(hash, baseUrl);
  history.replaceState({}, "", url);
}

export function pushLocationHash(hash, baseUrl = window.location) {
  window.location = urlWithHash(hash, baseUrl);
}

function urlWithHash(hash, baseUrl) {
  let url = baseUrl.toString();
  let index = url.indexOf('#');
  if (index >= 0) url = url.substring(0, index);
  return url +  '#' + hash;
};
