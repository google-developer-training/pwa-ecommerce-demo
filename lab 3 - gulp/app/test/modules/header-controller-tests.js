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
import assert from 'assert';

const CONTAINER_ID = 'headers';

describe('Header controller', () => {
  beforeEach(() => {
    fixture.load('/test/fixtures/headers.html');
  });

  afterEach(() => {
    fixture.cleanup();
  });

  it('should select "shop" initially', () => {
    let header = new HeaderController();
    assert.equal(header.selection, 'shop');
  });

  it('should makes the selection\'s links active', () => {
    let hrefs = getActiveLinks();
    assert.deepEqual(hrefs, ['#shop', '#shop']);
  });

  it('can select cart', () => {
    let header = new HeaderController();
    header.selection = 'cart';
    assert.equal(header.selection, 'cart', 'new selection');
    let hrefs = getActiveLinks();
    assert.deepEqual(hrefs, ['#cart', '#cart'], 'changed selection');
  });

  function getActiveLinks() {
    let container = document.getElementById(CONTAINER_ID);
    let activeLinks = container.querySelectorAll('a.is-active');
    activeLinks = Array.prototype.slice.call(activeLinks); // make array
    return activeLinks.map((node) => node.getAttribute('href'));
  };

  describe('cart', () => {
    it('should begin with a count of 0', () => {
      let header = new HeaderController();
      assert.equal(header.count, 0, 'default count');
      let counts = getCartCounts();
      assert.deepEqual(counts, ['', ''], 'no label');
    });

    function getCartCounts() {
      let container = document.getElementById(CONTAINER_ID);
      let counts = container.querySelectorAll('span.cart-count');
      counts = Array.prototype.slice.call(counts);
      return counts.map((node) => node.innerText.trim());
    }
  });
});
