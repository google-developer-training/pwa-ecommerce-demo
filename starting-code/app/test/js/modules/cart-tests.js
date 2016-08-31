// jshint esversion: 6
import Cart from 'modules/cart';

QUnit.module('Cart');

QUnit.test('default values', assert => {
    const cart = new Cart();
    assert.equal(cart.length, 0, 'cart starts empty');
    assert.equal(cart.total, 0, 'no price');
  });

  QUnit.test('adding a valid order', assert => {
      const cart = new Cart();
      let entry = cart.add('C10');
      assert.equal(cart.length, 1, 'order count');
      assert.equal(entry.sku, 'C10', 'sku');
      assert.equal(entry.quantity, 1, 'quantity');
      assert.ok(entry.title, 'title');
      assert.ok(entry.price, 'price');
    });
