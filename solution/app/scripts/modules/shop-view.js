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
import {products, findProduct} from 'products';

export default class ShopView {

  constructor (cart, productSelection=products, containerId='shop') {
    this._cart = cart;
    this._products = productSelection;
    this._containerId = containerId;
    this._element = 'div';
    this._elementClass = 'product';
    this._addHandler = null;
    this._container = document.getElementById(this._containerId);
  }

  render () {
    this._container.innerHTML = ''; // remove all children
    for (let product of this._products) {
      let placeholder = document.createElement('div');
      // TODO add mdl icon
      placeholder.innerHTML = `<div class="mdl-cell mdl-card mdl-shadow--4dp portfolio-card product">
        <div class="mdl-card__media">
          <img class="article-image" src=" images/products/${product.image}" border="0" alt="">
        </div>
        <div class="mdl-card__title">
          <h2 class="mdl-card__title-text">${product.title}</h2>
        </div>
        <div class="mdl-card__supporting-text">
          ${product.description}
        </div>
        <div class="mdl-card__actions mdl-card--border">
          <button class="mdl-button mdl-button--colored mdl-js-button
            mdl-js-ripple-effect mdl-button--accent add-to-cart"
            data-sku="${product.sku}">
            Add to Cart
          </button>
        </div>
      </div>`;
      this._container.appendChild(placeholder.firstElementChild); // WARN: no ie8
    }
    // Capture add events (clicks) as they bubble up. Only add once.
    if (!this._addHandler) {
      this._addHandler = this._handleProductClick.bind(this);
      this._container.addEventListener('click', this._addHandler, false);
    }
  }

  set visible(vis) {
    if (vis && !this.visible) {
      this.render(); // redraw before reveal
    }
    this._container.style.display = vis ? 'block' : 'none';
  }

  get visible () {
    return this._container.style.display == 'block';
  }

  _handleProductClick(event) {
    event.preventDefault();
    // MDL inserts an animated span as a child of the button; it gets the click.
    // We may need to look at the parent to find the button.
    let target = event.target;
    if (target == this._container) return;
    while (target.nodeName != 'BUTTON') {
      target = target.parentNode;
    }
    var sku = target.dataset.sku;
    if (!sku) throw new Error('could not find sku, data- attrs not supported?');
    var product = findProduct(sku, this._products);
    this._cart.add(product);
    this._showConfirmation(product);
  }

  _showConfirmation(product) {
    // TODO implement. e.g. using #dialog (see main.js)
  }

  // utility for unit testing (used in counting the number of elements)
  get itemSelector() {
    return `${this._element}.${this._elementClass}`;
  }

}
