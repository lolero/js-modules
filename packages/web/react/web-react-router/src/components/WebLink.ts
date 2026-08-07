'use client';

import type React from 'react';
import { createElement } from 'react';
import { useWebRouter } from '../hooks/useWebRouter';
import type { WebRouterLinkProps } from '../types/webRouter.types';

/**
 * Framework-agnostic link. Renders the active router adapter's `LinkComponent`,
 * so app code links via one component regardless of react-router or next. Kept
 * JSX-free (via `createElement`) so the core entry stays importable by hook-only
 * consumers that don't enable `jsx`.
 * @param props - Component props.
 * @returns The adapter's link element.
 */
export function WebLink(props: WebRouterLinkProps): React.ReactNode {
  const { LinkComponent } = useWebRouter();

  return createElement(LinkComponent, props);
}
