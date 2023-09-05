export function base64EncodeBuffer(buffer: Buffer): string {
  const encodedBuffer = buffer.toString('base64');
  return encodedBuffer;
}
