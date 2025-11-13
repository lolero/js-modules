export function getEnvFileName(): string {
  switch (process.env.NODE_ENV) {
    case 'production':
      return '.env.prod';
    default:
      return '.env.dev';
  }
}
