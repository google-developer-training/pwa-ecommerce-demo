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
import Product from 'product';

//   constructor (sku, title, price, image, description='') {

// Normally you would get these from a server
export const products = [
  new Product('BarrelChair', 'Barrel Chair', 100.00, 'BarrelChair.jpg',
    'A beautiful chair made of upcycled barrel staves'),
  new Product('C10', 'C10 Chair', 100.00, 'C10.jpg',
    'A colorful chair with modern style and flair'),
  new Product('Cl2', 'CL2 Chair', 100.00, 'Cl2.jpg',
    'A comfortable extended chair made for lounging'),
  new Product('CP03_blue', 'CP03 Chair', 100.00, 'CP03_blue.jpg',
    'A wide cushion you can stack or move around the floor'),
  new Product('CPC_RECYCLED', 'CPC Upcycled', 100.00, 'CPC_RECYCLED.jpg',
    'A simple chair with a seat of recycled plastic'),
  new Product('CPFS', 'CPFS', 100.00, 'CPFS.jpg',
    'A footstool mader to complement the CPFS chair'),
  new Product('CPO2_red', 'CPO2', 100.00, 'CPO2_red.jpg',
    'A narrow cushion, smaller than CP03, and quite comfortable'),
  new Product('CPT', 'CPT Table', 100.00, 'CPT.jpg',
    'A perfect table for outdoors, has a hole for an umbrella'),
  new Product('CS1', 'CS1 Sofa', 100.00, 'CS1.jpg',
    'A soft, stylish, and colorful sofa. Perfect for your home')
];

export function findProduct(sku, searchRange = products) {
  return searchRange.find(product => product.sku === sku);
}
