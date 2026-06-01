import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons/faArrowUpRightFromSquare';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import type React from 'react';
import { MuiFaIcon } from '@js-modules/web-react-utils';

export type SubModuleBoxExample = {
  name: string;
  url: string;
  example: React.ReactNode;
};

export type SubModuleBoxProps = {
  examples: SubModuleBoxExample[];
};

export function DocsMuiSubModuleBox({
  examples,
}: SubModuleBoxProps): React.ReactNode {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, p: 3 }}>
      {examples.map((example) => (
        <Box
          key={example.name}
          sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6">{example.name}</Typography>
            <Link href={example.url} target="_blank" rel="noopener">
              <MuiFaIcon icon={faArrowUpRightFromSquare} fontSize="small" />
            </Link>
          </Box>
          <Paper variant="outlined" sx={{ p: 3 }}>
            {example.example}
          </Paper>
        </Box>
      ))}
    </Box>
  );
}
