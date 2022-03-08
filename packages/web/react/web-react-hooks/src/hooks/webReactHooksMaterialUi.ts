import React, { useCallback, useEffect, useState } from 'react';
import {
  AlertProps,
  ContainerProps,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  ReducerMetadata,
  Request,
  RequestMetadata,
} from 'normalized-reducers-utils';
import { usePrevious } from '@js-modules/common-react-hooks';

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

export type MenuAnchor = EventTarget & HTMLElement;

export type MenuCoordinates = {
  mouseX: number;
  mouseY: number;
};

export type MenuUtils = {
  menuAnchor: MenuAnchor | null;
  menuCoordinates: MenuCoordinates | null;
  openMenuCallback: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  closeMenuCallback: (
    e?: React.MouseEvent<HTMLElement, MouseEvent> | Record<string, never>,
  ) => void;
};

/**
 * React hook to abstract the reusable handles of MaterialUI menus in a web
 * application.
 *
 * @returns {MenuUtils} Menu utils
 */
export function useMenuUtils(): MenuUtils {
  const [menuAnchor, setMenuAnchor] = React.useState<MenuAnchor | null>(null);

  const [menuCoordinates, setMenuCoordinates] =
    React.useState<MenuCoordinates | null>(null);

  const openMenuCallback = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
      setMenuAnchor(e.currentTarget);
      setMenuCoordinates({
        mouseX: e.clientX - 2,
        mouseY: e.clientY - 4,
      });
    },
    [],
  );

  const closeMenuCallback = useCallback(
    (e?: React.MouseEvent<HTMLElement, MouseEvent> | Record<string, never>) => {
      setMenuAnchor(null);
      setMenuCoordinates(null);
      e?.preventDefault();
    },
    [],
  );

  return {
    menuAnchor,
    menuCoordinates,
    openMenuCallback,
    closeMenuCallback,
  };
}

export function useTableUtils<SortByT>(initialSortBy: SortByT): {
  tableMetadata: {
    sortBy: SortByT;
    sortDirection: 'asc' | 'desc';
  };
  onSortCallback: (column: SortByT) => void;
} {
  const [tableMetadata, setTableMetadata] = React.useState<{
    sortBy: SortByT;
    sortDirection: 'asc' | 'desc';
  }>({
    sortBy: initialSortBy,
    sortDirection: 'desc',
  });

  const onSortCallback = useCallback(
    (column: SortByT) => {
      const isAsc =
        tableMetadata.sortBy === column &&
        tableMetadata.sortDirection === 'asc';
      setTableMetadata({
        sortDirection: isAsc ? 'desc' : 'asc',
        sortBy: column,
      });
    },
    [tableMetadata.sortBy, tableMetadata.sortDirection],
  );

  return {
    tableMetadata,
    onSortCallback,
  };
}

export type SnackbarMessageMetadata = {
  unixMilliseconds: number;
  message: string;
  severity?: AlertProps['severity'];
  icon?: JSX.Element;
};

export type SnackPackUtils = {
  autoHideDuration: number;
  setSnackPack: React.Dispatch<React.SetStateAction<SnackbarMessageMetadata[]>>;
  snackbarMessageMetadata: SnackbarMessageMetadata | null;
  isSnackbarOpen: boolean;
  closeSnackbarCallback: (e: unknown, reason?: string) => void;
  exitedSnackbarCallback: () => void;
};

export function useSnackPackUtils(autoHideDuration = 5000): SnackPackUtils {
  const [snackPack, setSnackPack] = useState<SnackbarMessageMetadata[]>([]);
  const [snackbarMessageMetadata, setSnackbarMessageMetadata] =
    useState<SnackbarMessageMetadata | null>(null);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);

  const closeSnackbarCallback = useCallback((e, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsSnackbarOpen(false);
  }, []);

  const exitedSnackbarCallback = useCallback(() => {
    setSnackbarMessageMetadata(null);
  }, []);

  useEffect(() => {
    if (snackPack.length && !snackbarMessageMetadata) {
      setSnackbarMessageMetadata({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setIsSnackbarOpen(true);
    } else if (snackPack.length && snackbarMessageMetadata && isSnackbarOpen) {
      setIsSnackbarOpen(false);
    }
  }, [isSnackbarOpen, snackPack, snackbarMessageMetadata]);

  return {
    autoHideDuration,
    setSnackPack,
    snackbarMessageMetadata,
    isSnackbarOpen,
    closeSnackbarCallback,
    exitedSnackbarCallback,
  };
}

export type SnackbarMessage = { success: string; error: string };

export function useRequestSnackbar<ReducerMetadataT extends ReducerMetadata>(
  request: Request<RequestMetadata> | undefined,
  message: { success: string; error: string },
  setSnackPack: React.Dispatch<React.SetStateAction<SnackbarMessageMetadata[]>>,
  icon?: JSX.Element,
  resetRequestIdsCallback?: (
    partialReducerMetadata: Partial<ReducerMetadataT>,
  ) => void,
  resetRequestIdsPartialReducerMetadata?: Partial<ReducerMetadataT>,
): void {
  const requestPrevious = usePrevious(request);

  useEffect(() => {
    if (requestPrevious?.isPending && !request?.isPending) {
      const snackbarMessageMetadata: SnackbarMessageMetadata = {
        unixMilliseconds: new Date().getTime(),
        message: request?.isOk ? message.success : message.error,
        severity: request?.isOk ? 'success' : 'error',
        icon,
      };

      setSnackPack((prev) => [...prev, snackbarMessageMetadata]);

      if (resetRequestIdsCallback && resetRequestIdsPartialReducerMetadata) {
        resetRequestIdsCallback(resetRequestIdsPartialReducerMetadata);
      }
    }
  }, [
    icon,
    message.error,
    message.success,
    request?.isOk,
    request?.isPending,
    requestPrevious?.isPending,
    resetRequestIdsCallback,
    resetRequestIdsPartialReducerMetadata,
    setSnackPack,
  ]);
}
