import React from 'react';
import Box from '@mui/material/Box';
import { MuiFaIcon } from '@js-modules/web-react-components';
import Tooltip from '@mui/material/Tooltip';
import MuiLink from '@mui/material/Link';
import { faDiscord } from '@fortawesome/free-brands-svg-icons/faDiscord';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import IconButton from '@mui/material/IconButton';
import { useCloseNavSideDrawerCallback } from '@js-modules/web-react-nav';

export enum MainNavSideFooterBoxDataTestIds {
  discordTooltipTrigger = 'nav-side-footer-discord-tooltip-trigger',
  twitterTooltipTrigger = 'nav-side-footer-twitter-tooltip-trigger',
  mediumTooltipTrigger = 'nav-side-footer-medium-tooltip-trigger',
  githubTooltipTrigger = 'nav-side-footer-github-tooltip-trigger',
  instagramTooltipTrigger = 'nav-side-footer-instagram-tooltip-trigger',
  facebookTooltipTrigger = 'nav-side-footer-facebook-tooltip-trigger',
}

const MainNavSideFooterBox: React.FunctionComponent = () => {
  const closeNavSideDrawerCallback = useCloseNavSideDrawerCallback();

  return (
    <Box>
      <Tooltip
        title="discord"
        data-testid={MainNavSideFooterBoxDataTestIds.discordTooltipTrigger}
      >
        <IconButton
          component={MuiLink}
          href="https://discord.com"
          target="_blank"
          size="small"
          onClick={closeNavSideDrawerCallback}
        >
          <MuiFaIcon icon={faDiscord} />
        </IconButton>
      </Tooltip>
      <Tooltip
        title="twitter"
        data-testid={MainNavSideFooterBoxDataTestIds.twitterTooltipTrigger}
      >
        <IconButton
          component={MuiLink}
          href="https://twitter.com"
          target="_blank"
          size="small"
          onClick={closeNavSideDrawerCallback}
        >
          <MuiFaIcon icon={faTwitter} />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default MainNavSideFooterBox;
