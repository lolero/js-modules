/**
 * Stop execution of async function for a given amount of milliseconds
 *
 * @param {number} milliseconds - Amount of milliseconds to freeze execution
 */
export async function sleep(milliseconds: number): Promise<void> {
  await new Promise<void>((resolve) => {
    setTimeout(() => resolve(), milliseconds);
  });
}

/**
 * Get the number of decimal significant digits of a numerical value
 *
 * @param {number} number - The number whose decimal significant digits are being
 *        counted
 *
 * @returns {number} The number of decimal significant digits
 */
export function getNumberOfDecimalPlaces(number: number): number {
  const decimals = number.toString().split('.')[1] || '';

  return decimals.length;
}

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

/**
 * Check if the app is running in a web browser
 *
 * @returns {boolean} Whether or not the app is running in a web browser
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}
