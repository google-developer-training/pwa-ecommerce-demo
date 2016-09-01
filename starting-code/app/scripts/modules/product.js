
//jshint esversion: 6

export default class Product {

  constructor (sku, title, price, image, description='') {
    this._sku = sku;
    this._title = title;
    this._price = price;
    this._image = image;
    this._description = description;
  }

  get sku() {
    return this._sku;
  }

  get title() {
    return this._title;
  }

  get price() {
    return this._price;
  }

  get image() {
    return this._image;
  }

  get description() {
    return this._description;
  }

}
