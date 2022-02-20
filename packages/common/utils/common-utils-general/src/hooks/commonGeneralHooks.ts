import { useEffect, useRef } from 'react';
import { ContainerProps, useMediaQuery, useTheme } from '@mui/material';

/**
 * Get variable's value from previous render of a functional React component
 *
 * @param {any} variable - Variable, whose previous value should be retrieved
 *
 * @returns {T} Previous value of variable
 */
export function usePrevious<T>(variable: T): T {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = variable;
  });
  return ref.current as T;
}

/**
 * Get the Material UI upper theme breakpoint code from the client's viewport
 * size
 *
 * @returns {string} Material UI upper theme breakpoint code
 */
export function useUpperThemeBreakPoint(): Exclude<
  ContainerProps['maxWidth'],
  false | undefined
> {
  const theme = useTheme();
  const isXlDown = useMediaQuery(theme.breakpoints.down('xl'));
  const isLgDown = useMediaQuery(theme.breakpoints.down('lg'));
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  const isXsDown = useMediaQuery(theme.breakpoints.down('xs'));

  let upperThemeBreakpoint: ContainerProps['maxWidth'] = 'xl';
  if (isXlDown) {
    upperThemeBreakpoint = 'xl';
  }
  if (isLgDown) {
    upperThemeBreakpoint = 'lg';
  }
  if (isMdDown) {
    upperThemeBreakpoint = 'md';
  }
  if (isSmDown) {
    upperThemeBreakpoint = 'sm';
  }
  if (isXsDown) {
    upperThemeBreakpoint = 'xs';
  }

  return upperThemeBreakpoint;
}
