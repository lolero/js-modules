import { base64EncodeBuffer } from './base64EncodeBuffer';
import { base64EncodeString } from './base64EncodeString';
import { base64EncodeObject } from './base64EncodeObject';

/**
 *  Encodes the supplied buffer, string, or object into a base64 string.
 *
 *  @param {Buffer | string | object} data — The data to encode
 *
 *  @returns {string} A base64 encoded string
 */
export function base64Encode(data: Buffer | string | object): string {
  let encodedData: string;
  if (Buffer.isBuffer(data)) {
    encodedData = base64EncodeBuffer(data);
    return encodedData;
  }

  if (typeof data === 'string') {
    encodedData = base64EncodeString(data);
    return encodedData;
  }

  encodedData = base64EncodeObject(data);
  return encodedData;
}
