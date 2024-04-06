'use client'
import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { CeramicClient } from '@ceramicnetwork/http-client';
import { ethers } from 'ethers';
import { DIDSession } from 'did-session'
import type { AuthMethod } from '@didtools/cacao'
import { ComposeClient } from '@composedb/client'
import { EthereumWebAuth, getAccountId } from '@didtools/pkh-ethereum'
import {definition} from '@/__generated__/definition'
import { RuntimeCompositeDefinition } from "@composedb/types";
import { DID, type DagJWS } from "dids";


interface CeramicContextType {
  ceramic: CeramicClient | null|string;
  provider: ethers.Provider| null;
  connectToCeramic ?: () => Promise<void>;
  walletAddress:string|null;
  loggedIn:boolean;
  disconnect:()=>Promise<void>
  runner:ethers.ContractRunner|null|undefined
  compose:ComposeClient;
  findEvent: ()=>Promise<void>
  createClaim:()=>Promise<void>
  
  
}
type EventString ="LoanCreated"| "LoanLend"| "LoanRepay";
type ObjectType = {
  LoanCreated: string;
  LoanLend: string;
  LoanRepay: string;
  
};
interface Event {
  recipient: string;
  verified?: boolean;
  timestamp: string;
  jwt: string;
  step: EventString;
  id: string;
  issuer: {
    id: string;
  };
}


  



export const CeramicContext = createContext<CeramicContextType | undefined>(undefined);

interface CeramicProviderProps {
  children: ReactNode;
}
const ceramicClient = new CeramicClient('http://localhost:7007');
const compose = new ComposeClient({
  ceramic: ceramicClient,
  definition: definition as RuntimeCompositeDefinition,
});

