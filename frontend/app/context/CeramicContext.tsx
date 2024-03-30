import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { CeramicClient } from '@ceramicnetwork/http-client';
// import { EthereumAuthProvider,ConnectNetwork } from '@self.id/web';
import { ethers,Provider } from 'ethers';
import { DIDSession } from 'did-session'
import type { AuthMethod } from '@didtools/cacao'
import { ComposeClient } from '@composedb/client'
import { EthereumWebAuth, getAccountId } from '@didtools/pkh-ethereum'
import { Web3 } from 'web3';

interface CeramicContextType {
  ceramic: CeramicClient | null;
  provider: ethers.Provider| null;
  connectToCeramic: () => Promise<void>;
  handleGetStarted:()=> Promise<void>
}

export const CeramicContext = createContext<CeramicContextType | undefined>(undefined);

interface CeramicProviderProps {
  children: ReactNode;
}

export const CeramicProvider = ({ children }: CeramicProviderProps) => {
  const [ceramic, setCeramic] = useState<CeramicClient | null>(null);
  const [provider, setProvider] = useState<ethers.Provider | null>(null);
  const [loading,setLoading] =useState(false);

  const connectToCeramic = async () => {
    setLoading(true)
    const ethProvider = window.ethereum;
    try {
        const addresses = await ethProvider.enable();
        const ceramicClient = new CeramicClient('http://localhost:7007');
        if (window.ethereum == null) {
          console.log("MetaMask not installed; using read-only defaults")
        }
      // Get the account ID from the Ethereum provider and the user's first account
        const accountId = await getAccountId(ethProvider, addresses[0]);
       // Create an instance of EthereumWebAuth
        const authProvider = await EthereumWebAuth.getAuthMethod(ethProvider, accountId);

        const loadSession = async (): Promise<DIDSession> => {
          // Check if there's a stored session in localStorage
          const sessionStr = localStorage.getItem('didsession');
          let session;

          if (sessionStr) {
             // If there's a stored session, load it from the string
            session = await DIDSession.fromSession(sessionStr);
          }

          if (!session || (session.hasSession && session.isExpired)) {
             // If there's no stored session or it has expired, create a new one
            session = await DIDSession.authorize(ethProvider);
            localStorage.setItem('didsession', session.serialize());
          }

           return session;
  };
    

      
    //   const connectedCeramic = await ceramicClient.authenticate(ethProvider);

    //   setCeramic(connectedCeramic);
    //   setProvider(web3Provider);
    } catch (error) {
      console.error('Error connecting to Ceramic:', error);
    }
  };

  const handleGetStarted = async()=>{
    setLoading(true)
    const ethProvider = window.ethereum;

// Request access to the user's Ethereum accounts
const addresses = await ethProvider.enable();

// Get the account ID from the Ethereum provider and the user's first account
const accountId = await getAccountId(ethProvider, addresses[0]);

// Create an instance of EthereumWebAuth
const authProvider = await EthereumWebAuth.getAuthMethod(ethProvider, accountId);

const loadSession = async (): Promise<DIDSession> => {
  // Check if there's a stored session in localStorage
  const sessionStr = localStorage.getItem('didsession');
  let session;

  if (sessionStr) {
    // If there's a stored session, load it from the string
    session = await DIDSession.fromSession(sessionStr);
  }

  if (!session || (session.hasSession && session.isExpired)) {
    // If there's no stored session or it has expired, create a new one
    session = await DIDSession.authorize(ethProvider);
    localStorage.setItem('didsession', session.serialize());
  }

  return session;
};


    
  }


  useEffect(() => {
    connectToCeramic();
  }, []);

  const contextValue: CeramicContextType = {
    ceramic,
    provider,
    connectToCeramic,
    handleGetStarted
  };

  return <CeramicContext.Provider value={contextValue}>{children}</CeramicContext.Provider>;
};