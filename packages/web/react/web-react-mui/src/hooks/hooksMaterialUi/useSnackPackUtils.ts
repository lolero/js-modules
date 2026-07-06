import type { AlertProps } from '@mui/material';
import type React from 'react';
import { useCallback, useState } from 'react';

export type SnackbarMessageMetadata = {
  unixMilliseconds: number;
  message: string;
  severity?: AlertProps['severity'];
  icon?: React.ReactElement;
};

export type SnackPackUtils = {
  autoHideDuration: number;
  setSnackPack: React.Dispatch<React.SetStateAction<SnackbarMessageMetadata[]>>;
  snackbarMessageMetadata: SnackbarMessageMetadata | null;
  isSnackbarOpen: boolean;
  closeSnackbarCallback: (e: unknown, reason?: string) => void;
  exitedSnackbarCallback: () => void;
};

/**
 * Implements the MUI consecutive-snackbars (snack pack) pattern: buffers queued
 * messages and surfaces them one at a time, exposing open state plus close/exit
 * handlers.
 * @param autoHideDuration - Milliseconds before the snackbar auto-hides.
 * @returns Snack pack state and the close/exit callbacks.
 */
export function useSnackPackUtils(autoHideDuration = 5000): SnackPackUtils {
  const [snackPack, setSnackPack] = useState<SnackbarMessageMetadata[]>([]);
  const [snackbarMessageMetadata, setSnackbarMessageMetadata] =
    useState<SnackbarMessageMetadata | null>(null);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);

  const closeSnackbarCallback = useCallback((_e: unknown, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsSnackbarOpen(false);
  }, []);

  const exitedSnackbarCallback = useCallback(() => {
    setSnackbarMessageMetadata(null);
  }, []);

  if (snackPack.length && !snackbarMessageMetadata) {
    setSnackbarMessageMetadata({ ...snackPack[0] });
    setSnackPack((prev) => prev.slice(1));
    setIsSnackbarOpen(true);
  } else if (snackPack.length && snackbarMessageMetadata && isSnackbarOpen) {
    setIsSnackbarOpen(false);
  }

  return {
    autoHideDuration,
    setSnackPack,
    snackbarMessageMetadata,
    isSnackbarOpen,
    closeSnackbarCallback,
    exitedSnackbarCallback,
  };
}
