// jshint esversion: 6
import cart from 'modules/cart';

QUnit.module('my example tests');

QUnit.test('will this work?', assert => {
     const expected = 'hello foo';

     assert.equal(cart.message, expected);
});
