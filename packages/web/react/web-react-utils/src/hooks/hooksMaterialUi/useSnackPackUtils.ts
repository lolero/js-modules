import { AlertProps } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';

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

export function useSnackPackUtils(autoHideDuration = 5000): SnackPackUtils {
  const [snackPack, setSnackPack] = useState<SnackbarMessageMetadata[]>([]);
  const [snackbarMessageMetadata, setSnackbarMessageMetadata] =
    useState<SnackbarMessageMetadata | null>(null);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);

  const closeSnackbarCallback = useCallback((e: any, reason?: string) => {
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
