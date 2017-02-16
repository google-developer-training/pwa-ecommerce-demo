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
  us: {
    standard: {
      id: 'standard',
      label: 'Standard Shipping',
      price: 0
    },
    express: {
      id: 'express',
      label: 'Express Shipping',
      price: 10
    }
  },
  international: {
    international: {
      id: 'international',
      label: 'International Shipping',
      price: 15
    }
  }
};

const PAYMENT_METHODS = [

  // TODO PAY-3 - add a list of accepted payment methods

];

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

    return // TODO PAY-6 - display the PaymentRequest

      // .then(r => {
      //   response = r;
      //   // Extract just the details we want to send to the server
      //   var data = this.copy(response, 'methodName', 'details', 'payerEmail',
      //     'payerPhone', 'shippingOption');
      //   data.address = this.copy(response.shippingAddress, 'country', 'region',
      //     'city', 'dependentLocality', 'addressLine', 'postalCode',
      //     'sortingCode', 'languageCode', 'organization', 'recipient', 'careOf',
      //     'phone');
      //   return data;
      // })
      // .then(sendToServer)
      // .then(() => {
      //   response.complete('success');
      // })
      // .catch(e => {
      //   if (response) response.complete(`fail: ${e}`);
      // });
  }

  /*
   * Creates a PaymentRequest object including the event handlers used to
   * update the payment details as the user makes choices.
   */
  buildPaymentRequest(cart) {
    // Supported payment instruments
    const supportedInstruments = [{
      supportedMethods: (PAYMENT_METHODS)
    }];

    // Payment options
    const paymentOptions = {

      // TODO PAY-5 - add payment options

    };

    let shippingOptions = [];
    let selectedOption = null;

    let details = this.buildPaymentDetails(cart, shippingOptions, selectedOption);

    // TODO PAY-2 - initialize the PaymentRequest object

    // When user selects a shipping address, add shipping options to match
    request.addEventListener('shippingaddresschange', e => {
      e.updateWith(_ => {
        // Get the shipping options and select the least expensive
        shippingOptions = this.optionsForCountry(request.shippingAddress.country);
        selectedOption = shippingOptions[0].id;
        let details = this.buildPaymentDetails(cart, shippingOptions, selectedOption);
        return Promise.resolve(details);
      });
    });

    // When user selects a shipping option, update cost, etc. to match
    request.addEventListener('shippingoptionchange', e => {
      e.updateWith(_ => {
        selectedOption = request.shippingOption;
        let details = this.buildPaymentDetails(cart, shippingOptions, selectedOption);
        return Promise.resolve(details);
      });
    });

    return request;
  }

  /*
   * Creates the PaymentDetails dictionary inside the PaymentRequest.
   * This can change as the user selects shipping options.
   */
  buildPaymentDetails(cart, shippingOptions, shippingOptionId) {

    // TODO PAY-4.2 - define the display items

    let total = cart.total;

    // TODO PAY-4.3 - define the shipping options

    // TODO PAY-4.1 - define the details object
  }

  /**
   * Utility function to extract fields from one object and copy them into a new
   * object.
   * @param {object} source copies from this object
   * @param {...string} fields names of fields to copy
   * @returns {object} new object with only the specified fields (copied from source)
   */
  copy(source, ...fields) {
    if (source === null) return source;
    let result = {};
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      result[field] = source[field];
    }
    return result;
  }

  /*
   * Utility function to extract the correct shipping options for a country.
   */
  optionsForCountry(country) {
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
