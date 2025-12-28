import React, { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { inputBaseClasses } from '@mui/material/InputBase';
import trim from 'lodash/trim';
import isNull from 'lodash/isNull';
import min from 'lodash/min';

export type OtpBoxProps = {
  otpLength: number;
  otp: string[];
  setOtpCallback: React.Dispatch<string[]>;
  isDisabled?: boolean;
};

export const OtpBox: React.FunctionComponent<OtpBoxProps> = ({
  otpLength,
  otp,
  setOtpCallback,
  isDisabled,
}) => {
  const [cursorIndex, setCursorIndex] = useState<number | null>(0);

  const focusOtpValueCallback = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
      const cursorIndexFocus = Number(
        e.target.getAttribute('data-key') as string,
      );
      setCursorIndex(cursorIndexFocus);
    },
    [],
  );

  const blurOtpValueCallback = useCallback(() => {
    setCursorIndex(null);
  }, []);

  const changeOtpValueCallback = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (e.nativeEvent.inputType === 'insertFromPaste') {
        return;
      }

      const cursorIndexFocus = Number(
        e.target.getAttribute('data-key') as string,
      );

      const otpValueNew = trim(e.target.value).slice(0, 1);

      const otpNew = [...otp];
      otpNew[cursorIndexFocus] = otpValueNew;
      setOtpCallback(otpNew);

      if (cursorIndexFocus < otpLength - 1 && otpValueNew !== '') {
        setCursorIndex(cursorIndexFocus + 1);
      }
    },
    [otp, otpLength, setOtpCallback],
  );

  const keyDownOptValueCallback = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const cursorIndexFocus = Number(
        (e.target as typeof e.currentTarget).getAttribute('data-key') as string,
      );

      const otpValue = otp[cursorIndexFocus];
      switch (e.nativeEvent.key) {
        case 'Backspace':
          if (otpValue === '') {
            setCursorIndex(cursorIndexFocus - 1);
          }
          break;
        case 'ArrowLeft':
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          if (cursorIndexFocus > 0 && e.target.selectionEnd === 0) {
            setCursorIndex(cursorIndexFocus - 1);
          }
          break;
        case 'ArrowRight':
          if (
            cursorIndexFocus < otpLength - 1 &&
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            (e.target.selectionEnd as number) === otpValue.length
          ) {
            setCursorIndex(cursorIndexFocus + 1);
          }
          break;
        default:
      }
    },
    [otp, otpLength],
  );

  useEffect(() => {
    function onPaste(e: ClipboardEvent): void {
      if (isNull(cursorIndex)) {
        return;
      }

      const pasteStr = e.clipboardData!.getData('text');
      const pasteArrayFull = pasteStr.split('');
      const pasteArray = pasteArrayFull.slice(0, otpLength - cursorIndex);

      const otpPrefix = otp.slice(0, cursorIndex);
      const otpSuffix = otp.slice(cursorIndex + pasteArray.length, otpLength);

      const otpPaste = [...otpPrefix, ...pasteArray, ...otpSuffix];
      const cursorIndexPaste = min([
        [...otpPrefix, ...pasteArray].length,
        otpLength - 1,
      ]);

      setOtpCallback(otpPaste);
      setCursorIndex(cursorIndexPaste!);
    }

    document.addEventListener('paste', onPaste);
    return () => {
      document.removeEventListener('paste', onPaste);
    };
  }, [cursorIndex, otp, otpLength, setOtpCallback]);

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
        }}
      >
        {otp.map((otpValue, otpIndex) => {
          const textFieldKey = `otp-${otpIndex}`;
          const autoFocus = otpIndex === cursorIndex;
          return (
            <TextField
              key={textFieldKey}
              sx={{
                [`& .${inputBaseClasses.input}`]: {
                  textAlign: 'center',
                },
              }}
              value={otpValue}
              disabled={isDisabled}
              onFocus={focusOtpValueCallback}
              onBlur={blurOtpValueCallback}
              onKeyDown={keyDownOptValueCallback}
              onChange={changeOtpValueCallback}
              inputProps={{
                'data-key': otpIndex,
              }}
              inputRef={(input) => {
                if (input && autoFocus) {
                  input.focus();
                }
              }}
            />
          );
        })}
      </Box>
    </Box>
  );
};
