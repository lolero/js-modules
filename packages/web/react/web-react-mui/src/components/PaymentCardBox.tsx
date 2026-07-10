import { faCreditCard } from '@fortawesome/free-regular-svg-icons/faCreditCard';
import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ceil from 'lodash/ceil';
import isEmpty from 'lodash/isEmpty';
import type React from 'react';
import { useCallback, useMemo } from 'react';
import type { FormValidator } from '@js-modules/common-react-utils';
import type { PaymentCard } from '@js-modules/common-utils-general';
import type { FormUtilsWeb } from '../hooks/hooksMaterialUi/useFormUtilsWeb';
import type { FormTextFieldProps } from '../types/form.types';
import { MuiFaIcon } from './MuiFaIcon';

export type PaymentCardBoxProps = {
  sx?: BoxProps['sx'];
  renderFields?: (keyof PaymentCard)[];
  paymentCardTemp: PaymentCard;
  changeFieldCallback: FormUtilsWeb<PaymentCard>['changeFieldCallback'];
  blurFieldCallback: FormUtilsWeb<PaymentCard>['blurFieldCallback'];
  formErrors: FormValidator<PaymentCard>['formErrors'];
  isFormFieldsDisabled: boolean;
  textFieldProps?: {
    cardHolderName?: FormTextFieldProps;
    cardNumber?: FormTextFieldProps;
    expirationDate?: FormTextFieldProps;
    cvv?: FormTextFieldProps;
  };
};

/**
 * Form fieldset for a payment card (holder name, number, expiry, CVV), wired to
 * the web form utils for change/blur handling and error display.
 * @param props - Component props.
 * @param props.sx - `sx` overrides for the container.
 * @param props.renderFields - Subset of card fields to render (all when omitted).
 * @param props.paymentCardTemp - Current (unsaved) payment card form values.
 * @param props.changeFieldCallback - Field change handler from the form utils.
 * @param props.blurFieldCallback - Field blur handler from the form utils.
 * @param props.formErrors - Validation errors keyed by field.
 * @param props.isFormFieldsDisabled - Whether the fields are disabled.
 * @param props.textFieldProps - Per-field `TextField` prop overrides.
 * @returns The payment card fieldset.
 */
export function PaymentCardBox({
  sx,
  renderFields = [],
  paymentCardTemp,
  changeFieldCallback,
  blurFieldCallback,
  formErrors,
  isFormFieldsDisabled,
  textFieldProps = {},
}: PaymentCardBoxProps): React.ReactNode {
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
          slotProps={{
            htmlInput: { 'data-key': 'cardNumber' },
          }}
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
          slotProps={{
            htmlInput: { 'data-key': 'cardHolderName' },
          }}
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
              slotProps={{
                htmlInput: { 'data-key': 'expirationDate' },
              }}
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
              slotProps={{
                input: { endAdornment: <MuiFaIcon icon={faCreditCard} /> },
                htmlInput: { 'data-key': 'cvv' },
              }}
              {...textFieldProps.cvv}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
