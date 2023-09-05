import { base64EncodeBuffer } from './base64EncodeBuffer';

export function base64EncodeString(str: string): string {
  const encodedString = base64EncodeBuffer(Buffer.from(str));
  return encodedString;
}
