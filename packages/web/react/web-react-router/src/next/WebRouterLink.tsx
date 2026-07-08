'use client';

import Link from 'next/link';
import type React from 'react';
import { forwardRef } from 'react';
import type {
  WebRouterLinkComponent,
  WebRouterLinkProps,
} from '../types/webRouter.types';

/**
 * Framework-agnostic web router link backed by Next.js's <Link />. Next's
 * <Link /> already uses `href`, so this is a thin, ref-forwarding passthrough.
 * @param props - Component props.
 * @param props.href - Link destination.
 * @param ref - Forwarded ref to the underlying anchor element.
 * @returns A Next.js <Link /> anchor.
 */
export const WebRouterLink: WebRouterLinkComponent = forwardRef<
  HTMLAnchorElement,
  WebRouterLinkProps
>(function WebRouterLink({ href, ...rest }, ref): React.ReactNode {
  return <Link ref={ref} href={href} {...rest} />;
});
