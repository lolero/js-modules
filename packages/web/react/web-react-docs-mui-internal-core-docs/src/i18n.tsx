// Shim for the unpublished `@mui/internal-core-docs/i18n` consumed by the
// verbatim MUI docs examples in web-react-docs-mui.

// The type of the `t` translate function. Consumers import it only in type
// positions, so esbuild strips it from the runtime import.
export type Translate = (
  key: string,
  options?: Record<string, unknown>,
) => string;

// WHY: react-compiler-hookless-hook
// Hoisted for a stable identity — `useTranslate` is never compiled, so an
// inline arrow would be a new reference every render.
const translate: Translate = (key) => key;

/**
 * Translate function for the showcase — there is no translation catalog, so it
 * echoes the key back.
 * @returns The translate function.
 */
export function useTranslate(): Translate {
  return translate;
}

export function useUserLanguage(): string {
  return 'en';
}
