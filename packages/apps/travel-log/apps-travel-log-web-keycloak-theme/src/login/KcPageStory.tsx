import { createGetKcContextMock } from 'keycloakify/login/KcContext';
import type { DeepPartial } from 'keycloakify/tools/DeepPartial';
import type React from 'react';
import { kcEnvDefaults, themeNames } from '../kc.gen';
import type {
  KcContext,
  KcContextExtension,
  KcContextExtensionPerPage,
} from './KcContext';
import KcPage from './KcPage';

const kcContextExtension: KcContextExtension = {
  themeName: themeNames[0],
  properties: {
    ...kcEnvDefaults,
  },
};
const kcContextExtensionPerPage: KcContextExtensionPerPage = {};

const { getKcContextMock } = createGetKcContextMock({
  kcContextExtension,
  kcContextExtensionPerPage,
  overrides: {},
  overridesPerPage: {},
});

export function createKcPageStory<PageId extends KcContext['pageId']>(params: {
  pageId: PageId;
}): {
  KcPageStory: (props: {
    kcContext?: DeepPartial<Extract<KcContext, { pageId: PageId }>>;
  }) => React.ReactNode;
} {
  const { pageId } = params;

  function KcPageStory({
    kcContext: overrides,
  }: {
    kcContext?: DeepPartial<Extract<KcContext, { pageId: PageId }>>;
  }): React.ReactNode {
    const kcContextMock = getKcContextMock({
      pageId,
      overrides,
    });

    return <KcPage kcContext={kcContextMock} />;
  }

  return { KcPageStory };
}
