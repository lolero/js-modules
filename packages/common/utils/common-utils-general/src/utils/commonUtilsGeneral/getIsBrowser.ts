/**
 * Check if the app is running in a web browser
 *
 * @returns {boolean} Whether or not the app is running in a web browser
 */
function getIsBrowser(): boolean {
  return typeof window !== 'undefined';
}

export default getIsBrowser;
