import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faDiscord } from '@fortawesome/free-brands-svg-icons/faDiscord';
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram';
import { faMedium } from '@fortawesome/free-brands-svg-icons/faMedium';
import { faTelegram } from '@fortawesome/free-brands-svg-icons/faTelegram';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MuiLink from '@mui/material/Link';
import entries from 'lodash/entries';
import type React from 'react';
import { useNavDisplayMetadata } from '@js-modules/web-react-nav';
import { MuiFaIcon } from '@js-modules/web-react-utils';

export const socialMediaMetadata: Record<
  string,
  {
    url: string;
    icon: IconDefinition;
  }
> = {
  github: {
    url: 'https://github.com',
    icon: faGithub,
  },
  medium: {
    url: 'https://medium.com',
    icon: faMedium,
  },
  twitter: {
    url: 'https://twitter.com',
    icon: faTwitter,
  },
  facebook: {
    url: 'https://facebook.com',
    icon: faFacebook,
  },
  instagram: {
    url: 'https://instagram.com',
    icon: faInstagram,
  },
  discord: {
    url: 'https://discord.com',
    icon: faDiscord,
  },
  telegram: {
    url: 'https://web.telegram.org',
    icon: faTelegram,
  },
};

export const DappNavSocialMediaBox: React.FunctionComponent = () => {
  const { closeNavLeftDrawerCallback } = useNavDisplayMetadata();

  return (
    <Box>
      {entries(socialMediaMetadata).map(
        ([socialMediaMetadataKey, socialMediaMetadataValue]) => {
          return (
            <IconButton
              key={socialMediaMetadataKey}
              component={MuiLink}
              href={socialMediaMetadataValue.url}
              target="_blank"
              size="small"
              onClick={closeNavLeftDrawerCallback}
            >
              <MuiFaIcon icon={socialMediaMetadataValue.icon} />
            </IconButton>
          );
        },
      )}
    </Box>
  );
};
