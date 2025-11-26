import React, { useMemo } from 'react';
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import FontAwesomeIcon from '@react-native-vector-icons/fontawesome';
import { useStateMainReducerMetadata } from '@js-modules/apps-travel-log-common-store-redux';
import { ThemePalette } from '@js-modules/apps-travel-log-common-constants';
import { TravelLogNavigationContainer } from './TravelLogNavigationContainer';

export const TravelLogPaperProvider: React.FC = () => {
  const { themePalette } = useStateMainReducerMetadata();

  const theme = useMemo(() => {
    const themeTemp =
      themePalette === ThemePalette.light ? MD3LightTheme : MD3DarkTheme;
    return themeTemp;
  }, [themePalette]);

  return (
    <PaperProvider
      theme={theme}
      settings={{
        // eslint-disable-next-line react/no-unstable-nested-components, react/jsx-props-no-spreading
        icon: (props) => <FontAwesomeIcon {...props} />,
      }}
    >
      <TravelLogNavigationContainer paperTheme={theme} />
    </PaperProvider>
  );
};
