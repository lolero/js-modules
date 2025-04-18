import React, { useCallback, useMemo } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { faCreditCard } from '@fortawesome/free-regular-svg-icons/faCreditCard';
import { FormUtils, FormValidator } from '@js-modules/web-react-hooks';
import { PaymentCard } from '@js-modules/common-utils-general';
import isEmpty from 'lodash/isEmpty';
import ceil from 'lodash/ceil';
import { MuiFaIcon } from './MuiFaIcon';
import { FormTextFieldProps } from '../types/formTextFieldProps.types';

export type PaymentCardBoxProps = {
  sx?: BoxProps['sx'];
  renderFields?: (keyof PaymentCard)[];
  paymentCardTemp: PaymentCard;
  changeFieldCallback: FormUtils<PaymentCard>['changeFieldCallback'];
  blurFieldCallback: FormUtils<PaymentCard>['blurFieldCallback'];
  formErrors: FormValidator<PaymentCard>['formErrors'];
  isFormFieldsDisabled: boolean;
  textFieldProps?: {
    cardHolderName?: FormTextFieldProps;
    cardNumber?: FormTextFieldProps;
    expirationDate?: FormTextFieldProps;
    cvv?: FormTextFieldProps;
  };
};

export const PaymentCardBox: React.FunctionComponent<PaymentCardBoxProps> = ({
  sx,
  renderFields = [],
  paymentCardTemp,
  changeFieldCallback,
  blurFieldCallback,
  formErrors,
  isFormFieldsDisabled,
  textFieldProps = {},
}) => {
  const cardNumberDisplayStr = useMemo(() => {
    const digitGroupSize = 4;
    const digitGroupCount = ceil(paymentCardTemp.cardNumber.length / 4);
    const digitGroups = new Array(digitGroupCount)
      .fill(null)
      .map((nullValue, digitGroupIndex) => {
        const digitGroupTemp = paymentCardTemp.cardNumber.slice(
          digitGroupIndex * digitGroupSize,
          (digitGroupIndex + 1) * digitGroupSize,
        );

        return digitGroupTemp;
      });

    const cardNumberDisplayStrTemp = digitGroups.join(' ');
    return cardNumberDisplayStrTemp;
  }, [paymentCardTemp.cardNumber]);

  const changeCardNumberCallback = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      e.target.value = e.target.value.replaceAll(' ', '');
      changeFieldCallback(e);
    },
    [changeFieldCallback],
  );

  return (
    <Box sx={sx}>
      {(isEmpty(renderFields) || renderFields.includes('cardNumber')) && (
        <TextField
          required
          disabled={isFormFieldsDisabled}
          label="Card number"
          placeholder="0000 0000 0000 0000"
          value={cardNumberDisplayStr}
          onChange={changeCardNumberCallback}
          onBlur={blurFieldCallback}
          error={!!formErrors.cardNumber?.length}
          helperText={formErrors.cardNumber?.join(', ')}
          inputProps={{
            'data-key': 'cardNumber',
          }}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...textFieldProps.cardNumber}
        />
      )}
      {(isEmpty(renderFields) || renderFields.includes('cardHolderName')) && (
        <TextField
          required
          disabled={isFormFieldsDisabled}
          label="Cardholder name"
          value={paymentCardTemp.cardHolderName}
          onChange={changeFieldCallback}
          onBlur={blurFieldCallback}
          error={!!formErrors.cardHolderName?.length}
          helperText={formErrors.cardHolderName?.join(', ')}
          inputProps={{
            'data-key': 'cardHolderName',
          }}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...textFieldProps.cardHolderName}
        />
      )}
      <Grid container spacing={2}>
        {(isEmpty(renderFields) || renderFields.includes('expirationDate')) && (
          <Grid
            size={{
              xs: 12,
              sm: 6,
            }}
          >
            <TextField
              required
              disabled={isFormFieldsDisabled}
              fullWidth
              label="Expiry date"
              placeholder="MM/YY"
              value={paymentCardTemp.expirationDate}
              onChange={changeFieldCallback}
              onBlur={blurFieldCallback}
              error={!!formErrors.expirationDate?.length}
              helperText={formErrors.expirationDate?.join(', ')}
              inputProps={{
                'data-key': 'expirationDate',
              }}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...textFieldProps.expirationDate}
            />
          </Grid>
        )}
        {(isEmpty(renderFields) || renderFields.includes('cvv')) && (
          <Grid
            size={{
              xs: 12,
              sm: 6,
            }}
          >
            <TextField
              required
              type="password"
              disabled={isFormFieldsDisabled}
              fullWidth
              label="CVV"
              value={paymentCardTemp.cvv}
              onChange={changeFieldCallback}
              onBlur={blurFieldCallback}
              error={!!formErrors.cvv?.length}
              helperText={formErrors.cvv?.join(', ')}
              InputProps={{
                endAdornment: <MuiFaIcon icon={faCreditCard} />,
              }}
              // eslint-disable-next-line react/jsx-no-duplicate-props
              inputProps={{
                'data-key': 'cvv',
              }}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...textFieldProps.cvv}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
