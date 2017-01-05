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

export default class ConfirmationView extends View {

  constructor(containerId = 'confirmation') {
    super(containerId);
    this._requestData = '';
    this._responseData = '';
    this._requestDiv = document.getElementById('requestData');
    this._responseDiv = document.getElementById('responseData');
    // this._clickHandler = null;
    // this._checkoutBtn = document.getElementById('checkoutBtn');
  }

  install() {
    // this._clickHandler = this._handleClick.bind(this);
    // this._container.addEventListener('click', this._clickHandler, true);
  }

  render() {
    this._requestDiv.innerText = this._requestData;
    this._responseDiv.innerText = this._responseData;
  }

  set requestData(value) {
    this._requestData = (value === null ? '' : value);
    this._render();
  }

  set responseData(value) {
    this._responseData = (value === null ? '' : value);
    this._render();
  }

}
