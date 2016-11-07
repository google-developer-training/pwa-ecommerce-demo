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
export default class HeaderView {

  constructor (containerId='headers') {
    this._containerId = containerId;
    this._element = 'div';
    this._elementClass = 'product';
//    this._addHandler = this._handleProductClick.bind(this);
  }

  render () {
    // TODO don't re-render if this has been rendered? At most
    // we would need to switch some attributes
    let container = document.getElementById(this._containerId);
    container.innerHTML = ''; // remove all children
    for (let product of this._products) {
      let placeholder = document.createElement('div');
      placeholder.innerHTML = `<div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
          <header class="mdl-layout__header mdl-layout__header--waterfall portfolio-header">
              <div class="mdl-layout__header-row portfolio-logo-row">
                  <span class="mdl-layout__title">
                      <div class="portfolio-logo"></div>
                      <span class="mdl-layout__title">Modern Furniture Store</span>
                  </span>
              </div>
              <div class="mdl-layout__header-row portfolio-navigation-row mdl-layout--large-screen-only">
                  <nav class="mdl-navigation mdl-typography--body-1-force-preferred-font">
                    <a class="mdl-navigation__link is-active" href="index.html">Shop</a>
                    <a class="mdl-navigation__link" href="cart.html">Cart</a>
                  </nav>
              </div>
          </header>
          <div class="mdl-layout__drawer mdl-layout--small-screen-only">
              <nav class="mdl-navigation mdl-typography--body-1-force-preferred-font">
                <a class="mdl-navigation__link is-active" href="index.html">Shop</a>
                <a class="mdl-navigation__link" href="cart.html">Cart</a>
              </nav>
          </div>
      </div>`;
      container.appendChild(placeholder.firstElementChild); // WARN: no ie8
    }
    // Capture add events (clicks) as they bubble up
    // N.B. Duplicate listeners will be discarded, so safe to call on each render
    // (e.g. in case the container has been replaced)
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

  get itemSelector() {
    return `${this._element}.${this._elementClass}`;
  }

}
