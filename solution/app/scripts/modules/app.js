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
import CartView from 'cart-view';
import ShopView from 'shop-view';
import HeaderController from 'header-controller';
import {products} from 'products';

export default class App {

  constructor() {
    this._cart = new Cart();
    this._cartView = new CartView(this._cart);
    this._shop = new ShopView(this._cart);
    this._header = new HeaderController();
  }

  run() {
    this._shop.render();
    this._cartView.render();
    // TODO set initial window.location
    // TODO handle hashChange, manage history
    // TODO manage element visibility
    // TODO handle payment flow
  }
}
