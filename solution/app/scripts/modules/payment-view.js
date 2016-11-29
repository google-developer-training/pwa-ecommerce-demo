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

import processPayment from 'payment';
import showToast from 'snackbar';
import hasPaymentRequest from 'features';

export default class PaymentView {

  constructor (cart, containerId='payment') {
    this._containerId = containerId;
    this._container = document.getElementById(this._containerId);
    this._checkout_form = document.getElementById('checkout_form');
    this._cart = cart;
  }

  install() {
    this._checkout_form.addEventListener('submit', this.handleCheckout.bind(this));
  }

  handleCheckout(event) {
    var data = new FormData(event.target);

    if (hasPaymentRequest()) {
      processPayment(this._cart)
      .then(result => {
        location.href = '/checkout.html';
      }).catch(e => {
        console.log('Payment failed due to exception: ' + e);
        showToast('Payment failed (see console)');
      });
    } else {
      this.processOnServer(data);
    }
  }

  /* Alternate path using a checkout page on the server *
  /* window
   */
  processOnServer(data) {
    fetch('/checkout', {
      method: 'POST',
      credentials: 'include',
      body: data
    }).then(result => {
      if (result.status === 200) {
        return result.json();
      } else {
        throw 'Payment failure';
      }
    }).then(result => {
      console.log('Payment response: ' + JSON.stringify(result));
      location.href = '/checkout.html';
    }).catch(e => {
      console.log('Payment failed due to exception: ' + e);
      showToast('Payment failed (see console)');
    });
  }

  set visible(vis) {
    if (vis && !this.visible) {
      //  do any setup required
    }
    if (vis) {
      this._container.removeAttribute('hidden');
    } else {
      this._container.setAttribute('hidden', true);
    }
  }

  get visible() {
    return !this._container.hasAttribute('hidden');
  }

}
