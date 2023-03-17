import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import {
  NodeProductsCreateOneRequestAction,
  useNodeProductsCreateOne,
} from '@js-modules/apps-vending-machine-common-store-redux';
import { usePrevious } from '@js-modules/common-react-hooks';
import {
  MyModules,
  myModulesRoutesMetadata,
} from '@js-modules/apps-vending-machine-common-constants';

export const MyProductsCreateNewWorkspaceContentBox: React.FC = () => {
  const navigate = useNavigate();
  const goBackCallback = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState<string | null>(null);
  const [cost, setCost] = useState(0);
  const [amountAvailable, setAmountAvailable] = useState(0);

  const changeNameCallback = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setName(e.target.value);
      setNameError(null);
    },
    [],
  );

  const changeCostCallback = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const numberValue = Math.max(0, Number(e.target.value) ?? cost);
      setCost(numberValue);
    },
    [cost],
  );

  const changeAmountAvailableCallback = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const numberValue = Math.max(
        0,
        Number(e.target.value) ?? amountAvailable,
      );
      setAmountAvailable(numberValue);
    },
    [amountAvailable],
  );

  const { request: createProductRequest, callback: createProductCallback } =
    useNodeProductsCreateOne();
  const createProductRequestPrevious = usePrevious(createProductRequest);

  const isPending = useMemo(() => {
    return createProductRequest?.isPending;
  }, [createProductRequest?.isPending]);

  const submitCallback = useCallback(() => {
    if (name === '') {
      setNameError('Please add a name for the product');
      return;
    }

    const nodeProduct: NodeProductsCreateOneRequestAction['requestMetadata']['entity'] =
      {
        name,
        cost,
        amountAvailable,
      };
    createProductCallback(nodeProduct);
  }, [amountAvailable, cost, createProductCallback, name]);

  useEffect(() => {
    if (createProductRequestPrevious?.isPending && createProductRequest?.isOk) {
      navigate(myModulesRoutesMetadata[MyModules.myProducts].path);
    }
  }, [
    createProductRequest?.isOk,
    createProductRequestPrevious?.isPending,
    navigate,
  ]);

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          mb: 1,
        }}
      >
        <TextField
          sx={{
            mb: 2,
          }}
          id="new-product-name"
          label="Name"
          name="Name"
          type="text"
          value={name}
          onChange={changeNameCallback}
          autoFocus
          required
          error={!!nameError}
          helperText={nameError || ''}
          disabled={isPending}
        />
        <TextField
          sx={{
            mb: 2,
          }}
          id="new-product-cost"
          label="Cost"
          name="Cost"
          type="text"
          value={cost}
          onChange={changeCostCallback}
          required
          disabled={isPending}
        />
        <TextField
          id="new-product-amountAvailable"
          label="Amount available"
          name="Amount available"
          type="text"
          value={amountAvailable}
          onChange={changeAmountAvailableCallback}
          required
          disabled={isPending}
        />
      </Box>
      <Box>
        <Button
          sx={{
            mr: 1,
          }}
          variant="contained"
          onClick={submitCallback}
          endIcon={isPending && <CircularProgress size={20} />}
          disabled={isPending}
        >
          Create product
        </Button>
        <Button
          variant="outlined"
          onClick={goBackCallback}
          disabled={isPending}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};
