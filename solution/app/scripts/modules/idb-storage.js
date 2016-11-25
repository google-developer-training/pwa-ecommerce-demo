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

import * as idb from 'idb';

const OBJECT_STORE = 'cart';
const SEQUENCE_FIELD = 'seq';

export default class IDBStorage {

  constructor(id = 'mfs-cart-items') {
    this._id = id;
  }

  /* Takes an array of items and writes JSON to local storage */
  save(items) {
    return this.storage.then(db => {
      const tx = db.transaction();
      const store = tx.objectStore(OBJECT_STORE);
      store.clear();
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        return store.put(
          {SEQUENCE_FIELD: (i), sku: (item.sku), qty: (item.qty)}
        );
      }
      return tx.complete;
    });
  }

  load() {
//    let json = localStorage[this._id];
//    if (!json) return [];
//    return JSON.parse(json);
    return [];
  }

  delete() {
//    localStorage.removeItem(this._id);
  }

  // testing hooks so we can test w/o wrecking the stored data
  set key(value) {
    this._id = value;
  }

  get key() {
    return this._id;
  }

  get storage() {
    return idb.open(this._id, 1, upgradeDB => {
      upgradeDB.createObjectStore(OBJECT_STORE);
    });
  }

}
