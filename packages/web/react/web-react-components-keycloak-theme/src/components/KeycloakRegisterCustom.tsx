import type { PageProps } from 'keycloakify/lib/KcProps';
import { I18nBase } from 'keycloakify';
import React from 'react';
import clsx from 'clsx';
import { KcContextBase } from 'keycloakify/lib/getKcContext/KcContextBase';

export const KeycloakRegisterCustom: React.FunctionComponent<
  PageProps<
    Extract<
      KcContextBase.RegisterCommon & {
        pageId: 'register.ftl';
        register: {
          formData: {
            firstName?: string;
            middleName?: string;
            lastName?: string;
            username?: string;
            phoneNumber?: string;
            email: string;
          };
        };
      },
      { pageId: 'register.ftl' }
    >,
    I18nBase
  >
> = ({
  kcContext,
  i18n,
  doFetchDefaultThemeResources = true,
  Template,
  ...kcProps
}) => {
  const {
    url,
    messagesPerField,
    register,
    realm,
    passwordRequired,
    recaptchaRequired,
    recaptchaSiteKey,
  } = kcContext;

  const { msg, msgStr } = i18n;

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doFetchDefaultThemeResources={doFetchDefaultThemeResources}
      {...kcProps}
      displayRequiredFields
      headerNode={msg('registerTitle')}
      formNode={
        <form
          id="kc-register-form"
          className={clsx(kcProps.kcFormClass)}
          action={url.registrationAction}
          method="post"
        >
          <p>this is rodris register custom test</p>
          <div
            className={clsx(
              kcProps.kcFormGroupClass,
              messagesPerField.printIfExists(
                'firstName',
                kcProps.kcFormGroupErrorClass,
              ),
            )}
          >
            <div className={clsx(kcProps.kcLabelWrapperClass)}>
              <label htmlFor="firstName" className={clsx(kcProps.kcLabelClass)}>
                {msg('firstName')}
              </label>
            </div>
            <div className={clsx(kcProps.kcInputWrapperClass)}>
              <input
                type="text"
                id="firstName"
                className={clsx(kcProps.kcInputClass)}
                name="firstName"
                defaultValue={register.formData.firstName ?? ''}
              />
            </div>
          </div>

          <div
            className={clsx(
              kcProps.kcFormGroupClass,
              // messagesPerField.printIfExists(
              //   'middleName',
              //   kcProps.kcFormGroupErrorClass,
              // ),
            )}
          >
            <div className={clsx(kcProps.kcLabelWrapperClass)}>
              <label
                htmlFor="middleName"
                className={clsx(kcProps.kcLabelClass)}
              >
                Middle name
              </label>
            </div>
            <div className={clsx(kcProps.kcInputWrapperClass)}>
              <input
                type="text"
                id="middleName"
                className={clsx(kcProps.kcInputClass)}
                name="middleName"
                defaultValue={register.formData.middleName ?? ''}
              />
            </div>
          </div>

          <div
            className={clsx(
              kcProps.kcFormGroupClass,
              messagesPerField.printIfExists(
                'lastName',
                kcProps.kcFormGroupErrorClass,
              ),
            )}
          >
            <div className={clsx(kcProps.kcLabelWrapperClass)}>
              <label htmlFor="lastName" className={clsx(kcProps.kcLabelClass)}>
                {msg('lastName')}
              </label>
            </div>
            <div className={clsx(kcProps.kcInputWrapperClass)}>
              <input
                type="text"
                id="lastName"
                className={clsx(kcProps.kcInputClass)}
                name="lastName"
                defaultValue={register.formData.lastName ?? ''}
              />
            </div>
          </div>

          {!realm.registrationEmailAsUsername && (
            <div
              className={clsx(
                kcProps.kcFormGroupClass,
                messagesPerField.printIfExists(
                  'username',
                  kcProps.kcFormGroupErrorClass,
                ),
              )}
            >
              <div className={clsx(kcProps.kcLabelWrapperClass)}>
                <label
                  htmlFor="username"
                  className={clsx(kcProps.kcLabelClass)}
                >
                  {msg('username')}
                </label>
              </div>
              <div className={clsx(kcProps.kcInputWrapperClass)}>
                <input
                  type="text"
                  id="username"
                  className={clsx(kcProps.kcInputClass)}
                  name="username"
                  defaultValue={register.formData.username ?? ''}
                  autoComplete="username"
                />
              </div>
            </div>
          )}

          <div
            className={clsx(
              kcProps.kcFormGroupClass,
              // messagesPerField.printIfExists(
              //   'phoneNumber',
              //   kcProps.kcFormGroupErrorClass,
              // ),
            )}
          >
            <div className={clsx(kcProps.kcLabelWrapperClass)}>
              <label
                htmlFor="phoneNumber"
                className={clsx(kcProps.kcLabelClass)}
              >
                {msg('phoneNumber')}
              </label>
            </div>
            <div className={clsx(kcProps.kcInputWrapperClass)}>
              <input
                type="text"
                id="phoneNumber"
                className={clsx(kcProps.kcInputClass)}
                name="phoneNumber"
                defaultValue={register.formData.phoneNumber ?? ''}
              />
            </div>
          </div>

          <div
            className={clsx(
              kcProps.kcFormGroupClass,
              messagesPerField.printIfExists(
                'email',
                kcProps.kcFormGroupErrorClass,
              ),
            )}
          >
            <div className={clsx(kcProps.kcLabelWrapperClass)}>
              <label htmlFor="email" className={clsx(kcProps.kcLabelClass)}>
                {msg('email')}*
              </label>
            </div>
            <div className={clsx(kcProps.kcInputWrapperClass)}>
              <input
                type="text"
                id="email"
                className={clsx(kcProps.kcInputClass)}
                name="email"
                defaultValue={register.formData.email ?? ''}
                autoComplete="email"
              />
            </div>
          </div>

          {passwordRequired && (
            <>
              <div
                className={clsx(
                  kcProps.kcFormGroupClass,
                  messagesPerField.printIfExists(
                    'password',
                    kcProps.kcFormGroupErrorClass,
                  ),
                )}
              >
                <div className={clsx(kcProps.kcLabelWrapperClass)}>
                  <label
                    htmlFor="password"
                    className={clsx(kcProps.kcLabelClass)}
                  >
                    {msg('password')}
                  </label>
                  *
                </div>
                <div className={clsx(kcProps.kcInputWrapperClass)}>
                  <input
                    type="password"
                    id="password"
                    className={clsx(kcProps.kcInputClass)}
                    name="password"
                    autoComplete="new-password"
                  />
                </div>
              </div>

              <div
                className={clsx(
                  kcProps.kcFormGroupClass,
                  messagesPerField.printIfExists(
                    'password-confirm',
                    kcProps.kcFormGroupErrorClass,
                  ),
                )}
              >
                <div className={clsx(kcProps.kcLabelWrapperClass)}>
                  <label
                    htmlFor="password-confirm"
                    className={clsx(kcProps.kcLabelClass)}
                  >
                    {msg('passwordConfirm')}
                  </label>
                  *
                </div>
                <div className={clsx(kcProps.kcInputWrapperClass)}>
                  <input
                    type="password"
                    id="password-confirm"
                    className={clsx(kcProps.kcInputClass)}
                    name="password-confirm"
                  />
                </div>
              </div>
            </>
          )}
          {recaptchaRequired && (
            <div className="form-group">
              <div className={clsx(kcProps.kcInputWrapperClass)}>
                <div
                  className="g-recaptcha"
                  data-size="compact"
                  data-sitekey={recaptchaSiteKey}
                />
              </div>
            </div>
          )}
          <div className={clsx(kcProps.kcFormGroupClass)}>
            <div
              id="kc-form-options"
              className={clsx(kcProps.kcFormOptionsClass)}
            >
              <div className={clsx(kcProps.kcFormOptionsWrapperClass)}>
                <span>
                  <a href={url.loginUrl}>{msg('backToLogin')}</a>
                </span>
              </div>
            </div>

            <div
              id="kc-form-buttons"
              className={clsx(kcProps.kcFormButtonsClass)}
            >
              <input
                className={clsx(
                  kcProps.kcButtonClass,
                  kcProps.kcButtonPrimaryClass,
                  kcProps.kcButtonBlockClass,
                  kcProps.kcButtonLargeClass,
                )}
                type="submit"
                value={msgStr('doRegister')}
              />
            </div>
          </div>
        </form>
      }
    />
  );
};
