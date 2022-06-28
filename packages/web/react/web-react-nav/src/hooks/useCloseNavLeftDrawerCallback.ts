import { useCallback, useContext } from 'react';
import { NavContext, NavDrawerDisplayStatus } from '../contexts/NavContext';
import { useNavDisplayMetadata } from './useNavDisplayMetadata';

export function useCloseNavLeftDrawerCallback(): () => void {
  const { setNavLeftDrawerDisplayStatus } = useContext(NavContext);

  const { isMobile, isTablet, isNavLeftDrawerExpanded } =
    useNavDisplayMetadata();

  const closeNavLeftDrawerCallback = useCallback(() => {
    if (isNavLeftDrawerExpanded) {
      if (isMobile) {
        setNavLeftDrawerDisplayStatus(NavDrawerDisplayStatus.hidden);
      } else if (isTablet) {
        setNavLeftDrawerDisplayStatus(NavDrawerDisplayStatus.collapsed);
      }
    }
  }, [
    isMobile,
    isNavLeftDrawerExpanded,
    isTablet,
    setNavLeftDrawerDisplayStatus,
  ]);

  return closeNavLeftDrawerCallback;
}
