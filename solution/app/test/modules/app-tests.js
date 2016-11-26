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
import App from 'app';
import HeaderController from 'header-controller';
import Product from 'product';
import assert from 'assert';

describe('App', () => {
  beforeEach(() => {
    fixture.load('/test/fixtures/app.html');
  });

  afterEach(() => {
    fixture.cleanup();
  });

  it('should relay hashChange events to the header controller', () => {
    let app = new App();
    let controller = new HeaderController();
    controller.selection = 'cart';
    app.headerController = controller;

    // Falsify an event
    let event = {oldURL: (window.location), newURL: (window.location+'#shop')};
    app._handleHashChange(event);
    assert.equal(controller.selection, 'shop', 'set selection');
  });

  it('should detect cart changes and trigger save', () => {
    let app = new App();
    let cart = app.cart;
    let storage = app.storage;
    const c10 = new Product('C10', 'C10 Chair', 100.00, 'C10.jpg', 'PUT TEXT HERE');
    app.install();
    storage.key = 'test-cart-storage';
    storage.delete();
    cart.add(c10);
    assert.ok(storage.load(), 'cart saved');
  });

  it('should make only the shop visible when selection == shop', () => {
    let app = new App();
    app.selection = 'shop';
    let shop = document.getElementById('shop');
    let cart = document.getElementById('cart');
    assert.ok(isVisible(shop), 'shop visible');
    assert.ok(!isVisible(cart), 'cart hidden');
  });

  it('should make only the cart visible when selection == cart ', () => {
    let app = new App();
    app.selection = 'cart';
    let shop = document.getElementById('shop');
    let cart = document.getElementById('cart');
    assert.ok(!isVisible(shop), 'shop hidden');
    assert.ok(isVisible(cart), 'cart visible');
  });

  function isVisible(elt) {
    return !elt.hasAttribute('hidden');
  }
});
