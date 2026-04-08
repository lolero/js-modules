import { useEffect, useRef } from 'react';

/**
 * Get variable's value from previous render of a functional React component.
 * @param variable - Variable whose previous value should be retrieved.
 * @returns Previous value of variable.
 */
export function usePrevious<VarialbeT>(
  variable: VarialbeT,
): VarialbeT | undefined {
  const ref = useRef<VarialbeT | undefined>(undefined);

  useEffect(() => {
    ref.current = variable;
  });

  // react-hooks/refs disabled because ref is written only in useEffect
  // (post-commit), so reading it during render yields the previous value
  // eslint-disable-next-line react-hooks/refs
  return ref.current;
}
