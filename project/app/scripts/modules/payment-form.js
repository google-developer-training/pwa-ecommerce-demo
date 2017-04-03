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

  constructor(cart, confirmationView, containerId = 'payment') {
    super(containerId);
    this._checkoutForm = document.getElementById('payment_form');
    this._cart = cart;
    this._confirmationView = confirmationView;
    this._promise = null;
  }

  /*
   * Performs the checkout using the form. Returns a promise that resolves when
   * the user checks out.
   */
  checkout() {
    // TODO how do we handle cart abandonment?
    var self = this;
    this.visible = true;
    this._promise = new Promise((resolve, reject) => {
      this._checkoutForm.addEventListener('submit', function temp(event) {
        event.preventDefault();
        var data = new FormData(event.target);
        self._showRequest(data);
        return Promise.resolve(data)
          .then(sendToServer)
          .then(json => {
            self._showResponse(json);
            resolve(json);
          })
          .catch(e => reject(e))
          .then(() => self._checkoutForm.removeEventListener('submit', temp));
      });
    });
    return this._promise;
  }

  abort() {
    this._promise.reject('aborted');
  }

  _showRequest(formData) {
    if (this._confirmationView) {
      this._confirmationView.requestData = this._toJSON(formData);
    }
  }

  _showResponse(json) {
    if (this._confirmationView) {
      this._confirmationView.responseData = json;
    }
  }

  _toJSON(formData) {
    let obj = {};
    for (let entry of formData) {
      obj[entry.key] = entry.value;
    }
    return JSON.stringify(obj);
  }

}
