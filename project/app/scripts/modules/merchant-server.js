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

/*
 * Normally you'd send everything through to your server to complete the
 * order. Instead, we're going to show the details on the screen.
 */
export default function sendToServer(data) {
  return fetch('/checkout/', {
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
    return true;
  });
}

/*
 * Sample of sending to the back-end for processing
 * This posts to a sample server that ships with this example.
 * It returns a JSON object with success == true.
 *
function sendToServer(data) {
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
        resolve(json);
      } else {
        reject('Payment not successful');
      }
    }).catch(e => {
      reject(e);
    });
  });
}
 */