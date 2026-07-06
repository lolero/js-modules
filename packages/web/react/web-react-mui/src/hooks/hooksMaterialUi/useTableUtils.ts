import { useCallback, useState } from 'react';

/**
 * Tracks table sort state (column and direction), toggling the direction when
 * the same column is selected again.
 * @param initialSortBy - Column to sort by on first render (starts descending).
 * @returns Current sort metadata and the sort-change callback.
 */
export function useTableUtils<SortByT>(initialSortBy: SortByT): {
  tableMetadata: {
    sortBy: SortByT;
    sortDirection: 'asc' | 'desc';
  };
  onSortCallback: (column: SortByT) => void;
} {
  const [tableMetadata, setTableMetadata] = useState<{
    sortBy: SortByT;
    sortDirection: 'asc' | 'desc';
  }>({
    sortBy: initialSortBy,
    sortDirection: 'desc',
  });

  const onSortCallback = useCallback(
    (column: SortByT) => {
      const isAsc =
        tableMetadata.sortBy === column &&
        tableMetadata.sortDirection === 'asc';
      setTableMetadata({
        sortDirection: isAsc ? 'desc' : 'asc',
        sortBy: column,
      });
    },
    [tableMetadata.sortBy, tableMetadata.sortDirection],
  );

  return {
    tableMetadata,
    onSortCallback,
  };
}
