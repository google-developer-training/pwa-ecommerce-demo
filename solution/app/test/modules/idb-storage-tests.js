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

import IDBStorage from 'idb-storage';
import {LineItem} from 'cart';
import {products} from 'products';
import * as idb from 'idb';
import assert from 'assert';

describe('IndexedDB storage', () => {
  const DB_NAME = 'ls-test';
  let adaptor;

  before(() => {
    // in case there's a database left around
    return idb.delete(DB_NAME);
  });

  beforeEach(() => {
    adaptor = new IDBStorage(DB_NAME);
  });

  afterEach(() => {
    return adaptor._close().then(() => {
      adaptor = null;
      return idb.delete(DB_NAME);
    });
  });

  it('has a database', () => {
    return adaptor.storage.then(db => {
      assert.ok(db);
    });
  });

  it('begins with an empty database', () => {
    return adaptor.count().then(ct => {
      assert.equal(ct, 0);
    });
  });

  it('should write to storage on save', () => {
    const items = _makeItemList();
    return adaptor.save(items).then(() => {
      return adaptor.count().then(ct => {
        assert.equal(ct, items.length);
      });
    });
  });

  it('should load the saved items, in order', () => {
    const items = _makeItemList();
    return adaptor.save(items).then(() => {
      const reader = new IDBStorage(DB_NAME);
      return reader.load().then(probe => {
        reader._close();
        assert.deepEqual(probe, items);
      });
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
