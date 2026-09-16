const packagingInputs = document.querySelectorAll('input[name="packaging"]');
const priceEl = document.getElementById('price');
const oldPriceEl = document.getElementById('oldPrice');
const skuEl = document.getElementById('sku');
const cartBtn = document.getElementById('cartBtn');
const cartBtnText = document.getElementById('cartBtnText');

function formatPrice(value) {
  const num = parseFloat(value);
  const hasCents = num % 1 !== 0;
  return num.toLocaleString('ru-RU', {
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2
  }) + ' ₽';
}

function updateProduct(input) {
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
  input.addEventListener('change', () => updateProduct(input));
});

let cartResetTimer = null;

cartBtn.addEventListener('click', () => {
  cartBtnText.textContent = 'Добавлено ✓';
  cartBtn.classList.add('is-added');
  clearTimeout(cartResetTimer);
  cartResetTimer = setTimeout(() => {
    cartBtnText.textContent = 'В корзину';
    cartBtn.classList.remove('is-added');
  }, 1500);
});
