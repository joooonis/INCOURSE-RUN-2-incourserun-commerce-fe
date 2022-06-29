export default function priceToString(price) {
  if (!price) return;
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
