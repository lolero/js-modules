import noop from 'lodash/noop';
import { isUndefined } from 'lodash';

export type TimeoutRepeat = {
  timeout: NodeJS.Timeout;
  clearTimeoutCallback: () => void;
};

export function setTimeoutRepeat(
  callback: (...args: any[]) => void,
  interval: number,
  initialDelay?: number,
): TimeoutRepeat {
  let timeout = setTimeout(noop, 0);

  // Function to be executed after each interval
  function executeCallback(): void {
    clearTimeout(timeout);
    callback();
    timeout = setTimeout(executeCallback, interval);
  }

  // Start the initial timeout
  timeout = setTimeout(
    executeCallback,
    !isUndefined(initialDelay) ? initialDelay : interval,
  );

  function clearTimeoutCallback(): void {
    clearTimeout(timeout);
  }

  return {
    timeout,
    clearTimeoutCallback,
  };
}
