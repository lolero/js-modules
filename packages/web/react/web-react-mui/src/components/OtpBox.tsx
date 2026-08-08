import Box from '@mui/material/Box';
import { inputBaseClasses } from '@mui/material/InputBase';
import TextField from '@mui/material/TextField';
import isNull from 'lodash/isNull';
import min from 'lodash/min';
import trim from 'lodash/trim';
import type React from 'react';
import { useEffect, useState } from 'react';

// WATCH: react-compiler-computed-keys
// Hoisted so the key position holds a plain identifier.
const cssSelectorInputBaseInput = `& .${inputBaseClasses.input}`;

export type OtpBoxProps = {
  otpLength: number;
  otp: string[];
  setOtpCallback: React.Dispatch<string[]>;
  isDisabled?: boolean;
};

/**
 * One-time-password input — a row of single-character boxes with cursor and
 * paste handling that reports the assembled OTP via `setOtpCallback`.
 * @param props - Component props.
 * @param props.otpLength - Number of OTP characters (boxes) to render.
 * @param props.otp - Current OTP characters.
 * @param props.setOtpCallback - Reports the updated OTP characters.
 * @param props.isDisabled - Whether the inputs are disabled.
 * @returns The OTP input row.
 */
export function OtpBox({
  otpLength,
  otp,
  setOtpCallback,
  isDisabled,
}: OtpBoxProps): React.ReactNode {
  const [cursorIndex, setCursorIndex] = useState<number | null>(0);

  function focusOtpValueCallback(
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ): void {
    const cursorIndexFocus = Number(e.target.getAttribute('data-key'));
    setCursorIndex(cursorIndexFocus);
  }

  function blurOtpValueCallback(): void {
    setCursorIndex(null);
  }

  function changeOtpValueCallback(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void {
    if ((e.nativeEvent as InputEvent).inputType === 'insertFromPaste') {
      return;
    }

    const cursorIndexFocus = Number(e.target.getAttribute('data-key'));

    const otpValueNew = trim(e.target.value).slice(0, 1);

    const otpNew = [...otp];
    otpNew[cursorIndexFocus] = otpValueNew;
    setOtpCallback(otpNew);

    if (cursorIndexFocus < otpLength - 1 && otpValueNew !== '') {
      setCursorIndex(cursorIndexFocus + 1);
    }
  }

  function keyDownOptValueCallback(
    e: React.KeyboardEvent<HTMLDivElement>,
  ): void {
    const cursorIndexFocus = Number(
      (e.target as typeof e.currentTarget).getAttribute('data-key'),
    );

    const otpValue = otp[cursorIndexFocus];
    switch (e.nativeEvent.key) {
      case 'Backspace':
        if (otpValue === '') {
          setCursorIndex(cursorIndexFocus - 1);
        }
        break;
      case 'ArrowLeft':
        if (
          cursorIndexFocus > 0 &&
          (e.target as HTMLInputElement).selectionEnd === 0
        ) {
          setCursorIndex(cursorIndexFocus - 1);
        }
        break;
      case 'ArrowRight':
        if (
          cursorIndexFocus < otpLength - 1 &&
          ((e.target as HTMLInputElement).selectionEnd as number) ===
            otpValue.length
        ) {
          setCursorIndex(cursorIndexFocus + 1);
        }
        break;
      default:
    }
  }

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
      setCursorIndex(cursorIndexPaste);
    }

    document.addEventListener('paste', onPaste);
    return (): void => {
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
                [cssSelectorInputBaseInput]: {
                  textAlign: 'center',
                },
              }}
              value={otpValue}
              disabled={isDisabled}
              onFocus={focusOtpValueCallback}
              onBlur={blurOtpValueCallback}
              onKeyDown={keyDownOptValueCallback}
              onChange={changeOtpValueCallback}
              slotProps={{
                htmlInput: { 'data-key': otpIndex },
              }}
              inputRef={(input: HTMLInputElement | null) => {
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
}
