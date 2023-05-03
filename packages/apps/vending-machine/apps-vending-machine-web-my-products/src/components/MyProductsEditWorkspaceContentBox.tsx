import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import {
  useNodeProductsGetOne,
  useNodeProductsUpdateOneWhole,
} from '@js-modules/apps-vending-machine-common-store-redux';
import { usePrevious } from '@js-modules/common-react-hooks';
import {
  MyModules,
  myModulesRoutesMetadata,
} from '@js-modules/apps-vending-machine-common-constants';

type MyProductsEditWorkspaceContentBoxProps = {
  nodeProductPk: string;
};

export const MyProductsEditWorkspaceContentBox: React.FC<
  MyProductsEditWorkspaceContentBoxProps
> = ({ nodeProductPk }) => {
  const {
    request: getNodeProductRequest,
    entity: nodeProduct,
    callback: nodeProductsGetOneCallback,
  } = useNodeProductsGetOne(nodeProductPk);
  const getNodeProductRequestPrevious = usePrevious(getNodeProductRequest);

  const navigate = useNavigate();
  const goBackCallback = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const [name, setName] = useState(nodeProduct?.name ?? '');
  const [nameError, setNameError] = useState<string | null>(null);
  const [cost, setCost] = useState(nodeProduct?.cost ?? 0);
  const [amountAvailable, setAmountAvailable] = useState(
    nodeProduct?.amountAvailable ?? 0,
  );

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

  const { request: updateProductRequest, callback: updateProductCallback } =
    useNodeProductsUpdateOneWhole();
  const updateProductRequestPrevious = usePrevious(updateProductRequest);

  const isPending = useMemo(() => {
    return getNodeProductRequest?.isPending || updateProductRequest?.isPending;
  }, [getNodeProductRequest?.isPending, updateProductRequest?.isPending]);

  const submitCallback = useCallback(() => {
    if (name === '') {
      setNameError('Please add a name for the product');
      return;
    }

    const nodeProductUpdated = { ...nodeProduct! };
    nodeProductUpdated.name = name;
    nodeProductUpdated.cost = cost;
    nodeProductUpdated.amountAvailable = amountAvailable;
    updateProductCallback(nodeProductPk, nodeProductUpdated);
  }, [
    amountAvailable,
    cost,
    updateProductCallback,
    name,
    nodeProduct,
    nodeProductPk,
  ]);

  useEffect(() => {
    nodeProductsGetOneCallback();
  }, [nodeProductsGetOneCallback]);

  useEffect(() => {
    if (
      getNodeProductRequestPrevious?.isPending &&
      getNodeProductRequest?.isOk
    ) {
      setName(nodeProduct!.name);
      setCost(nodeProduct!.cost);
      setAmountAvailable(nodeProduct!.amountAvailable);
    }
  }, [
    getNodeProductRequest?.isOk,
    getNodeProductRequestPrevious?.isPending,
    nodeProduct,
  ]);

  useEffect(() => {
    if (updateProductRequestPrevious?.isPending && updateProductRequest?.isOk) {
      navigate(myModulesRoutesMetadata[MyModules.myProducts].path);
    }
  }, [
    updateProductRequest?.isOk,
    updateProductRequestPrevious?.isPending,
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
          id="update-product-name"
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
          id="update-product-cost"
          label="Cost"
          name="Cost"
          type="text"
          value={cost}
          onChange={changeCostCallback}
          required
          disabled={isPending}
        />
        <TextField
          id="update-product-amountAvailable"
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
          Update product
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
