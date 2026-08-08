import difference from 'lodash/difference';
import isEqual from 'lodash/isEqual';
import keys from 'lodash/keys';
import { useCallback, useMemo } from 'react';
import type { FindManyRange } from '@js-modules/api-nest-utils/src/types/types.requests';
import type { FindManyRangesTypes } from '../types/findManyRanges.types';
import type { SetSearchParams } from '../types/searchParams.types';

/**
 * Reads and writes `<key>Range` search params for find-many queries.
 * @param searchParams - Current search params.
 * @param setSearchParams - Setter used to write range params back.
 * @param rangeTypes - Range types keyed by range key.
 * @returns The range keys and the get/set/delete range callbacks.
 */
export function useFindManyRangesUtils(
  searchParams: URLSearchParams,
  setSearchParams: SetSearchParams,
  rangeTypes: FindManyRangesTypes = {},
): {
  rangeKeys: string[];
  rangeKeysActive: string[];
  rangeKeysUnselected: string[];
  getRangeCallback: (rangeKey: string) => FindManyRange;
  setRangeCallback: (rangeKey: string, range: FindManyRange) => void;
  deleteRangeCallback: (rangeKey: string) => void;
} {
  // WHY: react-compiler-hookless-hook
  const rangeKeys = useMemo(() => {
    return keys(rangeTypes);
  }, [rangeTypes]);

  // WHY: react-compiler-hookless-hook
  const rangeKeysActive = useMemo(() => {
    const activeKeys: string[] = [];
    Array.from(searchParams.entries()).forEach(([key]) => {
      if (key.endsWith('Range')) {
        const rangeKey = key.slice(0, -5);
        if (rangeKeys.includes(rangeKey)) {
          activeKeys.push(rangeKey);
        }
      }
    });

    return activeKeys;
  }, [searchParams, rangeKeys]);

  // WHY: react-compiler-hookless-hook
  const rangeKeysUnselected = useMemo(() => {
    return difference(rangeKeys, rangeKeysActive);
  }, [rangeKeys, rangeKeysActive]);

  // WHY: react-compiler-hookless-hook
  const getRangeCallback = useCallback(
    (rangeKey: string): FindManyRange => {
      const rangeParam = `${rangeKey}Range`;
      const rangeValue = searchParams.get(rangeParam);

      if (!rangeValue) {
        return [null, null];
      }

      try {
        const rangeValueArray = rangeValue.split('-').map((rangeValueItem) => {
          if (!rangeValueItem || rangeValueItem === 'null') {
            return null;
          }
          return rangeValueItem;
        }) as FindManyRange;
        return rangeValueArray;
      } catch {
        return [null, null];
      }
    },
    [searchParams],
  );

  // WHY: react-compiler-hookless-hook
  const setRangeCallback = useCallback(
    (rangeKey: string, range: FindManyRange) => {
      const rangeParam = `${rangeKey}Range`;

      setSearchParams((searchParamsTemp) => {
        if (isEqual(range, [null, null])) {
          searchParamsTemp.delete(rangeParam);
        } else {
          const rangeValue = range.join('-');
          searchParamsTemp.set(rangeParam, rangeValue);
        }

        return searchParamsTemp;
      });
    },
    [setSearchParams],
  );

  // WHY: react-compiler-hookless-hook
  const deleteRangeCallback = useCallback(
    (rangeKey: string) => {
      const rangeParam = `${rangeKey}Range`;

      setSearchParams((searchParamsTemp) => {
        searchParamsTemp.delete(rangeParam);
        return searchParamsTemp;
      });
    },
    [setSearchParams],
  );

  return {
    rangeKeys,
    rangeKeysActive,
    rangeKeysUnselected,
    getRangeCallback,
    setRangeCallback,
    deleteRangeCallback,
  };
}
