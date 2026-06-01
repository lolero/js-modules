// Shim for the unpublished `@mui/internal-core-docs/i18n` consumed by the
// verbatim MUI docs examples in web-react-docs-mui.

// The type of the `t` translate function. Consumers import it only in type
// positions, so esbuild strips it from the runtime import.
export type Translate = (
  key: string,
  options?: Record<string, unknown>,
) => string;

export function useTranslate(): Translate {
  // No translation catalog in the showcase — echo the key back.
  return (key) => key;
}

export function useUserLanguage(): string {
  return 'en';
}
