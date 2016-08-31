// jshint esversion:6

// Normally you would get these from a server
let products = [
  { sku: 'BarrelChair', image: 'BarrelChair.jpg', title: 'Barrel Chair',
    description: 'PUT TEXT HERE', price: 100.00, },
  { sku: 'C10', image: 'C10.jpg', title: 'C10 Chair',
    description: 'PUT TEXT HERE', price: 100.00, },
  { sku: 'Cl2', image: 'Cl2.jpg', title: 'CL2 Chair',
    description: 'PUT TEXT HERE', price: 100.00, },
  { sku: 'CP03_blue', image: 'CP03_blue.jpg', title: 'CP03 Chair',
    description: 'PUT TEXT HERE', price: 100.00, },
  { sku: 'CPC_RECYCLED', image: 'CPC_RECYCLED.jpg', title: 'CPC Upcycled',
    description: 'PUT TEXT HERE', price: 100.00, },
  { sku: 'CPFS', image: 'CPFS.jpg', title: 'CPFS',
    description: 'PUT TEXT HERE', price: 100.00, },
  { sku: 'CPO2_red', image: 'CPO2_red.jpg', title: 'CPO2',
    description: 'PUT TEXT HERE', price: 100.00, },
  { sku: 'CPT', image: 'CPT.jpg', title: 'CPT Table',
    description: 'PUT TEXT HERE', price: 100.00, },
  { sku: 'CS1', image: 'CS1.jpg', title: 'CS1 Sofa',
    description: 'PUT TEXT HERE', price: 100.00, },
];

export function find(sku) {
  return products.find(product => product.sku === sku);
}

export default products;
