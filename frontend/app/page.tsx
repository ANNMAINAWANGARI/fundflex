'use client'
import Image from "next/image";
import { Pacifico } from 'next/font/google'
import Link from "next/link";
import { FaGreaterThan } from "react-icons/fa6";
import HomeCard from "./components/HomeCard";
import { FaPerson } from "react-icons/fa6";
import { FaGift } from "react-icons/fa";
import { TbDeviceAnalytics } from "react-icons/tb";
import { FaHandHoldingUsd } from "react-icons/fa";
import { CiCoinInsert } from "react-icons/ci";
import { PiPercentFill } from "react-icons/pi";
import Footer from "./components/Footer";

import { CeramicClient } from '@ceramicnetwork/http-client';
// import { EthereumAuthProvider,ConnectNetwork } from '@self.id/web';
import { ethers,Provider } from 'ethers';
import { DIDSession } from 'did-session'
import type { AuthMethod } from '@didtools/cacao'
import { ComposeClient } from '@composedb/client'
import { EthereumWebAuth, getAccountId } from '@didtools/pkh-ethereum'
import { useContext } from "react";
import { CeramicContext } from "./context/CeramicContext";



const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

// const handleGetStarted = async()=>{
//   console.log('yea loading')
//   const ethProvider = window.ethereum;

// // Request access to the user's Ethereum accounts
// const addresses = await ethProvider.enable();

// // Get the account ID from the Ethereum provider and the user's first account
// const accountId = await getAccountId(ethProvider, addresses[0]);

// // Create an instance of EthereumWebAuth
// const authProvider = await EthereumWebAuth.getAuthMethod(ethProvider, accountId);

// const loadSession = async (): Promise<DIDSession> => {
// // Check if there's a stored session in localStorage
// const sessionStr = localStorage.getItem('didsession');
// let session;

// if (sessionStr) {
//   // If there's a stored session, load it from the string
//   session = await DIDSession.fromSession(sessionStr);
// }

// if (!session || (session.hasSession && session.isExpired)) {
//   // If there's no stored session or it has expired, create a new one
//   session = await DIDSession.authorize(ethProvider);
//   localStorage.setItem('didsession', session.serialize());
// }

// return session;
// };
// console.log()

  
// }

export default function Home() {
  const { connectToCeramic} = useContext(CeramicContext) || {}
  return (
    <>
    <section className="flex flex-col h-full pb-32 bg-black">
      <header className="flex justify-between items-center px-4 py-4  text-white mb-14">
        <p className={`${pacifico.className} text-green-600 text-2xl`}>FundFlex</p>
        <ul className="flex justify-between items-center gap-4">
          <li className="underline decoration-green-600 decoration-2 "><Link href='/'>Home</Link></li>
          <li className="underline decoration-green-600 decoration-2 "><Link href='/dashboard'>Dashboard</Link></li>
        </ul>
        <button className="border-4 rounded border-green-600 p-2" onClick={connectToCeramic}>Connect Wallet</button>
      </header>
      <div className="flex flex-col w-full items-center justify-center text-white">
        {/* <Image
        src='/logo.png'
        alt='Logo'
        width={200}
        height={150}
        priority
        className="rounded-lg"/> */}
        <div className="text-6xl items-center max-w-5xl font-bold ">A P2P decentralized dynamic <span className="text-green-600">lending</span> marketplace for assets.Lend smart,Borrow efficiently. <span className="text-gray-600">Earn upto 25% interest.</span><span className="text-green-600">Start now ✔️</span></div>
      </div>
    </section>
    <section className="grid grid-rows-2 divide-y md:divide-x bg-white md:grid-cols-2 border">
      <HomeCard Icon={FaHandHoldingUsd} h1={"Apply For Loan"} description={"Need a loan? Simply fill out the form and put in your collateral amount then get your loan. Earn point after repay directly in your portfolio."} link='/borrow'/>
      <HomeCard Icon={CiCoinInsert} h1={"Loan Applicants Requests"} description={"Earn interest by issuing loans to your preffered requests. Something not right? Negotiate with the applicant in the chat app."} link='/lend'/>
    </section>
    <section className="grid grid-cols-2 py-20">
      <div className="flex flex-col px-7 relative">
        <h1 className="font-bold text-sm mb-5">ABOUT OUR PLATFORM</h1>
        <h2 className="text-green-600 font-bold text-xl">The FundFlex Platform is designed to meet the requirements of the borrower and for the lender</h2>
        <p className="mt-4">Fundflex uses an automated credit scoring smart contract that determines the credibility of the borrower in addition to sentimental analysis powered by openai. Users can negotiate based on preference using the chat app provided.</p>
        <button className="bg-green-600 text-white mt-7 w-64 rounded p-4">Try Our loan platform</button>
      </div>
      <div >
        <div className="flex flex-wrap items-center justify-around gap-5">
        <div className="bg-white w-52 h-232 items-center flex flex-col justify-center py-8">
          <PiPercentFill className="text-green-600 text-6xl"/>
          <p className="text-center">Loan interest</p>
        </div>
        <div className="bg-white w-52 h-232 items-center flex flex-col justify-center py-8">
          <FaGift className="text-green-600 text-6xl"/>
          <p className="text-center">Ceramic point rewards</p>
        </div>
        <div className="bg-white w-52 h-232 items-center flex flex-col justify-center py-8">
          <TbDeviceAnalytics className="text-green-600 text-6xl"/>
          <p className="text-center">OpenAI semantic analysis</p>
        </div>
        <div className="bg-white w-52 h-232 items-center flex flex-col justify-center py-8">
          <FaPerson className="text-green-600 text-6xl"/>
          <p className="text-center">Credit score</p>
        </div>
        </div>
        
        
      </div>
    </section>
    <Footer/>
    </>
  );
}
