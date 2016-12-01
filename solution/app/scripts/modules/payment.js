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
  'visa', 'mastercard', 'amex', 'discover', 'maestro',
  'diners', 'jcb', 'unionpay', 'bitcoin'
];

export default class PaymentAPIWrapper {

  /*
  * Given a cart set up with an order, gets payment authorization.
  * Returns a promise that resolves when payment is complete, this
  * has a data object you can pass to the back-end payment server.
  */
  processPayment(cart) {
    let request = this.buildPaymentRequest(cart);
    // Show UI then continue with user payment info
    return request.show().then(result => {
      // Extract just the details we want to send to the server
      var data = this.copy(result, 'methodName', 'details', 'payerEmail',
        'payerPhone', 'shippingOption');
      data.address = this.copy(result.shippingAddress, 'country', 'region',
        'city', 'dependentLocality', 'addressLine', 'postalCode', 'sortingCode',
        'languageCode', 'organization', 'recipient', 'careOf', 'phone');
      return data;
    });
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
      requestShipping: true,
      requestPayerEmail: true,
      requestPayerPhone: true
    };

    let shippingOptions = null;
    let selectedOption = null;

    let details = this.buildPaymentDetails(cart, shippingOptions, selectedOption);

    // Initialize
    let request = new window.PaymentRequest(supportedInstruments, details, paymentOptions);

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
    // Start with the cart items
    let displayItems = cart.cart.map(item => {
      return {
        label: `${item.quantity}x ${item.title}`,
        amount: {currency: 'USD', value: String(item.total)},
        selected: false
      };
    });
    let total = cart.total;

    let displayedShippingOptions = null;
    if (shippingOptions) {
      let selectedOption = shippingOptions[shippingOptionId];
      displayedShippingOptions = shippingOptions.map(option => {
        return {
          id: option.id,
          label: option.label,
          amount: {currency: 'USD', value: String(option.price)},
          selected: option === selectedOption
        };
      });
      total += selectedOption.price;
    }

    let details = {
      displayItems: displayItems,
      total: {
        label: 'Total due',
        amount: {currency: 'USD', value: String(total)}
      },
      shippingOptions: displayedShippingOptions
    };

    return details;
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

/* Park this here until I find the right place for it
 * // At this point, it's all specific to your payment processing system.
       // We'll post to a URL on a sample server that ships with this example.
       // It returns a JSON object with success == true.
       // Of course, you would change this to match your back-end
       return new Promise((resolve, reject) => {
         fetch('/checkout.html', {
           method: 'POST',
           credentials: 'include',
           headers: {
             'Content-Type': 'application/json'
           },
           body: JSON.stringify(data)
         }).then(res => {
           if (res.status !== 200) {
             throw new Error(`Payment failure (id ${res.status})`);
           }
           let json = res.json();
           if (json.success === true) {
             result.complete('success');
             resolve();
           } else {
             result.complete('fail');
             reject('!success');
           }
         }).catch(e => {
           result.complete(`fail: ${e}`);
           reject(e);
         });
       });
 */
