import type { IconDefinition } from '@fortawesome/fontawesome-common-types';
import Typography from '@mui/material/Typography';
import type React from 'react';
import type { RouteMetadata } from '@js-modules/common-react-nav';

export type WorkspaceTitleProps = {
  routeMetadata: RouteMetadata<IconDefinition>;
};

/**
 * Workspace title, rendered into the persistent chrome's `title` slot via
 * <Workspace />. It shows a route's label normalized to sentence case.
 * Workspace consumers who want a different title, render their own node into
 * the slot instead.
 * @param props - Component props.
 * @param props.routeMetadata - RouteMetadata.
 * @returns The styled workspace title.
 */
export function WorkspaceTitle({
  routeMetadata,
}: WorkspaceTitleProps): React.ReactNode {
  return (
    <Typography
      sx={{
        fontWeight: 'bold',
      }}
      variant="h5"
    >
      {routeMetadata.label}
    </Typography>
  );
}
