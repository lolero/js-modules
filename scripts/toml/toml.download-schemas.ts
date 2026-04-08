import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import { join } from 'path';

export const SchemaType = {
  pyproject: 'pyproject',
  ruff: 'ruff',
} as const;
export type SchemaType = (typeof SchemaType)[keyof typeof SchemaType];

type Replacement = { searchRegex: RegExp; replaceStr: string };

type SchemaMetadata = {
  url: string;
  replacements: Replacement[];
};

const schemaMetadata: Record<SchemaType, SchemaMetadata> = {
  [SchemaType.pyproject]: {
    url: 'https://raw.githubusercontent.com/SchemaStore/schemastore/master/src/schemas/json/pyproject.json',
    replacements: [
      {
        // schemastore CDN (json.schemastore.org) is unreliable — remap $refs to GitHub raw
        searchRegex: /https:\/\/json\.schemastore\.org\//g,
        replaceStr:
          'https://raw.githubusercontent.com/SchemaStore/schemastore/master/src/schemas/json/',
      },
    ],
  },
  [SchemaType.ruff]: {
    url: 'https://raw.githubusercontent.com/astral-sh/ruff/main/ruff.schema.json',
    replacements: [],
  },
};

/**
 * Fetches a URL via curl and applies regex replacements to the response body.
 * @param url - URL to fetch.
 * @param replacements - Regex substitutions to apply to the raw response text.
 * @returns Transformed response body.
 */
function fetchRef(url: string, replacements: Replacement[]): string {
  let ref = execSync(`curl -fsSL "${url}"`, { encoding: 'utf8' });
  for (const { searchRegex, replaceStr } of replacements) {
    ref = ref.replace(searchRegex, replaceStr);
  }
  return ref;
}

/**
 * Recursively resolves and inlines external `$ref` URLs in a JSON schema node.
 * @param schemaNode - JSON schema node.
 * @param baseUrl - Base URL used to resolve relative `$ref` values.
 * @param resolving - Set of URLs being resolved, used to break cycles.
 * @param replacements - Regex substitutions applied when fetching each ref.
 * @returns Schema node with all external `$ref`s replaced with inlined content.
 */
function inlineRefs(
  schemaNode: unknown,
  baseUrl: string,
  resolving: Set<string>,
  replacements: Replacement[],
): unknown {
  if (typeof schemaNode !== 'object' || schemaNode === null) {
    return schemaNode;
  }
  if (Array.isArray(schemaNode)) {
    return schemaNode.map((item) =>
      inlineRefs(item, baseUrl, resolving, replacements),
    );
  }

  const schemaNodeObject = schemaNode as Record<string, unknown>;

  if (typeof schemaNodeObject['$ref'] === 'string') {
    const rawRef = schemaNodeObject['$ref'];
    if (rawRef.startsWith('#')) {
      return schemaNodeObject;
    }
    // Resolve relative refs (e.g. "uv.json") against the URL of the schema
    // that contains them so they can be fetched and inlined.
    const url = /^https?:\/\//.test(rawRef)
      ? rawRef
      : new URL(rawRef, baseUrl).href;
    if (resolving.has(url)) {
      return schemaNodeObject;
    }
    resolving.add(url);
    const inlinedRef = inlineRefs(
      JSON.parse(fetchRef(url, replacements)),
      url,
      resolving,
      replacements,
    );
    resolving.delete(url);
    return inlinedRef;
  }

  return Object.fromEntries(
    Object.entries(schemaNodeObject).map(([k, v]) => [
      k,
      inlineRefs(v, baseUrl, resolving, replacements),
    ]),
  );
}

for (const schemaType of Object.keys(schemaMetadata) as SchemaType[]) {
  const { url, replacements } = schemaMetadata[schemaType];
  const content = inlineRefs(
    JSON.parse(fetchRef(url, replacements)),
    url,
    new Set([url]),
    replacements,
  );
  const file = `toml.schema-${schemaType}.json`;
  const outputPath = join(__dirname, file);
  writeFileSync(outputPath, JSON.stringify(content, null, 2));
  console.log(`${url} → ${file}`);
}
