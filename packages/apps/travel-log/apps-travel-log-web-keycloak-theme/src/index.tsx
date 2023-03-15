import React from 'react';
import { createRoot } from 'react-dom/client';
import { KeycloakTheme } from '@js-modules/web-react-components-keycloak-theme/src';
import { getKcContext } from 'keycloakify';

export const { kcContext } = getKcContext({
  mockPageId: 'register.ftl',
  mockData: [
    {
      pageId: 'register-user-profile.ftl',
      profile: {
        attributes: [
          {
            name: 'firstName',
            required: false,
            autocomplete: 'given-name',
            validators: {
              length: {
                max: '64',
              },
            },
          },
          {
            name: 'middleName',
            // eslint-disable-next-line no-template-curly-in-string
            displayName: '${middleName}',
            required: false,
            autocomplete: 'additional-name',
            validators: {
              length: {
                'ignore.empty.value': true,
                max: '64',
              },
              'person-name-prohibited-characters': {
                'ignore.empty.value': true,
              },
              'up-immutable-attribute': {},
              'up-attribute-required-by-metadata-value': {},
            },
          },
          {
            name: 'lastName',
            required: false,
            autocomplete: 'family-name',
            validators: {
              length: {
                max: '64',
              },
            },
          },
          {
            name: 'username',
            required: false,
            value: undefined,
            validators: {
              length: {
                min: '1',
                max: '64',
              },
            },
          },
          {
            name: 'phoneNumber',
            // eslint-disable-next-line no-template-curly-in-string
            displayName: '${phoneNumber}',
            required: false,
            autocomplete: 'tel',
            validators: {
              length: {
                'ignore.empty.value': true,
                max: '64',
              },
              'up-immutable-attribute': {},
              'up-attribute-required-by-metadata-value': {},
            },
          },
          {
            name: 'email',
            validators: {
              length: {
                max: '128',
              },
            },
          },
        ],
      },
    },
  ],
});
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<KeycloakTheme kcContext={kcContext!} />);
