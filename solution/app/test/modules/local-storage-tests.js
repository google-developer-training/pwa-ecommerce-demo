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
import LocalStorage from 'local-storage';
import {LineItem} from 'cart';
import {products} from 'products';
import assert from 'assert';

describe('Local Storage', () => {
  const key = 'ls-test';

  beforeEach(() => {
    window.localStorage.removeItem(key);
  });

  it('should write to local storage on save', () => {
    const items = _makeItemList();
    const storage = new LocalStorage(key);
    storage.save(items).then(() => {
      assert.ok(window.localStorage.getItem(key), 'saved');
    });
  });

  it('should read saved values', () => {
    const items = _makeItemList();
    const writer = new LocalStorage(key);
    writer.save(items).then(() => {
      // Now read into a new instance and compare
      const reader = new LocalStorage(key);
      reader.load().then(readItems => {
        assert.deepEqual(readItems, items, 'recovered');
      });
    });
  });

  it('should clear storage when saving empty item list', () => {
    const items = _makeItemList();
    const writer = new LocalStorage(key);
    return writer.save(items).then(() => {
      writer.save([]).then(() => {
        // Now read into a new instance and compare
        const reader = new LocalStorage(key);
        reader.load().then(readItems => {
          assert.equal(readItems.length, 0, 'cleared');
        });
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
