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
export default class HeaderController {

  constructor (containerId='headers') {
    this._containerId = containerId;
    this._element = 'div';
    this._elementClass = 'product';
    this._selection = 'shop';
//    this._addHandler = this._handleProductClick.bind(this);
//    container.addEventListener('click', this._addHandler, false);
  }

/*
  _handleProductClick(event) {
    event.preventDefault();
    var sku = event.target.dataset.sku;
    if (!sku) throw new Error('could not find sku, data- attrs not supported?');
    var product = findProduct(sku, this._products);
    this._cart.add(product);
    this._showConfirmation(product);
    // TODO trigger a cart count display update
  }
*/

  get selection () {
    return this._selection;
  }
}
