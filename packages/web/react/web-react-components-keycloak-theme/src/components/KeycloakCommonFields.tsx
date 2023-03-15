import type { KcProps } from 'keycloakify/lib/KcProps';
import { Attribute, I18nBase } from 'keycloakify';
import React, { Fragment, useEffect, useMemo } from 'react';
import clsx from 'clsx';
import { useFormValidation } from 'keycloakify/lib/pages/shared/UserProfileCommons';
import find from 'lodash/find';
import { pullAllBy } from 'lodash';

export type KeycloakCommonFieldsProps = {
  kcContext: Parameters<typeof useFormValidation>[0]['kcContext'];
  i18n: I18nBase;
} & KcProps &
  Partial<
    Record<
      'BeforeField' | 'AfterField',
      (props: { attribute: Attribute }) => JSX.Element | null
    >
  > & {
    onIsFormSubmittableValueChange: (isFormSubmittable: boolean) => void;
  };

export const KeycloakCommonFields: React.FunctionComponent<
  KeycloakCommonFieldsProps
> = ({
  kcContext,
  onIsFormSubmittableValueChange,
  i18n,
  BeforeField,
  AfterField,
  ...props
}) => {
  const { advancedMsg } = i18n;

  const {
    formValidationState: { fieldStateByAttributeName, isFormSubmittable },
    formValidationDispatch,
    attributesWithPassword,
  } = useFormValidation({
    kcContext,
    i18n,
  });

  const attributesWithPasswordSorted = useMemo(() => {
    const attributesWithPasswordTemp = [...attributesWithPassword];
    const keysSorted = [
      'firstName',
      'middleName',
      'lastName',
      'username',
      'phoneNumber',
      'email',
      'password',
      'password-confirm',
    ];
    const attributesWithPasswordSortedTemp: Attribute[] = [];

    keysSorted.forEach((key) => {
      const attribute = find(
        attributesWithPasswordTemp,
        (attributeTemp) => attributeTemp.name === key,
      );
      if (attribute) {
        attributesWithPasswordSortedTemp.push(attribute);
        pullAllBy(attributesWithPasswordTemp, [attribute], 'name');
      }
    });

    return [...attributesWithPasswordSortedTemp, ...attributesWithPasswordTemp];
  }, [attributesWithPassword]);

  useEffect(() => {
    onIsFormSubmittableValueChange(isFormSubmittable);
  }, [isFormSubmittable, onIsFormSubmittableValueChange]);

  let currentGroup = '';

  return (
    <>
      {attributesWithPasswordSorted.map((attribute, i) => {
        const {
          group = '',
          groupDisplayHeader = '',
          groupDisplayDescription = '',
        } = attribute;

        const { value, displayableErrors } =
          fieldStateByAttributeName[attribute.name];

        const formGroupClassName = clsx(
          props.kcFormGroupClass,
          displayableErrors.length !== 0 && props.kcFormGroupErrorClass,
        );

        // eslint-disable-next-line no-return-assign
        return (
          // eslint-disable-next-line react/no-array-index-key
          <Fragment key={i}>
            <p>this is rodris common fields test</p>
            {group !== currentGroup && (currentGroup = group) !== '' && (
              <div className={formGroupClassName}>
                <div className={clsx(props.kcContentWrapperClass)}>
                  <label
                    id={`header-${group}`}
                    className={clsx(props.kcFormGroupHeader)}
                  >
                    {advancedMsg(groupDisplayHeader) || currentGroup}
                  </label>
                </div>
                {groupDisplayDescription !== '' && (
                  <div className={clsx(props.kcLabelWrapperClass)}>
                    <label
                      id={`description-${group}`}
                      className={`${clsx(props.kcLabelClass)}`}
                    >
                      {advancedMsg(groupDisplayDescription)}
                    </label>
                  </div>
                )}
              </div>
            )}

            {BeforeField && <BeforeField attribute={attribute} />}

            <div className={formGroupClassName}>
              <div className={clsx(props.kcLabelWrapperClass)}>
                <label
                  htmlFor={attribute.name}
                  className={clsx(props.kcLabelClass)}
                >
                  {advancedMsg(attribute.displayName ?? '')}
                </label>
                {attribute.required && <>*</>}
              </div>
              <div className={clsx(props.kcInputWrapperClass)}>
                {(() => {
                  const { options } = attribute.validators;

                  if (options !== undefined) {
                    return (
                      <select
                        id={attribute.name}
                        name={attribute.name}
                        onChange={(event) =>
                          formValidationDispatch({
                            action: 'update value',
                            name: attribute.name,
                            newValue: event.target.value,
                          })
                        }
                        onBlur={() =>
                          formValidationDispatch({
                            action: 'focus lost',
                            name: attribute.name,
                          })
                        }
                        value={value}
                      >
                        {options.options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    );
                  }

                  return (
                    <input
                      type={(() => {
                        switch (attribute.name) {
                          case 'password-confirm':
                          case 'password':
                            return 'password';
                          default:
                            return 'text';
                        }
                      })()}
                      id={attribute.name}
                      name={attribute.name}
                      value={value}
                      onChange={(event) =>
                        formValidationDispatch({
                          action: 'update value',
                          name: attribute.name,
                          newValue: event.target.value,
                        })
                      }
                      onBlur={() =>
                        formValidationDispatch({
                          action: 'focus lost',
                          name: attribute.name,
                        })
                      }
                      className={clsx(props.kcInputClass)}
                      aria-invalid={displayableErrors.length !== 0}
                      disabled={attribute.readOnly}
                      autoComplete={attribute.autocomplete}
                    />
                  );
                })()}
                {displayableErrors.length !== 0 &&
                  (() => {
                    const divId = `input-error-${attribute.name}`;

                    return (
                      <>
                        <style>{`#${divId} > span: { display: block; }`}</style>
                        <span
                          id={divId}
                          className={clsx(props.kcInputErrorMessageClass)}
                          style={{
                            position:
                              displayableErrors.length === 1
                                ? 'absolute'
                                : undefined,
                          }}
                          aria-live="polite"
                        >
                          {displayableErrors.map(
                            ({ errorMessage }) => errorMessage,
                          )}
                        </span>
                      </>
                    );
                  })()}
              </div>
            </div>
            {AfterField && <AfterField attribute={attribute} />}
          </Fragment>
        );
      })}
    </>
  );
};
