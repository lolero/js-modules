import type { PageProps } from 'keycloakify/lib/KcProps';
import { I18nBase, KcContextBase, useDownloadTerms } from 'keycloakify';
import React from 'react';
import clsx from 'clsx';
import { evtTermMarkdown } from 'keycloakify/lib/pages/Terms';
import { Markdown } from 'keycloakify/lib/tools/Markdown';

export const KeycloakTerms: React.FunctionComponent<
  PageProps<Extract<KcContextBase.Terms, { pageId: 'terms.ftl' }>, I18nBase>
> = ({
  kcContext,
  i18n,
  doFetchDefaultThemeResources = true,
  Template,
  ...kcProps
}) => {
  const { url } = kcContext;

  const { msg, msgStr } = i18n;

  useDownloadTerms({
    kcContext,
    downloadTermMarkdown: async () => {
      const markdownString = await fetch('/tos_en.md').then((response) =>
        response.text(),
      );

      return markdownString;
    },
  });

  const evtTermMarkdownState = evtTermMarkdown.state;

  if (!evtTermMarkdownState) {
    return null;
  }

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doFetchDefaultThemeResources={doFetchDefaultThemeResources}
      {...kcProps}
      displayMessage={false}
      headerNode={msg('termsTitle')}
      formNode={
        <>
          <div id="kc-terms-text">
            {evtTermMarkdown.state && (
              <Markdown>{evtTermMarkdownState}</Markdown>
            )}
          </div>
          <form className="form-actions" action={url.loginAction} method="POST">
            <input
              className={clsx(
                kcProps.kcButtonClass,
                kcProps.kcButtonClass,
                kcProps.kcButtonClass,
                kcProps.kcButtonPrimaryClass,
                kcProps.kcButtonLargeClass,
              )}
              name="accept"
              id="kc-accept"
              type="submit"
              value={msgStr('doAccept')}
            />
            <input
              className={clsx(
                kcProps.kcButtonClass,
                kcProps.kcButtonDefaultClass,
                kcProps.kcButtonLargeClass,
              )}
              name="cancel"
              id="kc-decline"
              type="submit"
              value={msgStr('doDecline')}
            />
          </form>
          <div className="clearfix" />
        </>
      }
    />
  );
};
