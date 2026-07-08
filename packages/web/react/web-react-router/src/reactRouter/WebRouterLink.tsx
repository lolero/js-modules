import type React from 'react';
import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import type {
  WebRouterLinkComponent,
  WebRouterLinkProps,
} from '../types/webRouter.types';

/**
 * Framework-agnostic web router link backed by react-router's <Link />, mapping
 * the contract's `href` prop onto react-router's `to` prop.
 * @param props - Component props.
 * @param props.href - Link destination.
 * @param ref - Forwarded ref to the underlying anchor element.
 * @returns A react-router <Link /> anchor.
 */
export const WebRouterLink: WebRouterLinkComponent = forwardRef<
  HTMLAnchorElement,
  WebRouterLinkProps
>(function WebRouterLink({ href, ...rest }, ref): React.ReactNode {
  return <Link ref={ref} to={href} {...rest} />;
});
