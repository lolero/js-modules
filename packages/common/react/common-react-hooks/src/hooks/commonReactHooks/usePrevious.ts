import { useEffect, useRef } from 'react';

/**
 * Get variable's value from previous render of a functional React component
 *
 * @param {any} variable - Variable, whose previous value should be retrieved
 *
 * @returns {VarialbeT} Previous value of variable
 */
function usePrevious<VarialbeT>(variable: VarialbeT): VarialbeT | undefined {
  const ref = useRef<VarialbeT>();

  useEffect(() => {
    ref.current = variable;
  });

  return ref.current;
}

export default usePrevious;
