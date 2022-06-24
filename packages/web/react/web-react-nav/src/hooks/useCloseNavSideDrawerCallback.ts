import { useCallback, useContext } from 'react';
import { NavContext, NavSideDrawerDisplayStatus } from '../contexts/NavContext';
import useNavDisplayMetadata from './useNavDisplayMetadata';

function useCloseNavSideDrawerCallback(): () => void {
  const { setNavSideDrawerDisplayStatus } = useContext(NavContext);

  const { isMobile, isNavDrawerExpanded } = useNavDisplayMetadata();

  const closeSideDrawerCallback = useCallback(() => {
    if (isMobile && isNavDrawerExpanded) {
      setNavSideDrawerDisplayStatus(NavSideDrawerDisplayStatus.hidden);
    }
  }, [isMobile, isNavDrawerExpanded, setNavSideDrawerDisplayStatus]);

  return closeSideDrawerCallback;
}

export default useCloseNavSideDrawerCallback;
