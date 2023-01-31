import React, { useCallback } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { faHashtag } from '@fortawesome/free-solid-svg-icons/faHashtag';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import { useMenuUtils } from '@js-modules/web-react-hooks';
import IconButton from '@mui/material/IconButton';
import MuiLink from '@mui/material/Link';
import { useNavDisplayMetadata } from '@js-modules/web-react-nav';
import { MuiFaIcon } from '@js-modules/web-react-components';
import entries from 'lodash/entries';
import upperFirst from 'lodash/upperFirst';
import { socialMediaMetadata } from './DappNavSocialMediaBox';

export const DappNavSocialMediaMenu: React.FunctionComponent = () => {
  const { closeNavLeftDrawerCallback } = useNavDisplayMetadata();

  const { menuAnchor, openMenuCallback, closeMenuCallback } = useMenuUtils();

  const onSocialMediaLinkClickCallback = useCallback(() => {
    closeMenuCallback();
    closeNavLeftDrawerCallback();
  }, [closeMenuCallback, closeNavLeftDrawerCallback]);

  return (
    <>
      <Tooltip title="Social media links">
        <IconButton size="small" onClick={openMenuCallback}>
          <MuiFaIcon icon={faHashtag} />
        </IconButton>
      </Tooltip>
      <Menu
        open={!!menuAnchor}
        anchorEl={menuAnchor}
        onClose={closeMenuCallback}
      >
        {entries(socialMediaMetadata).map(
          ([socialMediaMetadataKey, socialMediaMetadataValue]) => {
            return (
              <MenuItem
                key={socialMediaMetadataKey}
                component={MuiLink}
                href={socialMediaMetadataValue.url}
                target="_blank"
                onClick={onSocialMediaLinkClickCallback}
              >
                <ListItemIcon>
                  <MuiFaIcon
                    icon={socialMediaMetadataValue.icon}
                    fontSize="small"
                  />
                </ListItemIcon>
                <ListItemText>
                  {upperFirst(socialMediaMetadataKey)}
                </ListItemText>
              </MenuItem>
            );
          },
        )}
      </Menu>
    </>
  );
};
