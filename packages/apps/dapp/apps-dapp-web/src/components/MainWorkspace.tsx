import React from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import { useChildNodeSize } from '@js-modules/web-utils-hooks';
import MainNavBar from './MainNavBar';

type Props = {
  children: {
    content: BoxProps['children'];
  };
};

const MainWorkspace: React.FunctionComponent<Props> = ({
  children: { content },
}) => {
  const { nodeRef, nodeHeight } = useChildNodeSize<HTMLDivElement>();

  return (
    <>
      <MainNavBar ref={nodeRef} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
          px: '1em',
          mt: `${nodeHeight}`,
          height: `calc(100% - ${nodeHeight})`,
        }}
      >
        {content}
      </Box>
    </>
  );
};

export default MainWorkspace;
