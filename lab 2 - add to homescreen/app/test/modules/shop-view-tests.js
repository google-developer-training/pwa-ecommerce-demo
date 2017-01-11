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
import ShopView from 'shop-view';
import {products} from 'products';
import sinon from 'sinon-es6';
import assert from 'assert';
import $ from 'jquery';

describe('Shop view', () => {
  const noCart = null;
  const CONTAINER_ID = 'shop';

  beforeEach(() => {
    fixture.load('/test/fixtures/shop.html');
  });

  afterEach(() => {
    fixture.cleanup();
  });

  it('should be empty for an empty product list ', () => {
    let container = document.getElementById(CONTAINER_ID);
    let view = new ShopView(noCart, []);
    view.render();
    assert.ok(!container.hasChildNodes(), 'cart template is empty after render');
  });

  it('should render a single row for a single item ', () => {
    let container = document.getElementById(CONTAINER_ID);
    let view = new ShopView(noCart, [products[0]]);
    view.render();
    let items = container.querySelectorAll(view.itemSelector);
    assert.equal(items.length, 1, 'rows rendered');
  });

  it('should render two rows for two items', () => {
    let container = document.getElementById(CONTAINER_ID);
    let view = new ShopView(noCart, products.slice(0, 2));
    view.render();
    let items = container.querySelectorAll(view.itemSelector);
    assert.equal(items.length, 2, 'rows rendered');
  });

  it('should update the cart after click to buy', () => {
    let cart = new Cart();
    let addStub = sinon.stub(cart, 'add');

    let container = document.getElementById(CONTAINER_ID);
    let view = new ShopView(cart, products.slice(0, 2));
    view.install();
    view.render();
    let button = container.querySelector('button.mdl-button');
    assert.ok(button, "click target found");
    $(button).trigger($.Event("click"));
    assert.ok(addStub.called, 'called add');
    assert.ok(addStub.calledWith(products[0]), 'called with product');
  });
});
