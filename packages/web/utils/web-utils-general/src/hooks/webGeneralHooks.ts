import React, { Ref, useCallback, useState } from 'react';

export type MenuAnchor = EventTarget & HTMLElement;

export type MenuCoordinates = {
  mouseX: number;
  mouseY: number;
};

export type MenuUtils = {
  menuAnchor: MenuAnchor | null;
  menuCoordinates: MenuCoordinates | null;
  openMenuCallback: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  closeMenuCallback: (
    e?: React.MouseEvent<HTMLElement, MouseEvent> | Record<string, never>,
  ) => void;
};

/**
 * React hook to abstract the reusable handles of MaterialUI menus in a web
 * application.
 *
 * @returns {MenuUtils} SnackPack React component
 */
export function useMenuUtils(): MenuUtils {
  const [menuAnchor, setMenuAnchor] = React.useState<MenuAnchor | null>(null);

  const [menuCoordinates, setMenuCoordinates] =
    React.useState<MenuCoordinates | null>(null);

  const openMenuCallback = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
      setMenuAnchor(e.currentTarget);
      setMenuCoordinates({
        mouseX: e.clientX - 2,
        mouseY: e.clientY - 4,
      });
    },
    [],
  );

  const closeMenuCallback = useCallback(
    (e?: React.MouseEvent<HTMLElement, MouseEvent> | Record<string, never>) => {
      setMenuAnchor(null);
      setMenuCoordinates(null);
      e?.preventDefault();
    },
    [],
  );

  return {
    menuAnchor,
    menuCoordinates,
    openMenuCallback,
    closeMenuCallback,
  };
}

export function useTableUtils<SortByT>(initialSortBy: SortByT): {
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

export function useChildNodeSize<NodeT extends HTMLElement>(): {
  nodeRef: Ref<NodeT>;
  nodeWidth: string;
  nodeHeight: string;
} {
  const [nodeWidth, setNodeWidth] = useState<string>('0px');
  const [nodeHeight, setNodeHeight] = useState<string>('0px');

  const nodeRef = useCallback((node: NodeT) => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0]) {
        setNodeWidth(`${entries[0].contentRect.width}px`);
        setNodeHeight(`${entries[0].contentRect.height}px`);
      }
    });
    resizeObserver.observe(node);
  }, []) as Ref<NodeT>;

  return {
    nodeRef,
    nodeWidth,
    nodeHeight,
  };
}
