import orderBy from 'lodash/orderBy';
import entries from 'lodash/entries';
import keyBy from 'lodash/keyBy';
import values from 'lodash/values';
import { countries as countriesList } from 'countries-list';

export type CallingCode = {
  callingCode: string;
  countryCodes: string[];
};

const callingCodesRandom: Record<string, CallingCode> = entries(
  countriesList,
).reduce(
  (
    callingCodesRandomTemp1: Record<string, CallingCode>,
    [countryCode, country],
  ) => {
    const callingCodes = country.phone
      .split(',')
      .map((callingCode) => `+${callingCode}`)
      .reduce((callingCodesTemp, callingCode) => {
        return {
          ...callingCodesTemp,
          [callingCode]: {
            callingCode,
            countryCodes: orderBy([
              ...(callingCodesRandomTemp1[callingCode]?.countryCodes ?? []),
              countryCode,
            ]),
          },
        };
      }, {});

    return {
      ...callingCodesRandomTemp1,
      ...callingCodes,
    };
  },
  {},
);

export const callingCodesArray = orderBy(
  values(callingCodesRandom),
  'callingCode',
  'asc',
);

export const callingCodes = keyBy(callingCodesArray, 'callingCode');
