export function formatPrice(value) {
  const num = parseFloat(value);
  const hasCents = num % 1 !== 0;
  return num.toLocaleString('ru-RU', {
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2
  }) + ' ₽';
}
