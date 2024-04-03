"use client"
import { CgProfile } from "react-icons/cg";
import { FaHandHoldingUsd } from "react-icons/fa";
import { CiCoinInsert } from "react-icons/ci";
import React from 'react';
import { Pacifico } from 'next/font/google'
import Link from "next/link";
import { IoMdHome } from "react-icons/io";
import { usePathname } from 'next/navigation'


import { useMyContext } from "../context/CeramicContext";

const pacifico = Pacifico({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
  })


const Layout = ({
    children,
  }: {
    children: React.ReactNode
  }) => {
    const pathname = usePathname()
    const { connectToCeramic,loggedIn,walletAddress,disconnect} = useMyContext()
    const address = walletAddress;
  return (
    
    <div className='flex'>
        <div className='bg-white lg:flex-col  lg:h-screen lg:pr-20 lg:p-7 text-white hidden lg:flex md:hidden'>
            <p className={`${pacifico.className} text-green-600 text-2xl mb-10`}>FundFlex</p>
            
            <ul className='mt-5 flex flex-col gap-8'>
                <li className={`flex gap-2 items-center ${pathname === '/dashboard' ?'text-green-600 font-semibold':'text-black text-md'}`} >
                    <IoMdHome className='text-2xl'/>
                    <Link href='/dashboard' className=''>Overview</Link>
                </li>
                
                <li className={`flex gap-2 items-center ${pathname === '/dashboard/lend' ?'text-green-600 font-semibold':'text-black'}`}>
                    <CiCoinInsert className='text-2xl'/>
                    <Link href='/dashboard/lend' className=''>Lend</Link>
                </li>
                <li className={`flex gap-2 items-center ${pathname === '/dashboard/borrow' ?'text-green-600 font-semibold':'text-black'}`}>
                    <FaHandHoldingUsd className='text-2xl'/>
                    <Link href='/dashboard/borrow' className=''>Borrow</Link>
                </li>
                {/* <li className={`flex gap-2 items-center ${pathname === '/dashboard/profile' ?'text-green-600 font-semibold':'text-black'}`}>
                    <CgProfile className='text-2xl'/>
                    <Link href='/dashboard/profile' className=''>Profile</Link>
                </li>
                <li className={`flex gap-2 items-center ${pathname === '/dashboard/chat' ?'text-green-600 font-bold':'text-black'}`}>
                    <CgProfile className='text-2xl'/>
                    <Link href='/dashboard/chat' className=''>Chat</Link>
                </li> */}
            </ul>
        </div>
        <div className="w-full overflow-y-scroll">
          <div className=" flex items-center p-4 gap-2 flex-row-reverse ">
            <div className="text-green-600 border border-gray-500 p-2 rounded flex ">
              {/* <Image src={Logo} alt="Metamask" fill={true} className=""	style={{objectFit: "contain",left:0,justifyContent:'space-between'}}/> */}
              <p>{`${address.slice(0,4)}...${address.slice(35)}`}</p>
            </div>
            <div className="text-black border border-green-600 p-2 rounded hidden lg:flex">Ethereum</div>
            <input className="grow rounded p-2 placeholder:text-slate-400 bg-transparent cursor-pointer border border-gray-300 outline-none" placeholder="Search address"/>
            <p className={`${pacifico.className} text-green-600 text-2xl text-center lg:hidden hidden md:flex mr-5`}>FundFlex</p>
          </div>
          {children}</div>
          
    </div>
    
  )
}

export default Layout