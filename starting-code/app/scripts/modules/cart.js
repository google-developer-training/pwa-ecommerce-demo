
//jshint esversion: 6

import { products, findProduct } from 'modules/products';

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
    let product = findProduct(sku);
    if (quantity < 0 || !product) return null;
    let probe = this.findOrder(sku);
    if (probe) {
      return this.change(sku, probe.quantity + quantity);
    }

    let order = {
        sku: (sku),
        quantity: (quantity),
        title: (product.title),
        price: (product.price),
        total: (quantity * product.price)
      };
    this.orders.push(order);
    return order;
  }

  remove(sku) {
    let index = this.orders.findIndex(product => product.sku === sku);
    if (index >= 0) {
      this.orders.splice(index, 1);
    }
  }

  change(sku, quantity) {
    if (quantity <= 0) {
      this.remove(sku);
      return null;
    } else {
      let order = this.findOrder(sku);
      order.quantity = quantity;
      order.total = order.price * order.quantity;
      return order;
    }
  }

  reset() {
    this.orders = [];
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