export const CeramicProvider = ({ children }: CeramicProviderProps) => {
  let EthRunner;
  const [ceramic, setCeramic] = useState<CeramicClient | null>(null);
  const [provider, setProvider] = useState<ethers.Provider | null>(null);
  const [loading,setLoading] =useState(false);
  const [walletAddress,setWalletAddress] = useState<string|null>('')
  const [loggedIn, setLoggedIn]=useState(false)
  const [stateAuthMethod,setstateAuthMethod] = useState<AuthMethod|null>(null)
  const [runner,setRunner] = React.useState< ethers.ContractRunner|null|undefined>(EthRunner)
  const [eligible,setEligible]= useState(false)
  const [code,setCode] = useState('')
  const [event,setEvent] = useState<EventString>()
  const [attesting, setAttesting] = useState(false);
  const [share, setShare] = useState(false);
  const [badgeArray, setBadgeArray] = useState<Event[] | undefined>();
  const [pointSum, setPointSum] = useState<number>();
  const [earned, setEarned] = useState<{ value: number; event: string }>();
  const [chainId,setChainId] = useState({})



  console.log('chainIddddd',chainId)
  const connectToCeramic = async () => {
    setLoading(true)
    const ethProvider =await window.ethereum;
    const addresses = await ethProvider.enable();
    const accountId = await getAccountId(ethProvider, addresses[0])
    const authMethod = await EthereumWebAuth.getAuthMethod(ethProvider, accountId)

   
    
    console.log('ceramicclient',ceramicClient)
    try {
      
      setChainId(accountId.chainId)
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
    setWalletAddress(accounts[0] )
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
const getDid = async () => {
  try {
    const result = await fetch("/api/did", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    type returnType = {
      err?: unknown;
      did: string;
    };
    const finalDid = (await result.json()) as returnType;
    console.log(finalDid);
    return finalDid.did;
  } catch (e) {
    console.log(e);
  }
}

const createEligibility = async (e: string) => {
  const did = await getDid();
  const data = await compose.executeQuery<{
    node: {
      ethDenverAttendanceList: {
        edges: {
          node: Event;
        }[];
      };
    };
  }>(`
      query {
        node(id: "${`did:pkh:eip155:${chainId}:${walletAddress?.toLowerCase()}`}") {
        ... on CeramicAccount {
           ethDenverAttendanceList(
            filters: {
              and: [
                { where: { step: { equalTo: "${e}" } } }
                { and: { where: { issuer: { equalTo: "${did}" } } } }
              ]
            }
           
           first: 1) {
            edges {
              node {
                id
                recipient
                timestamp
                jwt
                step
              }
            }
           }
          }
        }
      }
    `);
  console.log(data);
  if (
    data.data &&
    data.data.node.ethDenverAttendanceList.edges.length === 0
  ) {
    setEligible(true);
  }
};
const getPoints = async () => {
  try {
    const did = await getDid();
    const exists = await compose.executeQuery<{
      node: {
        pointClaimsList: {
          edges: {
            node: {
              id: string;
              data: {
                value: number;
                refId: string;
                timestamp: string;
                context: string;
              }[];
              issuer: {
                id: string;
              };
              holder: {
                id: string;
              };
              issuer_verification: string;
            };
          }[];
        };
      } | null;
    }>(`
        query CheckPointClaims {
          node(id: "${`did:pkh:eip155:${chainId}:${walletAddress?.toLowerCase()}`}") {
            ... on CeramicAccount {
                  pointClaimsList(filters: { where: { issuer: { equalTo: "${did}" } } }, first: 1) {
                    edges {
                      node {
                          id
                          data {
                            value
                            refId
                            timestamp
                            context
                          }
                          issuer {
                              id
                          }
                          holder {
                              id
                          }
                          issuer_verification
                       }
                    }
                  }
                }
              }
            }
        `);
    console.log(exists, 'point attestation');
    if (exists?.data?.node?.pointClaimsList?.edges.length) {
      const dataToVerify = exists?.data?.node?.pointClaimsList?.edges[0]?.node?.issuer_verification;
      const json = Buffer.from(dataToVerify!, "base64").toString();
      
      const parsed = JSON.parse(json) as DagJWS;
      
      // @ts-ignore
      const newDid = new DID({ resolver: KeyResolver.getResolver() });
      const result = parsed.payload
        ? await newDid.verifyJWS(parsed)
        : undefined;
      const didFromJwt = result?.payload
        ? result?.didResolutionResult.didDocument?.id
        : undefined;
      if (didFromJwt === did) {
        const data = result?.payload;
        
        const sumValues = data?.reduce((acc: number, curr: { value: number }) => acc + curr.value, 0);
        setPointSum(sumValues as number | undefined);
      }
    }
  }
  catch (e) {
    console.log(e);
  }
}
const issuePoint = async (value: number, context: string, event: EventString,refId?: string) => {
 
  
  const did = await getDid();
  const result = await fetch("/api/issue", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      walletAddress,
      value,
      context,
      chainId,
      refId: refId ?? "",
    }),
  });
  type returnType = {
    err?: unknown;
    completePoint: {
      dataToAppend: {
        value: number;
        timestamp: string;
        context: string;
        refId: string;
      }[];
      issuer_verification: string;
      streamId: string;
    }

  };
  const finalPoint = (await result.json()) as returnType;
  console.log(finalPoint);
  if (finalPoint.err) {
    alert(finalPoint.err);
    return;
  }
  console.log('Creating new point attestation')
  let data;
  if (finalPoint.completePoint.dataToAppend.length === 1) {
    data = await compose.executeQuery(`
    mutation  {
      createPointClaims(input: {
        content: {
          issuer: "${did}"
          data: ${JSON.stringify(finalPoint.completePoint.dataToAppend).replace(/"([^"]+)":/g, '$1:')}
          issuer_verification: "${finalPoint.completePoint.issuer_verification}"
        }
      })
      {
        document {
          id
          holder {
            id
          }
          issuer {
            id
          }
          issuer_verification
          data {
            value
            refId
            timestamp
            context
          }
        }
      }
    }
    `);
  } else {
    data = await compose.executeQuery<{
      updatePointClaims: {
        pointClaims: {
          id: string;
          holder: {
            id: string;
          };
          issuer: {
            id: string;
          };
          data: {
            value: number;
            refId: string;
            timestamp: string;
            context: string;
          }[];
          issuer_verification: string;
        };
      };
    }>(`
    mutation {
      updatePointClaims(
        input: {
          id: "${finalPoint.completePoint.streamId}",
          content: {
              data: ${JSON.stringify(finalPoint.completePoint.dataToAppend).replace(/"([^"]+)":/g, '$1:')}
              issuer_verification: "${finalPoint.completePoint.issuer_verification}"
          }
        }
      ) {
        pointClaims: document {
          id
          holder {
            id
          }
          issuer {
            id
          }
          data {
              value
              refId
              timestamp
              context
           }
          issuer_verification
        }
      }
    }
  `);
  }
  console.log(data, 'success issuing point');
  setEarned({ value, event });
  return finalPoint;
}

const getRecords = async () => {
  await getPoints();
  const data = await compose.executeQuery<{
    node: {
      ethDenverAttendanceList: {
        edges: {
          node: Event;
        }[];
      };
    };
  }>(`
      query {
        node(id: "${`did:pkh:eip155:${chainId}:${walletAddress?.toLowerCase()}`}") {
        ... on CeramicAccount {
           ethDenverAttendanceList(first: 20) {
              edges {
                node {
                  id
                  recipient
                  timestamp
                  jwt
                  step
                }
              }
            }
          }
        }
      }
    `);
  console.log(data);
  const keepTrack = new Set();
  const tempArray = [];
  const sharedObj: ObjectType = {
    LoanCreated: "",
    LoanLend: "",
    LoanRepay: "",
  };
  if (
    data.data &&
    
    (data.data as any).node.ethDenverAttendanceList !== null
  ) {
    for (const el of data.data.node.ethDenverAttendanceList.edges) {
      const event = el.node;
      try {
        const json = Buffer.from(event.jwt, "base64").toString();
        
        const parsed = JSON.parse(json) as DagJWS;
        
        // @ts-ignore
        const newDid = new DID({ resolver: KeyResolver.getResolver() });
        const result = parsed.payload
          ? await newDid.verifyJWS(parsed)
          : undefined;
        const didFromJwt = result?.payload
          ? result.didResolutionResult.didDocument?.id
          : undefined;
        const did = await getDid();
        if (
          didFromJwt ===
          did &&
          result?.payload &&
          result.payload.timestamp === event.timestamp &&
          result.payload.event === event.step &&
          result.payload.recipient === walletAddress?.toLowerCase()
        ) {
          event.verified = true;
          keepTrack.add(event.step);
          tempArray.push(event);
          event.step === "LoanCreated"
            ? (sharedObj.LoanCreated = event.id)
            : event.step === "LoanLend"
              ? (sharedObj.LoanLend = event.id)
              : event.step === "LoanRepay"
                ? (sharedObj.LoanRepay = event.id)
                    : null;
        }
      } catch (e) {
        console.log(e);
      }
    }
    // console.log(keepTrack.size);
    if (keepTrack.size === 3 || keepTrack.size === 8) {
      console.log(keepTrack);
      console.log("All badges have been collected");
      const itemToPush = await createFinal(sharedObj, keepTrack.size);
      itemToPush && tempArray.push(itemToPush);
    }
    //order badgeArray by timestamp
    tempArray.sort((a, b) => {
      return (
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    });
    console.log(tempArray);
    setBadgeArray(tempArray);
  }
};
const createFinal = async (
  sharedObj: ObjectType,
  size: number,
): Promise<Event | undefined> => {
  setAttesting(true);
  const did = await getDid();
  const result = await fetch("/api/final", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      recipient: walletAddress,
      LoanCreated: sharedObj.LoanCreated ? sharedObj.LoanCreated : "",
      LoanLend: sharedObj.LoanLend ? sharedObj.LoanLend : "",
      LoanRepay: sharedObj.LoanRepay ? sharedObj.LoanRepay : "",
      event: size === 3 ? "AllBadges" : "ThreeBadges",
    }),
  });
  type returnType =  {
    err?: unknown;
    recipient: string;
    jwt: string;
    LoanCreated: string;
    LoanLend: string;
    LoanRepay: string;
    timestamp: string;
    event: string;
  };
  const finalClaim = (await result.json()) as returnType;
  console.log(finalClaim);
  if (finalClaim.err) {
    setAttesting(false);
    alert(finalClaim.err);
    return undefined;
  }
  const whichEvent = size === 3 ? "AllBadges" : "ThreeBadges";
  console.log(whichEvent);

  const data = await compose.executeQuery<{
    createEthDenverAttendance: {
      document: Event;
    };
  }>(`
    mutation{
      createEthDenverAttendance(input: {
        content: {
          recipient: "${finalClaim.recipient}"
          issuer: "${did}"
          timestamp: "${finalClaim.timestamp}"
          jwt: "${finalClaim.jwt}"
          step: "${whichEvent}"
        }
      })
      {
        document{
          id
          issuer {
            id
          }
          recipient
          timestamp
          jwt
          step
        }
      }
    }
  `);
  if (data.data?.createEthDenverAttendance?.document) {
    const point = await issuePoint(25, data.data?.createEthDenverAttendance?.document.step, data.data?.createEthDenverAttendance?.document.step, data.data?.createEthDenverAttendance?.document.id);
    console.log(point);
  }
  await getPoints();
  console.log(data);
  return data.data?.createEthDenverAttendance?.document;
};
const createBadge = async () => {
  const did = await getDid();
  if (!code) {
    alert("No unique code provided");
    return;
  }
  if (!event) {
    alert("No event detected");
    return;
  }
  setAttesting(true);
  const result = await fetch("/api/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      recipient: walletAddress,
      event,
      code,
    }),
  });
  type returnType = {
    err?: unknown;
    recipient: string;
    timestamp: string;
    jwt: string;
  };
  const finalClaim = (await result.json()) as returnType;
  console.log(finalClaim);
  if (finalClaim.err) {
    setAttesting(false);
    alert(finalClaim.err);
    return;
  }
  const data = await compose.executeQuery<{
    createEthDenverAttendance: {
      document: Event;
    };
  }>(`
  mutation{
    createEthDenverAttendance(input: {
      content: {
        recipient: "${finalClaim.recipient}"
        issuer: "${did}"
        timestamp: "${finalClaim.timestamp}"
        jwt: "${finalClaim.jwt}"
        step: "${event}"
      }
    })
    {
      document{
        id
        issuer {
          id
        }
        recipient
        timestamp
        jwt
        step
      }
    }
  }
`);
  //if mutation is a success, issue a point
  if (data.data?.createEthDenverAttendance?.document) {
    const point = await issuePoint(10, data.data?.createEthDenverAttendance?.document.step, data.data?.createEthDenverAttendance?.document.step, data.data?.createEthDenverAttendance?.document.id);
    console.log(point);
  }
  setAttesting(false);
  await getRecords();
  setEligible(false);
  return data;
};

const findEvent = async () => {
  const code = localStorage.getItem("code");
  if (code) {
    setCode(code);
  }
  else{
    console.log('Missing code')
  }
  // const result = await fetch("/api/find", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     code,
  //   }),
  // });
  const data = code as EventString | { err: string };
  console.log('Event code at findEvent()',data);
  if (typeof data === "string") {
    setEvent(data);
    await createEligibility(data);
  }
  await getRecords();
};
const createClaim = async () => {
  const finalClaim = await createBadge();
  console.log('createclaim function',finalClaim);
};
  


  useEffect(() => {
    //connectToCeramic();
    findEvent()
  }, []);

  const contextValue: CeramicContextType = {
    ceramic,
    provider,
    connectToCeramic,
    walletAddress,
    loggedIn,
    disconnect,
    runner,
    compose,
    findEvent,
    createClaim
    
   
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