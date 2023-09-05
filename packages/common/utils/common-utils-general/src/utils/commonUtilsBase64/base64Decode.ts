/**
 *  Decodes a base64 encoded string into an object or a string
 *
 *  @param {string} str — The base64 encoded string to decode
 *
 *  @returns {object | string} The decoded object or string
 */
export function base64Decode(str: string): object | string {
  const decodedStr = Buffer.from(str, 'base64').toString();
  try {
    return JSON.parse(decodedStr);
  } catch {
    return decodedStr;
  }
}
