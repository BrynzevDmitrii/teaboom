import { formatPrice } from './price-format.js';
import { loadCart, saveCart } from './cart-storage.js';

export function initProductCart() {
  const packagingInputs = document.querySelectorAll('input[name="packaging"]');
  const priceEl = document.getElementById('price');
  const oldPriceEl = document.getElementById('oldPrice');
  const skuEl = document.getElementById('sku');
  const addBtn = document.getElementById('addBtn');
  const stepper = document.getElementById('stepper');
  const qtyEl = document.getElementById('qty');
  const stepMinus = document.getElementById('stepMinus');
  const stepPlus = document.getElementById('stepPlus');

  const productId = document.querySelector('.product').dataset.productId;
  const cart = loadCart();
  const cartQuantities = cart[productId] || {};
  packagingInputs.forEach((input) => {
    if (!(input.value in cartQuantities)) cartQuantities[input.value] = 0;
  });
  cart[productId] = cartQuantities;

  function getSelectedPackaging() {
    return document.querySelector('input[name="packaging"]:checked');
  }

  function renderCart() {
    const qty = cartQuantities[getSelectedPackaging().value];
    const inCart = qty > 0;
    addBtn.hidden = inCart;
    stepper.hidden = !inCart;
    qtyEl.textContent = qty;
  }

  function renderPrice(input) {
    priceEl.textContent = formatPrice(input.dataset.price);
    priceEl.setAttribute('content', input.dataset.price);
    skuEl.textContent = input.dataset.sku;

    if (input.dataset.oldPrice) {
      oldPriceEl.textContent = formatPrice(input.dataset.oldPrice);
      oldPriceEl.hidden = false;
    } else {
      oldPriceEl.hidden = true;
    }
  }

  packagingInputs.forEach((input) => {
    input.addEventListener('change', () => {
      renderPrice(input);
      renderCart();
    });
  });

  addBtn.addEventListener('click', () => {
    cartQuantities[getSelectedPackaging().value] = 1;
    saveCart(cart);
    renderCart();
  });

  stepPlus.addEventListener('click', () => {
    cartQuantities[getSelectedPackaging().value] += 1;
    saveCart(cart);
    renderCart();
  });

  stepMinus.addEventListener('click', () => {
    cartQuantities[getSelectedPackaging().value] -= 1;
    saveCart(cart);
    renderCart();
  });

  renderCart();
}
