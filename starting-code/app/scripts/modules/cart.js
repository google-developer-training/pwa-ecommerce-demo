
//jshint esversion: 6

import { products, find } from 'modules/products';

export default class Cart {
  constructor () {
    this.orders = [];
  }

  findOrder(sku) {
    return this.orders.find(product => product.sku === sku);
  }

  // Add the product with the specified sku and quantity to the cart.
  // sku must match one of the products, quantity must be > 0
  // Returns a cart entry if successful, null otherwise
  add(sku, quantity=1) {
    let product = find(sku);
    if (quantity < 0 || !product) return null;

    let oldOrder = this.findOrder(sku);
    let order = oldOrder ||
      { sku: (sku),
        quantity: 0,
        title: (product.title),
        price: (product.price),
      };
    order.quantity += quantity;
    order.total = product.price * order.quantity;
    if (!oldOrder) this.orders.push(order);
    return order;
  }

  get length() {
    return this.orders.length;
  }

  get total() {
    return 0;
  }

  get cart() {
    return this.orders;
  }
}
