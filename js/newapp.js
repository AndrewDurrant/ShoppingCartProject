import { Products } from './products.js';
import { UI } from './UI.js';
import { Storage } from './storage.js';





document.addEventListener('DOMContentLoaded', () => {
  const ui = new UI();
  const products = new Products();

  // setup app
  ui.setupAPP();

  // get all products
  products.getProducts()
    .then(products => {
      ui.displayProducts(products);
      Storage.saveProducts(products);
    })
    .then(() => {
      ui.getBagButtons();
      ui.cartLogic();
    });
});