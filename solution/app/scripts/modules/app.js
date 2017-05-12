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

import Cart from 'cart';
import IDBStorage from 'idb-storage';
import LocalStorage from 'idb-storage';
import CartView from 'cart-view';
import ShopView from 'shop-view';
import PaymentForm from 'payment-form';
import PaymentAPIWrapper from 'payment-api';
import ConfirmationView from 'confirmation-view';
import HeaderController from 'header-controller';
import {replaceLocationHash} from 'url-tools';
import * as features from 'features';

export default class App {

  constructor() {
    this._storage = features.hasIndexedDB ? new IDBStorage() : new LocalStorage();
    this._cart = new Cart(this._storage, this._cartChanged.bind(this));
    this._cartView = new CartView(this._cart);
    this._shopView = new ShopView(this._cart);
    this._paymentForm = new PaymentForm(this._cart);
    this._confirmationView = new ConfirmationView();
    this._header = new HeaderController();
    this._hashChangeListener = this._handleHashChange.bind(this);
  }

  install() {
    window.addEventListener('hashchange', this._hashChangeListener);
    this._shopView.install();
    this._cartView.install();
  }

  uninstall() {
    window.removeEventListener('hashchange', this._hashChangeListener);
  }

  // Manage element visibility (hide the cart when store is selected and vice versa)
  set selection(sel) {
    switch(sel) {
      case 'shop':
      case 'cart':
        this._header.selection = sel;
        this._shopView.visible = sel === 'shop';
        this._cartView.visible = sel !== 'shop';
        this._paymentForm.visible = false;
        this._confirmationView.visible = false;
        break;

      case 'pay':
        this._header.selection = 'cart';
        this._cartView.visible = true;
        this._confirmationView.visible = false;
        this._paymentForm.visible = false;
        let _promise;
        if (window.PaymentRequest) {
          let api = new PaymentAPIWrapper();
          _promise = api.checkout(this._cart);
        } else {
          this._paymentForm.visible = true;
          _promise = this._paymentForm.checkout(this._cart);
        }
        _promise
          .then(result => {
            if (result) {
              this._cart.reset();
              replaceLocationHash('shop');
              this.selection = 'shop';
              alert('Thanks for shopping! Payment successfully complete :)');
            } else {
              console.log('payment canceled');
            }
          })
          .catch(e => {
            if (e) {
              alert('Sorry, payment failed :(');
            } else {
              console.log('payment canceled');
            }
          });
        break;

      case 'confirm':
        this._header.selection = 'cart';
        this._cartView.visible = false;
        this._paymentForm.visible = false;
        this._confirmationView.visible = true;
        break;
    }
  }

  run() {
    replaceLocationHash('shop');
    this._cart.load().then(() => {
      this._shopView.render();
      this._cartView.render();
      this._updateCartCountDisplay();
      this.selection = 'shop';
    });
  }

  // Handle hashChange, manage history (#store or #cart, maybe #pay)
  _handleHashChange(event) {
    if (!event.newURL) return;
    let index = event.newURL.lastIndexOf('#');
    if (index < 0) return;
    let sel = event.newURL.substr(index+1);
    this.selection = sel;
  }

  _cartChanged(details) {
    if (details.action === 'load') return;
    this._updateCartCountDisplay();
    this._cartView.render();
    this._cart.save();
  }

  _updateCartCountDisplay() {
    this._header.count = this._cart.count;
  }
  // Testing hooks
  set headerController(obj) {
    this._header = obj;
  }

  get cart() {
    return this._cart;
  }

  get storage() {
    return this._storage;
  }

  set storage(adaptor) {
    this._storage = adaptor;
    this._cart.storage = adaptor;
  }

}
