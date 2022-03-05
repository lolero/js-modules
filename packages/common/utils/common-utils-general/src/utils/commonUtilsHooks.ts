import { useEffect, useRef } from 'react';

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
