import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type React from 'react';

// Shim for the unpublished `@mui/internal-core-docs/SectionHeadline` consumed by
// the verbatim MUI docs examples in web-react-docs-mui.
export type SectionHeadlineProps = {
  overline: string;
  title: React.ReactNode;
  description?: React.ReactNode;
};

export default function SectionHeadline({
  overline,
  title,
  description,
}: SectionHeadlineProps): React.ReactNode {
  return (
    <Box>
      <Typography
        component="span"
        variant="body2"
        color="primary"
        sx={{
          display: 'block',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '0.1rem',
        }}
      >
        {overline}
      </Typography>
      {title}
      {description &&
        (typeof description === 'string' ? (
          <Typography color="text.secondary">{description}</Typography>
        ) : (
          description
        ))}
    </Box>
  );
}
