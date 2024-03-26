"use client"
import { CgProfile } from "react-icons/cg";
import { FaHandHoldingUsd } from "react-icons/fa";
import { CiCoinInsert } from "react-icons/ci";
import React from 'react';
import { Pacifico } from 'next/font/google'
import Link from "next/link";
import { IoMdHome } from "react-icons/io";
import { usePathname } from 'next/navigation'

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
  return (
    <div className='flex'>
        <div className='bg-black flex-col  h-screen p-5 text-white'>
            <p className={`${pacifico.className} text-green-600 text-2xl`}>FundFlex</p>
            <p className='text-white text-sm mt-10 mb-10'>0x0034.....59</p>
            <ul className='mt-5 flex flex-col gap-8'>
                <li className='flex gap-2 items-center' >
                    <IoMdHome className='text-2xl'/>
                    <Link href='/dashboard' className={pathname === '/dashboard' ? 'text-green-600 font-bold':'text-white'}>Overview</Link>
                </li>
                
                <li className='flex gap-2 items-center'>
                    <CiCoinInsert className='text-2xl'/>
                    <Link href='/dashboard/lend' className={pathname === '/dashboard/lend' ? 'text-green-600 font-bold':'text-white'}>Lend</Link>
                </li>
                <li className='flex gap-2 items-center'>
                    <FaHandHoldingUsd className='text-2xl'/>
                    <Link href='/dashboard/borrow' className={pathname === '/dashboard/borrow' ? 'text-green-600 font-bold':'text-white'}>Borrow</Link>
                </li>
                <li className='flex gap-2 items-center'>
                    <CgProfile className='text-2xl'/>
                    <Link href='/dashboard/profile' className={pathname === '/dashboard/profile' ? 'text-green-600 font-bold':'text-white'}>Profile</Link>
                </li>
            </ul>
        </div>
        <div className="w-full">{children}</div>
    </div>
  )
}

export default Layout