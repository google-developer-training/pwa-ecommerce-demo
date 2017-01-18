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
export default class HeaderController {

  constructor (containerId='headers') {
    this._containerId = containerId;
    this._selection = 'shop';
    this._count = 0;
  }

  get selection () {
    return this._selection;
  }

  set selection(newValue) {
    if (newValue != 'shop' && newValue != 'cart') return;
    if (newValue == this._selection) return;
    this._selection = newValue;

    // Now update the UI
    let container = document.getElementById(this._containerId);
    // Only two kinds of links, so flip active
    let links = container.querySelectorAll('a.mdl-navigation__link');
    for (let i=0; i < links.length; i++) {
      links[i].classList.toggle('is-active');
    }
  }

  get count() {
    return this._count;
  }

  set count(newCount) {
    if (this._count == newCount) return;
    // TODO use a badge instead
    var label = newCount === 0 ? '' : ` (${newCount} items)`;
    this._count = newCount;
    let spans = document.querySelectorAll(`#${this._containerId} a[href="#cart"]`);
    for (let i=0; i < spans.length; i++) {
      spans[i].innerText = `Cart${label}`;
    }
  }

}
