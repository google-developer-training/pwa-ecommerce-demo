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

//jshint esversion: 6

import { products, findProduct } from 'products';

export const CART_EVENT = "cartchange";

export default class Cart {
  constructor (adaptor) {
    this.items = [];
    this.adaptor = adaptor;
    this._loading = false;
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
    this._sendEvent('add', product, quantity);
    return item;
  }

  remove(product) {
    let index = this.items.findIndex(item => item.sku === product.sku);
    if (index >= 0) {
      this.items.splice(index, 1);
    }
    this._sendEvent('remove', product);
  }

  change(product, quantity) {
    let item = this.findItem(product.sku);
    if (quantity <= 0) {
      this.remove(item);
      this._sendEvent('remove', product);
      return null;
    } else {
      item.quantity = quantity;
      this._sendEvent('change', product, quantity);
      return item;
    }
  }

  reset() {
    this.items = [];
    this._sendEvent('reset');
  }

  get length() {
    return this.items.length;
  }

  get count() {
    let count = 0;
    for (let item of this.items) {
      count += item.quantity;
    }
    return count;
  }

  get total() {
    let total = 0;
    for (let item of this.items) {
      total += item.total;
    }
    return total;
  }

  get cart() {
    return this.items;
  }

  save() {
    if (this.adaptor) {
      this.adaptor.save(this.items);
    }
  }

  load() {
    if (!this.adaptor) return;
    this._loading = true;
    try {
      let items = this.adaptor.load();
      for (let item of items) {
        let product = findProduct(item.product._sku);
        this.add(product, item._quantity);
      }
    } catch (e) {
      this.items = [];
    }
    this._loading = false;
    this._sendEvent('load');
  }

  _sendEvent(action, product, quantity) {
    if (this._loading) return; // don't spam the app with events
    let details = {'action': (action), 'total': (this.total)};
    if (product) details.sku = product.sku;
    if (quantity) details.quantity = quantity;
    var event = new CustomEvent(CART_EVENT, { 'detail': (details) });
    document.dispatchEvent(event);
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
