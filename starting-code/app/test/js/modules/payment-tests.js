// jshint esversion: 6
import Cart from 'modules/cart';
import Product from 'modules/product';
import pay from 'modules/payment';

QUnit.module('Payments');

QUnit.test('payment works', assert => {
    // jQuery defines assert.async() to return a fucntion to call at the end
    // of the test. gulp-qunit defines start() at the beginning of the test
    // and stop() at the end. So we have to shim this a bit.

    if (start) start();
    let done = stop || assert.async();

    const c10 = new Product('C10', 'C10 Chair', 100.00, 'C10.jpg', 'PUT TEXT HERE');
    const cart = new Cart();

    cart.add(c10);
    pay(cart)
      .then((response) => {
        // TODO check if the response is OK
        assert.ok(payment.ok);
        stop();
      })
      .catch((error) => {
        throw new Error(error);
      });
  });
