import React, { useCallback } from 'react';

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
 * @returns {MenuUtils} Menu utils
 */
function useMenuUtils(): MenuUtils {
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

export default useMenuUtils;
