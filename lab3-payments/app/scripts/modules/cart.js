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

import { findProduct } from 'products';

export const CART_EVENT = "cartchange";

export default class Cart {
  constructor (adaptor, changeCallback) {
    this.items = [];
    this._storage = adaptor;
    this._loading = false;
    this._callback = changeCallback; // used to report changes back to the app
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
    this._reportChange('add', product, quantity);
    return item;
  }

  remove(product) {
    let index = this.items.findIndex(item => item.sku === product.sku);
    if (index >= 0) {
      this.items.splice(index, 1);
    }
    this._reportChange('remove', product);
  }

  change(product, quantity) {
    let item = this.findItem(product.sku);
    if (quantity <= 0) {
      this.remove(item);
      this._reportChange('remove', product);
      return null;
    } else {
      item.quantity = quantity;
      this._reportChange('change', product, quantity);
      return item;
    }
  }

  reset() {
    this.items = [];
    this._reportChange('reset');
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
    if (!this._storage) return;
    return this._storage.save(this.items.map((item) => item.savedValue));
  }

  load() {
    if (!this._storage) return;
    this._loading = true;
    return this._storage.load().then(loadedItems => {
      this.items = loadedItems.map((s) => { let li = new LineItem(); li.savedValue = s; return li});
    }).catch(e => {
      this.items = [];
    }).then(() => {
      this._loading = false;
      this._reportChange('load');
      return this.items;
    });
  }

  _reportChange(action, product, quantity) {
    if (this._loading) return; // don't spam the app with events
    let details = {'action': (action), 'total': (this.total)};
    if (product) details.sku = product.sku;
    if (quantity) details.quantity = quantity;
    if (this._callback) this._callback(details);
  }
}

export class LineItem {
  constructor(product, quantity) {
    if (product == null) {
      this._sku = null;
      this._price = this._quantity = 0;
    } else {
      this._sku = product.sku;
      this._price = product.price;
      this._quantity = quantity;
    }
  }

  get sku() {
    return this._sku;
  }

  get price() {
    return this._price;
  }

  get total() {
    return this._quantity * this._price;
  }

  get quantity() {
    return this._quantity;
  }

  set quantity(value) {
    this._quantity = value < 0 ? 0 : value;
  }

  // Only save minimal information (to conserve space & prevent spoofing)
  get savedValue() {
    return {sku: (this._sku), qty: (this._quantity)};
  }

  set savedValue(value) {
    let product = findProduct(value.sku);
    if (!product) throw new Error(`SKU not found: ${value.sku}`);
    this._sku = value.sku;
    this._quantity = value.qty;
    this._price = product.price;
  }

  set storage(adaptor) {
    this._storage = adaptor;
  }

}
