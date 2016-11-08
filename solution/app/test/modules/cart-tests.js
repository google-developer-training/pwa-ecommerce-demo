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
import Cart from 'cart';
import {CART_EVENT} from 'cart';
import Product from 'product';
import LocalStorage from 'local-storage';
import sinon from 'sinon-es6';

const c10 = new Product('C10', 'C10 Chair', 100.00, 'C10.jpg', 'PUT TEXT HERE');
const cl2 = new Product('Cl2', 'CL2 Chair', 150.00, 'Cl2.jpg', 'PUT TEXT HERE');

QUnit.module('Cart');

QUnit.test('default values', assert => {
    const cart = new Cart();
    assert.equal(cart.length, 0, 'cart starts empty');
    assert.equal(cart.total, 0, 'no price');
  });

QUnit.test('adding a valid order', assert => {
    const cart = new Cart();
    let entry = cart.add(c10);
    assert.equal(cart.length, 1, 'order count');
    assert.equal(entry.sku, 'C10', 'sku');
    assert.equal(entry.quantity, 1, 'quantity');
    assert.ok(entry.title, 'title');
    assert.ok(entry.price, 'price');
    assert.equal(entry.price, entry.total, 'total');
  });

  QUnit.test('adding a valid order with quantity > 1', assert => {
      const cart = new Cart();
      let entry = cart.add(c10, 3);
      assert.equal(cart.length, 1, 'order count');
      assert.equal(entry.sku, 'C10', 'sku');
      assert.equal(entry.quantity, 3, 'quantity');
      assert.ok(entry.title, 'title');
      assert.ok(entry.price, 'price');
      assert.equal(3 * entry.price, entry.total, 'total');
    });

QUnit.test('finding a new order', assert => {
    const cart = new Cart();
    cart.add(c10);
    let entry = cart.findItem(c10.sku);
    assert.equal(cart.length, 1, 'order count');
    assert.equal(entry.sku, 'C10', 'sku');
    assert.equal(entry.quantity, 1, 'quantity');
    assert.ok(entry.title, 'title');
    assert.ok(entry.price, 'price');
    assert.equal(entry.price, entry.total, 'total');
  });

QUnit.test('merging orders for the same SKU', assert => {
    const cart = new Cart();
    cart.add(c10);
    cart.add(c10);
    let entry = cart.findItem(c10.sku);
    assert.equal(cart.length, 1, 'order count');
    assert.equal(entry.sku, 'C10', 'sku');
    assert.equal(entry.quantity, 2, 'quantity');
    assert.ok(entry.title, 'title');
    assert.ok(entry.price, 'price');
    assert.equal(2 * entry.price, entry.total, 'total');
  });

QUnit.test('resetting the order count', assert => {
    const cart = new Cart();
    cart.add(c10, 4);
    cart.change(c10, 2);
    assert.equal(cart.findItem(c10.sku).quantity, 2, 'removed');
  });

QUnit.test('removing an order', assert => {
    const cart = new Cart();
    cart.add(c10);
    cart.remove(c10);
    assert.equal(cart.findItem(c10.sku), null, 'removed');
  });

QUnit.test('setting quantity to 0 removes an item', assert => {
    const cart = new Cart();
    cart.add(c10, 3);
    cart.change(c10, 0);
    assert.equal(cart.findItem(c10.sku), null, 'removed');
  });

QUnit.test('computing the total', assert => {
    const cart = new Cart();
    cart.add(c10, 1);
    assert.equal(cart.total, 100, 'single c10 price');
    cart.add(c10, 2);
    assert.equal(cart.total, 300, 'c10 price * 3');
    cart.add(cl2, 1);
    assert.equal(cart.total, 450, 'adding cl2 @ 150');
});

QUnit.test('resetting the cart', assert => {
    const cart = new Cart();
    cart.add(c10);
    cart.reset();
    assert.equal(cart.length, 0, 'removed');
  });

QUnit.module('Cart storage');

QUnit.test('uses the adaptor to save', assert => {
    const adaptor = new LocalStorage();
    let saveStub = sinon.stub(adaptor, 'save');
    const cart = new Cart(adaptor);
    cart.add(c10);
    cart.save();
    assert.ok(saveStub.called, 'items saved');
  });

QUnit.test('uses the adaptor to load', assert => {
    const adaptor = new LocalStorage();
    let saveStub = sinon.stub(adaptor, 'load');
    const cart = new Cart(adaptor);
    cart.add(c10);
    cart.load();
    assert.ok(saveStub.called, 'items loaded');
  });

QUnit.module('Cart event');

QUnit.test('sends cart event on add', assert => {
    var done = assert.async();
    const cart = new Cart();
    const listener = (event) => {
      assert.equal(event.detail.action, 'add', 'action');
      assert.equal(event.detail.sku, 'C10', 'sku');
      assert.equal(event.detail.quantity, 1, 'quantity');
      document.removeEventListener(CART_EVENT, listener);
      done();
    };
    document.addEventListener(CART_EVENT, listener);
    cart.add(c10);
  });

  // Not testing the other events for now as it would be a hassle!
