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

import Cart from 'cart';
import Product from 'product';
import LocalStorage from 'local-storage';
import sinon from 'sinon-es6';
import assert from 'assert';

const c10 = new Product('C10', 'C10 Chair', 100.00, 'C10.jpg', 'PUT TEXT HERE');
const cl2 = new Product('Cl2', 'CL2 Chair', 150.00, 'Cl2.jpg', 'PUT TEXT HERE');

describe('Cart', () => {

  it('should be empty when created', () => {
      const cart = new Cart();
      assert.equal(cart.length, 0);
      assert.equal(cart.total, 0);
  });

  describe('add', () => {
    it('should return the required fields for display', () => {
      const cart = new Cart();
      let entry = cart.add(c10);
      assert.equal(cart.length, 1, 'order count');
      assert.equal(entry.sku, 'C10', 'sku');
      assert.equal(entry.quantity, 1, 'quantity');
      assert.ok(entry.price, 'price');
      assert.equal(entry.price, entry.total, 'total');
    });

    it('should accept quantities > 1', () => {
      const cart = new Cart();
      let entry = cart.add(c10, 3);
      assert.equal(cart.length, 1, 'order count');
      assert.equal(entry.quantity, 3, 'quantity');
      assert.ok(entry.price, 'price');
      assert.equal(3 * entry.price, entry.total, 'total');
    });

    it('should merge orders for the same SKU', () => {
      const cart = new Cart();
      cart.add(c10);
      cart.add(c10);
      let entry = cart.findItem(c10.sku);
      assert.equal(cart.length, 1, 'order count');
      assert.equal(entry.sku, 'C10', 'sku');
      assert.equal(entry.quantity, 2, 'quantity');
      assert.equal(2 * entry.price, entry.total, 'total');
    });
  });

  describe('find', () =>{
    it('should locate an item by SKU', () => {
      const cart = new Cart();
      cart.add(c10);
      let entry = cart.findItem(c10.sku);
      assert.equal(entry.sku, 'C10', 'sku');
    });

    it('should return null for missing items', () => {
      const cart = new Cart();
      cart.add(c10);
      let entry = cart.findItem('c11'); // not the SKU
      assert.equal(entry, null);
    });
  });

  describe('change', () => {
    it('should update the quantity for a single item', () => {
      const cart = new Cart();
      cart.add(c10, 4);
      const item_c12 = cart.add(cl2, 3);

      const item_c10 = cart.change(c10, 2);
      assert.equal(item_c10.quantity, 2, 'changed');
      assert.equal(item_c12.quantity, 3, 'unchanged');
    });

    it('should remove the item when quantity == 0', () => {
      const cart = new Cart();
      cart.add(c10, 3);
      cart.change(c10, 0);
      assert.equal(cart.findItem(c10.sku), null, 'removed');
    });
  });

  describe('remove', () => {
    it('should remove an existing item', () => {
      const cart = new Cart();
      cart.add(c10);
      cart.add(cl2);
      cart.remove(c10);
      assert.equal(cart.findItem(c10.sku), null, 'removed');
    });

    it('should leave other items untouched', () => {
      const cart = new Cart();
      cart.add(c10);
      cart.add(cl2);
      cart.remove(c10);
      assert.ok(cart.findItem(cl2.sku), 'remains');
    });
  });

  describe('reset', () => {
    it('empties the cart', () => {
      const cart = new Cart();
      cart.add(c10);
      cart.reset();
      assert.equal(cart.length, 0, 'removed');
    });
  });

  describe('total', () => {
    it('adds up the total price', () => {
      const cart = new Cart();
      cart.add(c10, 1);
      assert.equal(cart.total, 100, 'single c10 price');
      cart.add(c10, 2);
      assert.equal(cart.total, 300, 'c10 price * 3');
      cart.add(cl2, 1);
      assert.equal(cart.total, 450, 'adding cl2 @ 150');
    });
  });

  describe('storage', () => {
    it('should use the adaptor to save', () => {
      const adaptor = new LocalStorage();
      let saveStub = sinon.stub(adaptor, 'save');
      saveStub.returns(Promise.resolve([]));
      const cart = new Cart(adaptor);
      cart.add(c10);
      cart.save();
      assert.ok(saveStub.called, 'items saved');
    });

    it('should use the adaptor to load', () => {
      const adaptor = new LocalStorage();
      let loadStub = sinon.stub(adaptor, 'load');
      loadStub.returns(Promise.resolve([]));
      const cart = new Cart(adaptor);
      cart.load();
      assert.ok(loadStub.called, 'items loaded');
    });
  });

  describe('callback', () => {
    it('should be called after add', done => {
      const cart = new Cart(null, details => {
        assert.equal(details.action, 'add', 'action');
        assert.equal(details.sku, 'C10', 'sku');
        assert.equal(details.quantity, 1, 'quantity');
        done();
      });
      cart.add(c10); // triggers above
    });
  });
});
