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

import View from 'view';
import sendToServer from 'merchant-server';

export default class PaymentForm extends View {

  constructor(cart, containerId = 'payment') {
    super(containerId);
    this._checkoutForm = document.getElementById('payment_form');
    this._cart = cart;
    this._promise = null;
  }

  /*
   * Performs the checkout using the form. Returns a promise that resolves when
   * the user checks out.
   */
  checkout() {
    // TODO how do we handle cart abandonment?
    this.visible = true;
    this._promise = new Promise((resolve, reject) => {
      this._checkoutForm.addEventListener('submit', event => {
        var data = new FormData(event.target);
        return Promise.resolve(data)
          .then(sendToServer)
          .then(json => resolve(json))
          .catch(e => reject(e))
          .then(() => this._checkoutForm.removeEventListener('submit'));
      });
    });
    return this._promise;
  }

  abort() {
    this._promise.reject('aborted');
  }
}
