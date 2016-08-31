
import products from 'modules/products';

export default class Cart {
  constructor () {
    this.purchases = [];
  }

  get length() {
    return this.purchases.length;
  }

  get total() {
    return 0;
  }
}
