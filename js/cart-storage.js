const CART_STORAGE_KEY = 'teaboom_cart';

export function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

export function saveCart(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch {
    // localStorage недоступен (приватный режим, квота и т.п.) — корзина просто не сохранится между визитами
  }
}
