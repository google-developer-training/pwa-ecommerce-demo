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
// jshint esversion: 6
import IDBStorage from 'idb-storage';
import {LineItem} from 'cart';
import {products} from 'products';
import assert from 'assert';

describe('IndexedDB storage', () => {

  const key = 'ls-test';
  // TODO clear before each test

  it('should have a database', done => {
    const storage = new IDBStorage(key).storage;
    storage.then(db => {
      assert.ok(db, 'exists');
      done();
    });
  });

  function _makeItemList() {
    const shop = products.slice(0, 3);
    return shop.map((item, index) => {
      let li = new LineItem(item, index + 1);
      return li.savedValue;
    });
  }
});
