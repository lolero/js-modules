/**
 * Check if the app is running in a web browser
 *
 * @returns {boolean} Whether or not the app is running in a web browser
 */
export function getIsBrowser(): boolean {
  return typeof window !== 'undefined';
}
