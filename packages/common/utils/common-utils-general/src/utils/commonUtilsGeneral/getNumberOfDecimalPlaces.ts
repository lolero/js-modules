/**
 * Get the number of decimal significant digits of a numerical value
 *
 * @param {number} number - The number whose decimal significant digits are being
 *        counted
 *
 * @returns {number} The number of decimal significant digits
 */
function getNumberOfDecimalPlaces(number: number): number {
  const decimals = number.toString().split('.')[1] || '';

  return decimals.length;
}

export default getNumberOfDecimalPlaces;
