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

import sendToServer from 'merchant-server';

const SHIPPING_OPTIONS = {
  us: [
    {
      id: 'standard',
      label: 'Standard Shipping',
      price: 0
    },
    {
      id: 'express',
      label: 'Express Shipping',
      price: 10
    }
  ],
  international: [
    {
      id: 'international',
      label: 'International Shipping',
      price: 15
    }
  ]
};

export default class PaymentAPIWrapper {

  /*
  * Given a cart set up with an order, gets payment authorization.
  * Returns a promise that resolves when payment is complete, this
  * has a data object you can pass to the back-end payment server.
  */
  checkout(cart) {
    let request = this.buildPaymentRequest(cart);
    let response;
    // Show UI then continue with user payment info

    // TODO PAY-6 - display the PaymentRequest
    return request.show();

  }

  /*
   * Creates a PaymentRequest object including the event handlers used to
   * update the payment details as the user makes choices.
   */
  buildPaymentRequest(cart) {
    // Supported payment instruments
    const supportedInstruments = [

      // TODO PAY-4 - add a list of accepted payment methods
      {
        supportedMethods: ['basic-card'],
        data: {
          supportedNetworks: []
        }
      }

    ];

    // Payment options
    const paymentOptions = {

      // TODO PAY-7.1 - allow shipping options

      // TODO PAY-9 - Add payment options

    };

    let shippingOptions = [];
    let selectedOption = null;

    let details = this.buildPaymentDetails(cart, shippingOptions, selectedOption);

    // TODO PAY-3.2 - initialize the PaymentRequest object

    // TODO PAY-8.1 - add `shippingaddresschange` event handler

    // TODO PAY-8.2 - add `shippingoptionchange` event handler

    return request;
  }

  /*
   * Creates the PaymentDetails dictionary inside the PaymentRequest.
   * This can change as the user selects shipping options.
   */
  buildPaymentDetails(cart, shippingOptions, shippingOptionId) {

    // TODO PAY-5 - define the display items
    let displayItems = [];

    let total = cart.total;

    // TODO PAY-7.3 - allow shipping options

    let details = {
      displayItems: displayItems,
      total: {
        label: 'Total due',
        amount: {currency: 'USD', value: String(total)}
      }
      // TODO PAY-7.2 - allow shipping options
    };

    return details;
  }

  /*
   * Utility function to extract the correct shipping options for a country.
   */
  optionsForCountry(country) {
    country = country.toLowerCase();
    if (!country || !SHIPPING_OPTIONS.hasOwnProperty(country)) {
      country = 'international';
    }
    let options = SHIPPING_OPTIONS[country];
    // Sort by price, lowest first
    options.sort((a, b) => {
      return a.price - b.price;
    });
    return options;
  }

}
