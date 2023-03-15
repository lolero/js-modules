import type { PageProps } from 'keycloakify/lib/KcProps';
import Keycloakify, { KcContextBase, useI18n } from 'keycloakify';
import React from 'react';
import { defaultKcProps } from 'keycloakify/lib/KcProps';
import Template from 'keycloakify/lib/Template';
import Info from 'keycloakify/lib/pages/Info';
import { KeycloakTemplate } from './KeycloakTemplate';
import { KeycloakTerms } from './KeycloakTerms';
import { KeycloakRegisterUserProfile } from './KeycloakRegisterUserProfile';
import { KeycloakLogin } from './KeycloakLogin';
import { KeycloakRegisterCustom } from './KeycloakRegisterCustom';

export type KeycloakThemeProps = {
  kcContext: KcContextBase;
};

export const KeycloakTheme: React.FunctionComponent<KeycloakThemeProps> = ({
  kcContext,
}) => {
  const i18n = useI18n({ kcContext, extraMessages: {} });

  if (!i18n) {
    return null;
  }

  const pageProps: Omit<PageProps<any, typeof i18n>, 'kcContext'> = {
    i18n,
    // Template,
    Template: KeycloakTemplate,
    doFetchDefaultThemeResources: true,
    ...defaultKcProps,
  };

  switch (kcContext.pageId) {
    case 'login.ftl':
      return <KeycloakLogin {...{ kcContext, ...pageProps }} />;
    case 'register.ftl':
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return <KeycloakRegisterCustom {...{ kcContext, ...pageProps }} />;
    case 'register-user-profile.ftl':
      return <KeycloakRegisterUserProfile {...{ kcContext, ...pageProps }} />;
    case 'terms.ftl':
      return <KeycloakTerms {...{ kcContext, ...pageProps }} />;
    case 'info.ftl':
      return (
        <Info
          {...{ kcContext, ...pageProps }}
          Template={Template}
          doFetchDefaultThemeResources
        />
      );
    default:
      return <Keycloakify {...{ kcContext, ...pageProps }} />;
  }
};
