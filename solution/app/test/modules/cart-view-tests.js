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
import assert from 'assert';
import $ from 'jquery';

describe('Cart view', () => {
  beforeEach(() => {
    fixture.load('/test/fixtures/cart.html');
  });

  afterEach(() => {
    fixture.cleanup();
  });

  it('should be empty when the cart is empty', () => {
    let table = document.querySelector('tbody');
    let cart = new Cart();
    let view = new CartView(cart, 'cart');
    view.render();
    let items = table.querySelectorAll(view.itemSelector);
    assert.equal(items.length, 0);
  });

  it('should renders a single row for a single item ', () => {
    let cart = new Cart();
    let c10 = new Product('C10', 'C10 Chair', 100.00, 'C10.jpg', 'PUT TEXT HERE');
    cart.add(c10);

    let view = new CartView(cart, 'cart');
    view.render();
    let table = document.querySelector('tbody');
    let items = table.querySelectorAll(view.itemSelector);
    assert.equal(items.length, 1, 'rows rendered');
  });

  it('should render the price', () => {
    let cart = new Cart();
    let c10 = new Product('C10', 'C10 Chair', 100.00, 'C10.jpg', 'PUT TEXT HERE');
    cart.add(c10);

    let view = new CartView(cart, 'cart');
    view.render();
    let total = document.getElementById('cart-total');
    assert.equal(total.innerText, '$100', 'total');
  });

  it('should render two items when two are present', () => {
    let cart = new Cart();
    let c10 = new Product('C10', 'C10 Chair', 100.00, 'C10.jpg', 'PUT TEXT HERE');
    let cl2 = new Product('Cl2', 'CL2 Chair', 150.00, 'Cl2.jpg', 'PUT TEXT HERE');
    cart.add(c10);
    cart.add(cl2);

    let view = new CartView(cart, 'cart');
    view.render();
    let table = document.querySelector('tbody');
    let items = table.querySelectorAll(view.itemSelector);
    assert.equal(items.length, 2);
  });

  it('should render the total price', () => {
    let cart = new Cart();
    let c10 = new Product('C10', 'C10 Chair', 100.00, 'C10.jpg', 'PUT TEXT HERE');
    let cl2 = new Product('Cl2', 'CL2 Chair', 150.00, 'Cl2.jpg', 'PUT TEXT HERE');
    cart.add(c10);
    cart.add(cl2);

    let view = new CartView(cart, 'cart');
    view.render();
    let total = document.getElementById('cart-total');
    assert.equal(total.innerText, '$250');
  });

  it('should process a click to delete an item', () => {
    let cart = new Cart();
    let c10 = new Product('C10', 'C10 Chair', 100.00, 'C10.jpg', 'PUT TEXT HERE');
    cart.add(c10);

    let view = new CartView(cart, 'cart');
    view.install();
    view.render();
    let button = document.querySelector('button.mdl-button');
    assert.equal(cart.count, 1, 'item exists prior to click');
    assert.ok(button, "click target found");
    $(button).trigger($.Event("click"));
    assert.equal(cart.count, 0, 'item count after deletion');
  });

  it('should remove a deleted row', () => {
    let cart = new Cart();
    let c10 = new Product('C10', 'C10 Chair', 100.00, 'C10.jpg', 'PUT TEXT HERE');
    let cl2 = new Product('Cl2', 'CL2 Chair', 150.00, 'Cl2.jpg', 'PUT TEXT HERE');
    cart.add(c10);
    cart.add(cl2);

    let view = new CartView(cart, 'cart');
    view.install();
    view.render();
    let button = document.querySelector('button.mdl-button');
    let c10row = document.querySelector('tr[data-sku=C10]');
    assert.ok(document.querySelector('tr[data-sku=C10]'), 'c10 exists prior to click');
    assert.ok(document.querySelector('tr[data-sku=Cl2]'), 'Cl2 exists prior to click');
    $(button).trigger($.Event("click"));
    assert.ok(!document.querySelector('tr[data-sku=C10]'), 'c10 removed');
    assert.ok(document.querySelector('tr[data-sku=Cl2]'), 'Cl2 exists after click');
  });
});
