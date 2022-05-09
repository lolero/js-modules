import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { MuiFaIcon } from '@js-modules/web-react-components';
import { faBiking } from '@fortawesome/free-solid-svg-icons/faBiking';

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
      <MuiFaIcon icon={faBiking} />
      <Typography variant="h3" color="inherit">
        Segway Rental
      </Typography>
    </Box>
  );
};

export const MainLogoBoxRaw = MainLogoBox;
export const MainLogoBoxMemo = React.memo(MainLogoBoxRaw);
export default MainLogoBoxMemo;
