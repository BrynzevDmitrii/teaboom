const productImage = document.getElementById('productImage');

productImage.addEventListener('error', () => {
  productImage.src = productImage.dataset.fallback;
  productImage.classList.add('product__image--fallback');
}, { once: true });

const packagingInputs = document.querySelectorAll('input[name="packaging"]');
const priceEl = document.getElementById('price');
const oldPriceEl = document.getElementById('oldPrice');
const skuEl = document.getElementById('sku');
const addBtn = document.getElementById('addBtn');
const stepper = document.getElementById('stepper');
const qtyEl = document.getElementById('qty');
const stepMinus = document.getElementById('stepMinus');
const stepPlus = document.getElementById('stepPlus');

const cartQuantities = {};
packagingInputs.forEach((input) => {
  cartQuantities[input.value] = 0;
});

function formatPrice(value) {
  const num = parseFloat(value);
  const hasCents = num % 1 !== 0;
  return num.toLocaleString('ru-RU', {
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2
  }) + ' ₽';
}

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
  renderCart();
});

stepPlus.addEventListener('click', () => {
  cartQuantities[getSelectedPackaging().value] += 1;
  renderCart();
});

stepMinus.addEventListener('click', () => {
  cartQuantities[getSelectedPackaging().value] -= 1;
  renderCart();
});
