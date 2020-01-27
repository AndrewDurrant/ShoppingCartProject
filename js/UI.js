import * as elements from './domElements.js';
import {Storage} from './storage.js';

// cart 
let cart = [];
// buttons
let buttonsDOM = [];

// display products
export class UI {
  
  displayProducts(products) {
    let result = '';
    products.forEach(product => {
      result += `
        <article class="product">
          <div class="img-container">
            <img src=${product.image} alt="product" class="product-img">
            <button class="bag-btn" data-id=${product.id}>
              <i class="fas fa-shopping-cart"></i>
              add to cart
            </button>
          </div>
          <h3>${product.title}</h3>
          <h4>$${product.price}</h4>
        </article>
      `;
    });
    elements.productsDOM.innerHTML = result;
  };

  getBagButtons() {
    const buttons = [...document.querySelectorAll('.bag-btn')];
    buttonsDOM = buttons;
    buttons.forEach(button => {
      let id = button.dataset.id;
      let inCart = cart.find(item => item.id === id);
      if (inCart) {
        button.innerText = "In Cart";
        button.disable = true;
      }
      button.addEventListener('click', (event) => {
        event.target.innerText = "In Cart";
        event.target.disabled = true;
        // get product from products
        let cartItem = {
          ...Storage.getProduct(id),
          amount: 1
        };
        // add product to the cart
        cart = [...cart, cartItem];
        // save cart in local storage
        Storage.saveCart(cart);
        // set cart values
        this.setCartValues(cart);
        // display cart item
        this.addCartItem(cartItem);
        // show the cart
        this.showCart();
      })

    })
  };

  setCartValues(cart) {
    let tempTotal = 0;
    let itemsTotal = 0;
    cart.map(item => {
      tempTotal += item.price * item.amount;
      itemsTotal += item.amount;
    })
    elements.cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
    elements.cartItems.innerText = itemsTotal;
  }

  addCartItem(item) {
    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `
      <img src= ${item.image} alt="product">
      <div>
        <h4>${item.title}</h4>
        <h5>$${item.price}</h5>
        <span class="remove-item" data-id=${item.id}>remove</span>
      </div>
      <div>
        <i class="fas fa-chevron-up" data-id=${item.id}></i>
        <p class="item-amount">${item.amount}</p>
        <i class="fas fa-chevron-down" data-id=${item.id}></i>
      </div>`;
    elements.cartContent.appendChild(div);
  }

  showCart() {
    elements.cartOverlay.classList.add('transparentBcg');
    elements.cartDOM.classList.add('showCart');
  }

  setupAPP() {
    cart = Storage.getCart();
    this.setCartValues(cart);
    this.populateCart(cart);
    elements.cartBtn.addEventListener('click', this.showCart);
    elements.closeCartBtn.addEventListener('click', this.hideCart);
  }

  populateCart(cart) {
    cart.forEach(item => this.addCartItem(item));
  }

  hideCart() {
    elements.cartOverlay.classList.remove('transparentBcg');
    elements.cartDOM.classList.remove('showCart');
  }

  cartLogic() {
    elements.clearCartBtn.addEventListener('click', this.clearCart);
  }

  clearCart() {
    console.log(this);

  }
}