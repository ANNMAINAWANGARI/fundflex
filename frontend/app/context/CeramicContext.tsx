'use client'
import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { CeramicClient } from '@ceramicnetwork/http-client';
import { ethers } from 'ethers';
import { DIDSession } from 'did-session'
import type { AuthMethod } from '@didtools/cacao'
import { ComposeClient } from '@composedb/client'
import { EthereumWebAuth, getAccountId } from '@didtools/pkh-ethereum'

import { RuntimeCompositeDefinition } from "@composedb/types";


interface CeramicContextType {
  ceramic: CeramicClient | null;
  provider: ethers.Provider| null;
  connectToCeramic ?: () => Promise<void>;
  walletAddress:string|null;
  loggedIn:boolean;
  disconnect:()=>Promise<void>
  runner:ethers.ContractRunner|null|undefined
  
  
}
const ceramicClient = new CeramicClient('http://localhost:7007');
const isAuthenticated =false;

export const CeramicContext = createContext<CeramicContextType | undefined>(undefined);

interface CeramicProviderProps {
  children: ReactNode;
}

export const CeramicProvider = ({ children }: CeramicProviderProps) => {
  let EthRunner;
  const [ceramic, setCeramic] = useState<CeramicClient | null>(null);
  const [provider, setProvider] = useState<ethers.Provider | null>(null);
  const [loading,setLoading] =useState(false);
  //const [walletAddress,setWalletAddress] = useState(localStorage.getItem('walletAddress'))
  const [loggedIn, setLoggedIn]=useState(localStorage.getItem('didsession')!==null)
  const [stateAuthMethod,setstateAuthMethod] = useState<AuthMethod|null>(null)
  const [runner,setRunner] = React.useState< ethers.ContractRunner|null|undefined>(EthRunner)
  const walletAddress = localStorage.getItem('walletAddress') 

  
  const connectToCeramic = async () => {
    setLoading(true)
    const ethProvider =await window.ethereum;
    const addresses = await ethProvider.enable();
    const ceramicClient = new CeramicClient('http://localhost:7007');
    const accountId = await getAccountId(ethProvider, addresses[0])
    const authMethod = await EthereumWebAuth.getAuthMethod(ethProvider, accountId)
   
    
    console.log('ceramicclient',ceramicClient)
    try {
      console.log('authmethodinstate',stateAuthMethod)
      if (window.ethereum == null) {
        console.log("MetaMask not installed; please install Metamask")
      }
    const loadSession = async(authMethod: AuthMethod):Promise<DIDSession> => {
      console.log('authmethodinloadsession',authMethod)
      const sessionStr = localStorage.getItem('didsession')
      let session
      if (sessionStr) {
        session = await DIDSession.fromSession(sessionStr)
      }
      if(!session || (session.hasSession && session.isExpired)) {
        session = await DIDSession.authorize(authMethod,{resources: ['ceramic://localhost:7007'],})
        localStorage.setItem('didsession', session.serialize())
      }
      return session
    }

    const session = await loadSession(authMethod)
    ceramicClient.did = session.did
    setCeramic(ceramicClient)
    console.log('did',session.did)
      
     //before ceramic writes, check if session is still valid, if expired, create new
    if (session.isExpired) {
      const session = await loadSession(authMethod)
      ceramicClient.did = session.did
      console.log('did',session.did)
      setCeramic(ceramicClient)
    }  
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    console.log("accounts, accountId", accounts, accountId)
    setLoggedIn(true);
    //setWalletAddress(accountId.address)
    localStorage.setItem('walletAddress',accountId.address)
    setLoading(false)
    
    const result = await new ethers.BrowserProvider(window.ethereum).getSigner();
    console.log('resulllt',result)
    EthRunner = result;
    setRunner(result)
    localStorage.setItem('runner', JSON.stringify(result))
    
   
    }catch (error) {
      console.error('Error connecting to Ceramic:', error);
    }
    
  };

  const connectWallet = async()=>{
    const ethProvider = window.ethereum;
    const addresses = await ethProvider.enable({
      method: "eth_requestAccounts",
    });
    const accountId = await getAccountId(ethProvider,addresses[0]);
    const authMethod = await EthereumWebAuth.getAuthMethod(ethProvider,accountId);
    return accountId;
  }

  const disconnect = async()=>{
    if(localStorage.getItem('didsession')){
      localStorage.removeItem('didsession')
      localStorage.removeItem('walletAddress')
      setLoggedIn(false)
    }
   
  }

  const fetchRunner = async()=>{
    const provider = new ethers.BrowserProvider(window.ethereum);
    const result = await provider.getSigner();
    console.log('res',result)
    //setRunner(result)
    return result
}

  

  


  useEffect(() => {
    //connectToCeramic();
  }, []);

  const contextValue: CeramicContextType = {
    ceramic,
    provider,
    connectToCeramic,
    walletAddress,
    loggedIn,
    disconnect,
    runner
    
   
  };

  return <CeramicContext.Provider value={contextValue}>{children}</CeramicContext.Provider>;
};

export const useMyContext = ()=>{
  const context = useContext(CeramicContext);
  if(!context){
    throw new Error('useMyContext must be used within CeramicContextProvider')
  }
  return context;
}