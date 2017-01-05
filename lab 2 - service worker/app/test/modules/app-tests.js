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
import sinon from 'sinon-es6';
import LocalStorage from 'local-storage';

describe('App', () => {
  let app;

  beforeEach(() => {
    fixture.load('/test/fixtures/app.html');
    app = new App();
  });

  afterEach(() => {
    fixture.cleanup();
    app = null;
  });

  it('should relay hashChange events to the header controller', () => {
    let controller = new HeaderController();
    controller.selection = 'cart';
    app.headerController = controller;

    // Falsify an event
    let event = {oldURL: (window.location), newURL: (window.location+'#shop')};
    app._handleHashChange(event);
    assert.equal(controller.selection, 'shop', 'set selection');
  });

  it('should detect cart changes and trigger save', () => {
    app.install();
    const adaptor = app.storage;
    let saveStub = sinon.stub(adaptor, 'save');
    saveStub.returns(Promise.resolve([]));
    app.storage = saveStub;

    let cart = app.cart;
    const c10 = new Product('C10', 'C10 Chair', 100.00, 'C10.jpg', 'TEXT');
    cart.add(c10);
    assert.ok(saveStub.called, 'cart saved');
  });

  it('should make only the shop visible when selection == shop', () => {
    app.selection = 'shop';
    let shop = document.getElementById('shop');
    let cart = document.getElementById('cart');
    assert.ok(isVisible(shop), 'shop visible');
    assert.ok(!isVisible(cart), 'cart hidden');
  });

  it('should make only the cart visible when selection == cart ', () => {
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
