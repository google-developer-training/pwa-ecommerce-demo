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

import Cart from 'cart';
import LocalStorage from 'local-storage';
import CartView from 'cart-view';
import ShopView from 'shop-view';
import HeaderController from 'header-controller';
import {products} from 'products';

export default class App {

  constructor() {
    this._storage = new LocalStorage();
    this._cart = new Cart(this._storage);
    this._cartView = new CartView(this._cart);
    this._shopView = new ShopView(this._cart);
    this._header = new HeaderController();
    this._hashChangeListener = this._handleHashChange.bind(this);
  }

  install() {
    window.addEventListener('hashchange', this._hashChangeListener);
  }

  uninstall() {
    window.removeEventListener('hashchange', this._hashChangeListener);
  }

  // Manage element visibility (hide the cart when store is selected and vice versa)
  set selection(sel) {
    this._header.selection = sel;
    this._shopView.visible = sel == 'shop';
    this._cartView.visible = (sel == 'cart' || sel == 'pay');
  }

  run() {
    this.selection = 'shop';
    this._header.replaceURLState(); // window.location == index.html#shop
    this._cart.load();
    this._shopView.render();
    this._cartView.render();

    // *** The following changes are meant to make this a single-page app ***
    // TODO merge payment dialog into index.html, handle payment flow
    // TODO Fix the shop not rendering on first load.
    // TODO add a 'cart' event listener on document. All values of event.detail.action
    // should trigger cart.save() EXCEPT event.detail.action==='load'
    // TODO pick up delete icon, possible add icon
    // TODO confirm item added to cart w/ animation or toast
  }


  // Handle hashChange, manage history (#store or #cart, maybe #pay)
  _handleHashChange(event) {
    if (!event.newURL) return;
    let index = event.newURL.lastIndexOf('#');
    if (index < 0) return;
    let sel = event.newURL.substr(index+1);
    this.selection = sel;
  }

  // Testing hooks
  set headerController(obj) {
    this._header = obj;
  }

}
