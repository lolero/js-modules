import orderBy from 'lodash/orderBy';
import entries from 'lodash/entries';
import keyBy from 'lodash/keyBy';
import { countries as countriesList } from 'countries-list';

export type Country = {
  code: string;
  name: string;
  nameNative: string;
  continentCode: string;
  capital: string;
  flag: string;
  callingCodes: string[];
  languageCodes: string[];
  currencyCodes: string[];
};

export const countriesArray = orderBy(
  entries(countriesList).reduce(
    (countriesOptionsTemp: Country[], [countryCode, country]) => {
      return [
        ...countriesOptionsTemp,
        {
          code: countryCode,
          name: country.name,
          nameNative: country.native,
          continentCode: country.continent,
          capital: country.capital,
          flag: country.emoji,
          callingCodes: country.phone
            .split(',')
            .map((callingCode) => `+${callingCode}`),
          languageCodes: country.languages,
          currencyCodes: country.currency.split(','),
        },
      ];
    },
    [],
  ),
  'name',
  'asc',
);

export const countries = keyBy(countriesArray, 'code');
