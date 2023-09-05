export function formatCurrencyQuantity(quantity: number): string {
  const orderOfMagnitude = Math.floor(Math.log10(quantity));
  const numberFormatter = new Intl.NumberFormat('en-US', {
    maximumSignificantDigits:
      orderOfMagnitude > 0
        ? Math.max(orderOfMagnitude, 8)
        : 8 + orderOfMagnitude,
  });
  return numberFormatter.format(quantity);
}
