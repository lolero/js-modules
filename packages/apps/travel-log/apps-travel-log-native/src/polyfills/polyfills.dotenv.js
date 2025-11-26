// React Native polyfill for dotenv
// In React Native, environment variables are typically handled at build time
// via Babel or Metro configuration, not loaded from .env files at runtime

export function config() {
  // No-op function for React Native
  // Environment variables should be configured through react-native-dotenv or similar
  console.warn(
    'dotenv.config() called in React Native environment - this is a no-op. Use react-native-dotenv or configure env vars at build time.',
  );
  return { parsed: {} };
}

export default { config };
