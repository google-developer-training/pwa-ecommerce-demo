// jshint esversion: 6
import Cart from 'modules/cart';

QUnit.module('Cart tests');

QUnit.test('new cart', assert => {
    const cart = new Cart();
    assert.equal(cart.length, 0, 'cart starts empty');
    assert.equal(cart.total, 0, 'no price');
  });
