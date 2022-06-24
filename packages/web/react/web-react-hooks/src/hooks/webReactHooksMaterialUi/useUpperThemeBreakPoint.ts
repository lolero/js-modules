import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ContainerProps } from '@mui/material/Container';

/**
 * Get the Material UI upper theme breakpoint code from the client's viewport
 * size
 *
 * @returns {string} Material UI upper theme breakpoint code
 */
function useUpperThemeBreakPoint(): Exclude<
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

export default useUpperThemeBreakPoint;
