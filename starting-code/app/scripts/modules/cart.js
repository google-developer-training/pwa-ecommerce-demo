
//jshint esversion: 6

import { products, find } from 'modules/products';

export default class Cart {
  constructor () {
    this.purchases = [];
  }

  // Add the product with the specified sku and quantity to the cart.
  // sku must match one of the products, quantity must be > 0
  // Returns a cart entry if successful, null otherwise
  add(sku, quantity=1) {
    let product = find(sku);
    if (quantity < 0 || !product) return null;
    let lineItem = { sku: (sku),
      quantity: (quantity),
      title: (product.title),
      price: (product.price),
      total: (quantity * product.price), };
    this.purchases.push(lineItem);
    return lineItem;
  }

  get length() {
    return this.purchases.length;
  }

  get total() {
    return 0;
  }

  get orders() {
    return this.purchases;
  }
}
