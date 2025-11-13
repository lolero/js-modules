import React, { useCallback } from 'react';

export type MenuAnchor = EventTarget & HTMLElement;

export type MenuCoordinates = {
  mouseX: number;
  mouseY: number;
};

export type MenuUtils<MenuMetadataT> = {
  menuAnchor: MenuAnchor | null;
  menuCoordinates: MenuCoordinates | null;
  menuMetadata: MenuMetadataT | null;
  openMenuCallback: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    menuMetadata?: MenuMetadataT | null,
  ) => void;
  closeMenuCallback: (
    e?: React.MouseEvent<HTMLElement, MouseEvent> | Record<string, never>,
  ) => void;
};

/**
 * React hook to abstract the reusable handles of MaterialUI menus in a web
 * application.
 *
 * @returns {MenuUtils} Menu utils
 */
export function useMenuUtils<
  MenuMetadataT = never,
>(): MenuUtils<MenuMetadataT> {
  const [menuAnchor, setMenuAnchor] = React.useState<MenuAnchor | null>(null);

  const [menuCoordinates, setMenuCoordinates] =
    React.useState<MenuCoordinates | null>(null);

  const [menuMetadata, setMenuMetadata] = React.useState<MenuMetadataT | null>(
    null,
  );

  const openMenuCallback = useCallback(
    (
      e: React.MouseEvent<HTMLElement, MouseEvent>,
      menuMetadataUpdated?: MenuMetadataT | null,
    ) => {
      e.preventDefault();
      setMenuAnchor(e.currentTarget);
      setMenuCoordinates({
        mouseX: e.clientX - 2,
        mouseY: e.clientY - 4,
      });
      setMenuMetadata(menuMetadataUpdated ?? null);
    },
    [],
  );

  const closeMenuCallback = useCallback(
    (e?: React.MouseEvent<HTMLElement, MouseEvent> | Record<string, never>) => {
      setMenuAnchor(null);
      setMenuCoordinates(null);
      setMenuMetadata(null);
      e?.preventDefault();
    },
    [],
  );

  return {
    menuAnchor,
    menuCoordinates,
    menuMetadata,
    openMenuCallback,
    closeMenuCallback,
  };
}
