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
import CartView from 'cart-view';
import Product from 'product';
import $ from 'jquery';

QUnit.module('Cart-view', {beforeEach: () => {
  let fixture = document.getElementById('qunit-fixture');
  fixture.innerHTML = window.__html__['cart-fixture'];
}});

QUnit.test('test environment is sane', assert => {
  let fixture = document.getElementById('qunit-fixture');
  assert.ok(fixture, 'qunit fixture exists');
  let cart = document.getElementById('cart');
  assert.ok(!cart.hasChildNodes(), 'cart template is empty');
  });

QUnit.test('empty cart adds no items', assert => {
  let table = document.getElementById('cart');
  let cart = new Cart();
  let cartView = new CartView(cart, 'cart');
  cartView.render();
  assert.ok(!table.hasChildNodes(), 'cart template is empty after render');
  });

QUnit.test('single item renders a single row', assert => {
  let cart = new Cart();
  let c10 = new Product('C10', 'C10 Chair', 100.00, 'C10.jpg', 'PUT TEXT HERE');
  cart.add(c10);

  let view = new CartView(cart, 'cart');
  view.render();
  let table = document.getElementById('cart');
  let items = table.querySelectorAll(view.itemSelector);
  assert.equal(items.length, 1, 'rows rendered');
  });

QUnit.test('single item renders price', assert => {
  let cart = new Cart();
  let c10 = new Product('C10', 'C10 Chair', 100.00, 'C10.jpg', 'PUT TEXT HERE');
  cart.add(c10);

  let view = new CartView(cart, 'cart');
  view.render();
  let total = document.getElementById('cart-total');
  assert.equal(total.innerText, '$100', 'total');
  });

QUnit.test('two items', assert => {
  let cart = new Cart();
  let c10 = new Product('C10', 'C10 Chair', 100.00, 'C10.jpg', 'PUT TEXT HERE');
  let cl2 = new Product('Cl2', 'CL2 Chair', 150.00, 'Cl2.jpg', 'PUT TEXT HERE');
  cart.add(c10);
  cart.add(cl2);

  let view = new CartView(cart, 'cart');
  view.render();
  let table = document.getElementById('cart');
  let items = table.querySelectorAll(view.itemSelector);
  assert.equal(items.length, 2, 'rows rendered');
  });

QUnit.test('dual items render price', assert => {
  let cart = new Cart();
  let c10 = new Product('C10', 'C10 Chair', 100.00, 'C10.jpg', 'PUT TEXT HERE');
  let cl2 = new Product('Cl2', 'CL2 Chair', 150.00, 'Cl2.jpg', 'PUT TEXT HERE');
  cart.add(c10);
  cart.add(cl2);

  let view = new CartView(cart, 'cart');
  view.render();
  let total = document.getElementById('cart-total');
  assert.equal(total.innerText, '$250', 'total');
  });

QUnit.test('click to delete item updates cart', assert => {
  let cart = new Cart();
  let c10 = new Product('C10', 'C10 Chair', 100.00, 'C10.jpg', 'PUT TEXT HERE');
  cart.add(c10);

  let view = new CartView(cart, 'cart');
  view.render();
  let button = document.querySelector('button.mdl-button');
  assert.equal(cart.count, 1, 'item exists prior to click');
  assert.ok(button, "click target found");
  $(button).trigger($.Event("click"));
  assert.equal(cart.count, 0, 'item count after deletion');
  });

QUnit.test('click to delete item removes row', assert => {
  let cart = new Cart();
  let c10 = new Product('C10', 'C10 Chair', 100.00, 'C10.jpg', 'PUT TEXT HERE');
  let cl2 = new Product('Cl2', 'CL2 Chair', 150.00, 'Cl2.jpg', 'PUT TEXT HERE');
  cart.add(c10);
  cart.add(cl2);

  let view = new CartView(cart, 'cart');
  view.render();
  let button = document.querySelector('button.mdl-button');
  let c10row = document.querySelector('tr[data-sku=C10]');
  assert.ok(document.querySelector('tr[data-sku=C10]'), 'c10 exists prior to click');
  assert.ok(document.querySelector('tr[data-sku=Cl2]'), 'Cl2 exists prior to click');
  $(button).trigger($.Event("click"));
  assert.ok(!document.querySelector('tr[data-sku=C10]'), 'c10 removed');
  assert.ok(document.querySelector('tr[data-sku=Cl2]'), 'Cl2 exists after click');
});
