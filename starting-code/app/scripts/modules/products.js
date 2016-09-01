// jshint esversion:6
import Product from 'modules/product';

//   constructor (sku, title, price, image, description='') {

// Normally you would get these from a server
let products = [
  new Product('BarrelChair', 'Barrel Chair', 100.00, 'BarrelChair.jpg', 
    'A lovely chair made from upcycled barrel staves.'),
  new Product('C10', 'C10 Chair', 100.00, 'C10.jpg',
    'PUT TEXT HERE'),
  new Product('Cl2', 'CL2 Chair', 100.00, 'Cl2.jpg',
    'PUT TEXT HERE'),
  new Product('CP03_blue', 'CP03 Chair', 100.00, 'CP03_blue.jpg',
    'PUT TEXT HERE'),
  new Product('CPC_RECYCLED', 'CPC Upcycled', 100.00, 'CPC_RECYCLED.jpg',
    'PUT TEXT HERE'),
  new Product('CPFS', 'CPFS', 100.00, 'CPFS.jpg',
    'PUT TEXT HERE'),
  new Product('CPO2_red', 'CPO2', 100.00, 'CPO2_red.jpg',
    'PUT TEXT HERE'),
  new Product('CPT', 'CPT Table', 100.00, 'CPT.jpg',
    'PUT TEXT HERE'),
  new Product('CS1', 'CS1 Sofa', 100.00, 'CS1.jpg',
    'PUT TEXT HERE'),
];

export function findProduct(sku) {
  return products.find(product => product.sku === sku);
}

export default products;
