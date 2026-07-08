'use client';

import type React from 'react';
import { createElement, forwardRef } from 'react';
import { useWebRouter } from '../hooks/useWebRouter';
import type { WebRouterLinkProps } from '../types/webRouter.types';

/**
 * Framework-agnostic link. Renders the active router adapter's `LinkComponent`,
 * so app code links via one component regardless of react-router or next. Kept
 * JSX-free (via `createElement`) so the core entry stays importable by hook-only
 * consumers that don't enable `jsx`.
 * @param props - Anchor props; `href` is the destination.
 * @param ref - Forwarded ref to the underlying anchor element.
 * @returns The adapter's link element.
 */
export const WebLink = forwardRef<HTMLAnchorElement, WebRouterLinkProps>(
  function WebLink(props, ref): React.ReactNode {
    const { LinkComponent } = useWebRouter();
    const LinkComponentWithRef =
      LinkComponent as React.ForwardRefExoticComponent<
        WebRouterLinkProps & React.RefAttributes<HTMLAnchorElement>
      >;

    return createElement(LinkComponentWithRef, { ...props, ref });
  },
);
