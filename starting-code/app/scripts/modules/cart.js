
//jshint esversion: 6

import { products, findProduct } from 'modules/products';

export default class Cart {
  constructor () {
    this.items = [];
  }

  findItem(sku) {
    return this.items.find(item => item.sku === sku);
  }

  add(product, quantity=1) {
    if (quantity < 0 || !product) return null;
    let item = this.findItem(product.sku);
    if (item) {
      item.quantity += quantity;
    } else {
      item = new LineItem(product, quantity);
      this.items.push(item);
    }
    return item;
  }

  remove(product) {
    let index = this.items.findIndex(item => item.sku === product.sku);
    if (index >= 0) {
      this.items.splice(index, 1);
    }
  }

  change(product, quantity) {
    if (quantity <= 0) {
      this.remove(sku);
      return null;
    } else {
      let item = this.findItem(product.sku);
      item.quantity = quantity;
      return item;
    }
  }

  reset() {
    this.items = [];
  }

  get length() {
    return this.items.length;
  }

  get total() {
    return 0;
  }

  get cart() {
    return this.items;
  }
}

export class LineItem {
  constructor(product, quantity) {
    this.product = product;
    this._quantity = quantity;
  }

  get title() {
    return this.product.title;
  }

  get sku() {
    return this.product.sku;
  }

  get price() {
    return this.product.price;
  }

  get total() {
    return this._quantity * this.product.price;
  }

  get quantity() {
    return this._quantity;
  }

  set quantity(value) {
    this._quantity = value < 0 ? 0 : value;
  }

}
