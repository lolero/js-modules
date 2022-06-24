import React, { useCallback } from 'react';

function useTableUtils<SortByT>(initialSortBy: SortByT): {
  tableMetadata: {
    sortBy: SortByT;
    sortDirection: 'asc' | 'desc';
  };
  onSortCallback: (column: SortByT) => void;
} {
  const [tableMetadata, setTableMetadata] = React.useState<{
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

export default useTableUtils;
