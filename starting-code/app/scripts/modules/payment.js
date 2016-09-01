// jshint esversion: 6
import Cart from 'modules/cart';
import Product from 'modules/product';

/*
* Given a cart set up with an order, gets payment authorization.
* The display parameter gives a place to place the UI (could be
* window or a div in the window.)
* Returns a promise that resolves when payment is complete or rejects
* (with a reason) when the payment fails.
* NOTE FOR EIJI: The resolved promise should probably contain a
* data structure with the payment authorization ID, etc. I will
* leave the specific details up to you.
*/
export default function pay(cart, display=window) {
  // TODO Use cart.total to get the total amount to charge
  return Promise.reject('Need to implement payments');
}
