import { base64EncodeString } from './base64EncodeString';

export function base64EncodeObject(obj: object): string {
  const encodedObject = base64EncodeString(JSON.stringify(obj, null, 2));
  return encodedObject;
}
