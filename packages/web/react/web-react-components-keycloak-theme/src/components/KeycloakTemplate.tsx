import type { TemplateProps } from 'keycloakify/lib/KcProps';
import { usePrepareTemplate } from 'keycloakify/lib/Template';
import { I18nBase, KcContextBase } from 'keycloakify';
import React from 'react';
import clsx from 'clsx';

export const KeycloakTemplate: React.FunctionComponent<
  TemplateProps<KcContextBase.Common, I18nBase>
> = ({
  displayInfo = false,
  displayMessage = true,
  displayRequiredFields = false,
  displayWide = false,
  showAnotherWayIfPresent = true,
  headerNode,
  showUsernameNode = null,
  formNode,
  infoNode = null,
  kcContext,
  i18n,
  doFetchDefaultThemeResources,
  stylesCommon,
  styles,
  scripts,
  kcHtmlClass,
  kcLoginClass,
  kcHeaderClass,
  kcHeaderWrapperClass,
  kcFormCardClass,
  kcFormCardAccountClass,
  kcFormHeaderClass,
  kcLocaleWrapperClass,
  kcContentWrapperClass,
  kcLabelWrapperClass,
  kcFormGroupClass,
  kcResetFlowIcon,
  kcFeedbackSuccessIcon,
  kcFeedbackWarningIcon,
  kcFeedbackErrorIcon,
  kcFeedbackInfoIcon,
  kcFormSocialAccountContentClass,
  kcFormSocialAccountClass,
  kcSignUpClass,
  kcInfoAreaWrapperClass,
}) => {
  const { msg, changeLocale, labelBySupportedLanguageTag, currentLanguageTag } =
    i18n;

  const { realm, locale, auth, url, message, isAppInitiatedAction } = kcContext;

  const { isReady } = usePrepareTemplate({
    doFetchDefaultThemeResources,
    stylesCommon,
    styles,
    scripts,
    url,
    kcHtmlClass,
  });

  if (!isReady) {
    return null;
  }

  return (
    <div className={clsx(kcLoginClass)}>
      <div id="kc-header" className={clsx(kcHeaderClass)}>
        <div id="kc-header-wrapper" className={clsx(kcHeaderWrapperClass)}>
          {msg('loginTitleHtml', realm.displayNameHtml)}
        </div>
      </div>

      <div
        className={clsx(kcFormCardClass, displayWide && kcFormCardAccountClass)}
      >
        <header className={clsx(kcFormHeaderClass)}>
          {realm.internationalizationEnabled &&
            !!locale &&
            locale?.supported.length > 1 && (
              <div id="kc-locale">
                <div
                  id="kc-locale-wrapper"
                  className={clsx(kcLocaleWrapperClass)}
                >
                  <div className="kc-dropdown" id="kc-locale-dropdown">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a href="#" id="kc-current-locale-link">
                      {labelBySupportedLanguageTag[currentLanguageTag]}
                    </a>
                    <ul>
                      {locale.supported.map(({ languageTag }) => (
                        <li key={languageTag} className="kc-dropdown-item">
                          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                          <a href="#" onClick={() => changeLocale(languageTag)}>
                            {labelBySupportedLanguageTag[languageTag]}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          {!(
            auth !== undefined &&
            auth.showUsername &&
            !auth.showResetCredentials
          ) ? (
            displayRequiredFields ? (
              <div className={clsx(kcContentWrapperClass)}>
                <div className={clsx(kcLabelWrapperClass, 'subtitle')}>
                  <span className="subtitle">
                    <span className="required">*</span>
                    {msg('requiredFields')}
                  </span>
                </div>
                <div className="col-md-10">
                  <h1 id="kc-page-title">{headerNode}</h1>
                </div>
              </div>
            ) : (
              <h1 id="kc-page-title">{headerNode}</h1>
            )
          ) : displayRequiredFields ? (
            <div className={clsx(kcContentWrapperClass)}>
              <div className={clsx(kcLabelWrapperClass, 'subtitle')}>
                <span className="subtitle">
                  <span className="required">*</span> {msg('requiredFields')}
                </span>
              </div>
              <div className="col-md-10">
                {showUsernameNode}
                <div className={clsx(kcFormGroupClass)}>
                  <div id="kc-username">
                    <label id="kc-attempted-username">
                      {auth?.attemptedUsername}
                    </label>
                    <a id="reset-login" href={url.loginRestartFlowUrl}>
                      <div className="kc-login-tooltip">
                        <i className={clsx(kcResetFlowIcon)} />
                        <span className="kc-tooltip-text">
                          {msg('restartLoginTooltip')}
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {showUsernameNode}
              <div className={clsx(kcFormGroupClass)}>
                <div id="kc-username">
                  <label id="kc-attempted-username">
                    {auth?.attemptedUsername}
                  </label>
                  <a id="reset-login" href={url.loginRestartFlowUrl}>
                    <div className="kc-login-tooltip">
                      <i className={clsx(kcResetFlowIcon)} />
                      <span className="kc-tooltip-text">
                        {msg('restartLoginTooltip')}
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </>
          )}
        </header>
        <div id="kc-content">
          <div id="kc-content-wrapper">
            {/* App-initiated actions should not see warning messages about the need to complete the action during login. */}
            {displayMessage &&
              message !== undefined &&
              (message.type !== 'warning' || !isAppInitiatedAction) && (
                <div className={clsx('alert', `alert-${message.type}`)}>
                  {message.type === 'success' && (
                    <span className={clsx(kcFeedbackSuccessIcon)} />
                  )}
                  {message.type === 'warning' && (
                    <span className={clsx(kcFeedbackWarningIcon)} />
                  )}
                  {message.type === 'error' && (
                    <span className={clsx(kcFeedbackErrorIcon)} />
                  )}
                  {message.type === 'info' && (
                    <span className={clsx(kcFeedbackInfoIcon)} />
                  )}
                  <span
                    className="kc-feedback-text"
                    dangerouslySetInnerHTML={{
                      __html: message.summary,
                    }}
                  />
                </div>
              )}
            {formNode}
            {auth !== undefined &&
              auth.showTryAnotherWayLink &&
              showAnotherWayIfPresent && (
                <form
                  id="kc-select-try-another-way-form"
                  action={url.loginAction}
                  method="post"
                  className={clsx(displayWide && kcContentWrapperClass)}
                >
                  <div
                    className={clsx(
                      displayWide && [
                        kcFormSocialAccountContentClass,
                        kcFormSocialAccountClass,
                      ],
                    )}
                  >
                    <div className={clsx(kcFormGroupClass)}>
                      <input type="hidden" name="tryAnotherWay" value="on" />
                      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                      <a
                        href="#"
                        id="try-another-way"
                        onClick={() => {
                          document.forms[
                            'kc-select-try-another-way-form' as never
                          ].submit();
                          return false;
                        }}
                      >
                        {msg('doTryAnotherWay')}
                      </a>
                    </div>
                  </div>
                </form>
              )}
            {displayInfo && (
              <div id="kc-info" className={clsx(kcSignUpClass)}>
                <div
                  id="kc-info-wrapper"
                  className={clsx(kcInfoAreaWrapperClass)}
                >
                  {infoNode}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
