'use client';

import Link from 'next/link';
import type React from 'react';
import type { WebRouterLinkProps } from '../types/webRouter.types';

/**
 * Framework-agnostic web router link backed by Next.js's <Link />. Next's
 * <Link /> already uses `href`, so this is a thin, ref-passing passthrough.
 * @param props - Component props.
 * @param props.ref - Ref to the underlying anchor element.
 * @param props.href - Link destination.
 * @returns A Next.js <Link /> anchor.
 */
export function WebRouterLink({
  ref,
  href,
  ...rest
}: WebRouterLinkProps): React.ReactNode {
  return <Link ref={ref} href={href} {...rest} />;
}
