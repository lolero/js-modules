import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { MuiFaIcon } from '@js-modules/web-react-components';
import { faEthereum } from '@fortawesome/free-brands-svg-icons/faEthereum';

const MainLogoBox: React.FunctionComponent = () => {
  return (
    <Box
      sx={{
        textDecoration: 'none',
        color: 'background.default',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      component={Link}
      to="/"
    >
      <MuiFaIcon
        sx={{
          mr: '.2em',
        }}
        icon={faEthereum}
      />
      <Typography variant="h4" color="inherit">
        dApp
      </Typography>
    </Box>
  );
};

export const MainLogoBoxRaw = MainLogoBox;
export const MainLogoBoxMemo = React.memo(MainLogoBoxRaw);
export default MainLogoBoxMemo;
