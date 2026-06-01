import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type React from 'react';

// Shim for the unpublished `@mui/internal-core-docs/ApiPage` consumed by the
// verbatim MUI docs examples in web-react-docs-mui.
export type ApiDisplayLayout = 'collapsed' | 'expanded' | 'table';

export type LayoutStorageKeys = {
  props: string;
};

export type PropertyDefinition = {
  propName: string;
  hash: string;
  description?: string;
  isOptional?: boolean;
  isRequired?: boolean;
  typeName?: string;
  propDefault?: string;
  [key: string]: unknown;
};

export const DEFAULT_API_LAYOUT_STORAGE_KEYS: LayoutStorageKeys = {
  props: 'apiPage_props',
};

export type PropertiesSectionProps = {
  properties: PropertyDefinition[];
  title?: string;
  titleHash?: string;
  defaultLayout?: ApiDisplayLayout;
  layoutStorageKey?: string;
};

export function PropertiesSection({
  properties,
  titleHash,
}: PropertiesSectionProps): React.ReactNode {
  return (
    <Box component="section">
      {titleHash && (
        <Typography id={titleHash} variant="h2">
          Properties
        </Typography>
      )}
      {properties.map((property) => (
        <Box key={property.propName} sx={{ my: 1 }}>
          <Typography component="code" sx={{ fontWeight: 'bold' }}>
            {property.propName}
          </Typography>
          {property.typeName && (
            <Typography component="span" color="text.secondary">
              {`: ${property.typeName}`}
            </Typography>
          )}
          {property.description && (
            <Typography variant="body2" color="text.secondary">
              {property.description}
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  );
}
