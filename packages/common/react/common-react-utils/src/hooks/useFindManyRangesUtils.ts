import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import isEqual from 'lodash/isEqual';
import { FindManyRange } from '@js-modules/api-nest-utils/src/types/types.requests';
import keys from 'lodash/keys';
import difference from 'lodash/difference';
import { FindManyRangesTypes } from '../types/findManyRanges.types';

export const useFindManyRangesUtils = (
  rangeTypes: FindManyRangesTypes = {},
): {
  rangeKeys: string[];
  rangeKeysActive: string[];
  rangeKeysUnselected: string[];
  getRangeCallback: (rangeKey: string) => FindManyRange;
  setRangeCallback: (rangeKey: string, range: FindManyRange) => void;
  deleteRangeCallback: (rangeKey: string) => void;
} => {
  const [searchParams, setSearchParams] = useSearchParams();

  const rangeKeys = useMemo(() => {
    return keys(rangeTypes);
  }, [rangeTypes]);

  const rangeKeysActive = useMemo(() => {
    const activeKeys: string[] = [];
    searchParams.entries().forEach(([key]) => {
      if (key.endsWith('Range')) {
        const rangeKey = key.slice(0, -5);
        if (rangeKeys.includes(rangeKey)) {
          activeKeys.push(rangeKey);
        }
      }
    });

    return activeKeys;
  }, [searchParams, rangeKeys]);

  const rangeKeysUnselected = useMemo(() => {
    return difference(rangeKeys, rangeKeysActive);
  }, [rangeKeys, rangeKeysActive]);

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
};
