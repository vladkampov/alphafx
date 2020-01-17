export default amount =>
  new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'GBP',
  }).format(amount);
