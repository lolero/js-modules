import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import { MetaMaskInpageProvider } from '@metamask/providers';

const Web3TextBox: React.FunctionComponent = () => {
  const checkMetamaskProvider = async () => {
    const metamaskProvider = (await detectEthereumProvider({
      mustBeMetaMask: true,
    })) as MetaMaskInpageProvider;
    console.log(
      'metamaskProvider.selectedAddress:',
      metamaskProvider.selectedAddress,
    );
    console.log(
      'metamaskProvider.isConnected:',
      metamaskProvider.isConnected(),
    );
  };

  const checkMetamaskConnection = async () => {
    const metamaskProvider = (await detectEthereumProvider({
      mustBeMetaMask: true,
    })) as MetaMaskInpageProvider;

    // const permissions = await metamaskProvider.request({
    //   method: 'wallet_requestPermissions',
    // });
    // console.log('permissions:', permissions);

    const accounts = await metamaskProvider.request({
      method: 'eth_requestAccounts',
    });
    console.log('accounts:', accounts);
  };

  const checkWeb3Provider = async () => {
    const metamaskProvider = (await detectEthereumProvider({
      mustBeMetaMask: true,
    })) as MetaMaskInpageProvider;
    const web3Provider = new ethers.providers.Web3Provider(
      metamaskProvider as unknown as ethers.providers.ExternalProvider,
    );

    const signer = web3Provider.getSigner();
    const network = await web3Provider.getNetwork();
    console.log('signer:', signer);
    console.log('network:', network);
    console.log('isConnected:', metamaskProvider.isConnected());
  };

  useEffect(() => {
    async function asyncFunction() {
      const metamaskProvider = (await detectEthereumProvider({
        mustBeMetaMask: true,
      })) as MetaMaskInpageProvider;

      metamaskProvider.on('connect', (t) => {
        console.log('connect:', t);
      });
      metamaskProvider.on('disconnect', (t) => {
        console.log('disconnect:', t);
      });
      metamaskProvider.on('accountsChanged', (t) => {
        console.log('accountsChanged:', t);
      });
      metamaskProvider.on('chainChanged', (t) => {
        console.log('chainChanged:', t);
      });
      metamaskProvider.on('message', (t) => {
        console.log('message:', t);
      });
    }
    asyncFunction();
  }, []);

  return (
    <Box>
      <Box>
        <Button onClick={checkMetamaskProvider}>Check Metamask Provider</Button>
      </Box>
      <Box>
        <Button onClick={checkMetamaskConnection}>
          Check Metamask Connection
        </Button>
      </Box>
      <Box>
        <Button onClick={checkWeb3Provider}>Check Web3 Provider</Button>
      </Box>
    </Box>
  );
};

export default Web3TextBox;
