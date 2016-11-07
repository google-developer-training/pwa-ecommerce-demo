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
export default class CartView {

  constructor (cart, containerId='cart') {
    this._cart = cart;
    this._containerId = containerId;
    this._element = 'tr';
    this._elementClass = 'product';
  }

  render () {
    let container = document.getElementById(this._containerId);
    container.innerHTML = ''; // remove all children
    for (let product of this._cart.cart) {
      let placeholder = document.createElement('tbody');
      placeholder.innerHTML = `<tr class="product" data-sku="${product.sku}">
        <td class="mdl-data-table__cell-non-numeric">${product.title}</td>
        <td>${product.quantity}</td>
        <td>$${product.price}</td>
        <td><img class="mdl-button mdl-button--colored mdl-js-button
              mdl-js-ripple-effect mdl-button--accent delete"
              src="images/delete.svg"></td>
      </tr>`;
      container.appendChild(placeholder.firstElementChild); // WARN: no ie8
    }
    // Add the total price
    document.getElementById('cart-total').innerText = `$${this._cart.total}`;
    // TODO Attach a click handler for delete. Sat a data- attribute using setAttribute
  }

  get itemSelector() {
    return `${this._element}.${this._elementClass}`;
  }

}
