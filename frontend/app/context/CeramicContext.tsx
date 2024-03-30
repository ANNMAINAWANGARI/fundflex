'use client'
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { CeramicClient } from '@ceramicnetwork/http-client';
import { ethers } from 'ethers';
import { DIDSession } from 'did-session'
import type { AuthMethod } from '@didtools/cacao'
import { ComposeClient } from '@composedb/client'
import { EthereumWebAuth, getAccountId } from '@didtools/pkh-ethereum'


interface CeramicContextType {
  ceramic: CeramicClient | null;
  provider: ethers.Provider| null;
  connectToCeramic: () => Promise<void>;
  
}

export const CeramicContext = createContext<CeramicContextType | undefined>(undefined);

interface CeramicProviderProps {
  children: ReactNode;
}

export const CeramicProvider = ({ children }: CeramicProviderProps) => {
  const [ceramic, setCeramic] = useState<CeramicClient | null>(null);
  const [provider, setProvider] = useState<ethers.Provider | null>(null);
  const [loading,setLoading] =useState(false);
  const [stateAuthMethod,setstateAuthMethod] = useState<AuthMethod|null>(null)



  const connectToCeramic = async () => {
    setLoading(true)
    
    try {
      //setstateAuthMethod(authMethod)
      console.log('authmethodinstate',stateAuthMethod)
      if (window.ethereum == null) {
          console.log("MetaMask not installed; using read-only defaults")
      }
      const ethProvider =await window.ethereum;
    const addresses = await ethProvider.enable();
    const ceramicClient = new CeramicClient('http://localhost');
    const accountId = await getAccountId(ethProvider, addresses[0])
    const authMethod = await EthereumWebAuth.getAuthMethod(ethProvider, accountId)
    console.log('ceramicclient',ceramicClient)
      
      const loadSession = async(authMethod: AuthMethod):Promise<DIDSession> => {
        console.log('authmethodinloadsession',authMethod)
        const sessionStr = localStorage.getItem('didsession')
        let session
        if (sessionStr) {
          session = await DIDSession.fromSession(sessionStr)
        }
        if (!session || (session.hasSession && session.isExpired)) {
          session = await DIDSession.authorize(authMethod,{resources: ['ceramic://localhost:7007'],})
          localStorage.setItem('didsession', session.serialize())
        }
        return session
      }

      const session = await loadSession(authMethod)
      ceramicClient.did = session.did
      


     //before ceramic writes, check if session is still valid, if expired, create new
      if (session.isExpired) {
         const session = await loadSession(authMethod)
        ceramicClient.did = session.did
      }
    } catch (error) {
      console.error('Error connecting to Ceramic:', error);
    }
  };

  


  useEffect(() => {
    connectToCeramic();
  }, []);

  const contextValue: CeramicContextType = {
    ceramic,
    provider,
    connectToCeramic,
   
  };

  return <CeramicContext.Provider value={contextValue}>{children}</CeramicContext.Provider>;
};