import type React from 'react';
import { Link } from 'react-router-dom';
import type { WebRouterLinkProps } from '../types/webRouter.types';

/**
 * Framework-agnostic web router link backed by react-router's <Link />, mapping
 * the contract's `href` prop onto react-router's `to` prop.
 * @param props - Component props.
 * @param props.ref - Ref to the underlying anchor element.
 * @param props.href - Link destination.
 * @returns A react-router <Link /> anchor.
 */
export function WebRouterLink({
  ref,
  href,
  ...rest
}: WebRouterLinkProps): React.ReactNode {
  return <Link ref={ref} to={href} {...rest} />;
}
