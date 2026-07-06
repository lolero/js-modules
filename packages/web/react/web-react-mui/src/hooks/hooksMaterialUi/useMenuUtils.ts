import { useCallback, useState } from 'react';

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
 * State utils for MUI `Menu` components: tracks the anchor element, pointer
 * coordinates, and optional metadata for the open menu, with open/close handlers.
 * @returns Menu anchor, coordinates, metadata, and open/close callbacks.
 */
export function useMenuUtils<
  MenuMetadataT = never,
>(): MenuUtils<MenuMetadataT> {
  const [menuAnchor, setMenuAnchor] = useState<MenuAnchor | null>(null);

  const [menuCoordinates, setMenuCoordinates] =
    useState<MenuCoordinates | null>(null);

  const [menuMetadata, setMenuMetadata] = useState<MenuMetadataT | null>(null);

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
