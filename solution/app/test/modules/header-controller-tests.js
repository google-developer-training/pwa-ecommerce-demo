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
// jshint esversion: 6
import HeaderController from 'header-controller';
import sinon from 'sinon-es6';
import $ from 'jquery';

const containerID = 'headers';

QUnit.module('Header controller', {beforeEach: () => {
  let fixture = document.getElementById('qunit-fixture');
  fixture.innerHTML = window.__html__['headers-fixture'];
}});

QUnit.test('default selection is "shop"', assert => {
  let container = document.getElementById(containerID);
  let header = new HeaderController();
  assert.equal(header.selection, 'shop', 'selection');
  });

QUnit.test('default selection is shop links only', assert => {
  let hrefs = getActiveLinks();
  assert.deepEqual(hrefs, ['#shop', '#shop'], 'default selection');
  });

QUnit.test('can install selection to URL', assert => {
  let controller = new HeaderController();
  assert.equal(controller.selection, 'shop', 'selection is default');
  controller.replaceURLState();
  assert.equal(window.location.hash, '#shop');
  });

QUnit.test('can select cart', assert => {
  let header = new HeaderController();
  header.selection = 'cart';
  assert.equal(header.selection, 'cart', 'new selection');
  let hrefs = getActiveLinks();
  assert.deepEqual(hrefs, ['#cart', '#cart'], 'changed selection');
  });

QUnit.test('default cart count is 0 (empty)', assert => {
  let header = new HeaderController();
  assert.equal(header.count, 0, 'default count');
  let counts = getCartCounts();
  assert.deepEqual(counts, ['', ''], 'no label');
  });

function getActiveLinks() {
  let container = document.getElementById(containerID);
  let activeLinks = container.querySelectorAll('a.is-active');
  activeLinks = Array.prototype.slice.call(activeLinks); // make array
  return activeLinks.map((node) => node.getAttribute('href'));
}

function getCartCounts() {
  let container = document.getElementById(containerID);
  let counts = container.querySelectorAll('span.cart-count');
  counts = Array.prototype.slice.call(counts);
  return counts.map((node) => node.innerText.trim());
}
