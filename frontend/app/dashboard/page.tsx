import React from 'react';
import { Pacifico } from 'next/font/google'
import Link from "next/link";
import { IoMdHome } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaHandHoldingUsd } from "react-icons/fa";
import { CiCoinInsert } from "react-icons/ci";
import { FaBell } from "react-icons/fa";

const pacifico = Pacifico({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
  })
type pageProps = {
    
};

const page:React.FC<pageProps> = () => {
    
    return <div className='flex w-full flex-col px-4'>
        <header className='flex items-center justify-between  w-full py-5'>
            <p className='text-lg'>Welcome, <span className='text-sm'>0xbf00345n</span></p>
            <FaBell className='text-lg'/>
        </header>
        <div className='flex gap-5'>
            <div className='bg-gradient-to-r from-green-600 to-black rounded  w-1/2 p-5'>
                <h4>Total Loaned</h4>
                <p className='mt-5 font-bold text-lg'>$200,000</p>
            </div>
            <div className='bg-black rounded  w-1/2 text-white p-5'>
             <h4>Collateral</h4>
             <p className='mt-5 font-bold text-lg'>$200,000</p>
            </div>
            <div className='bg-white rounded  w-1/2 text-black p-5'>
             <h4>Total Applicants: 4000</h4>
             <p className='mt-5 font-bold text-lg'>100 points awarded</p>
            </div>
        </div>
        <div className='mt-10 '>
            <h1 className='font-bold text-2xl'>Latest Transactions</h1>
            <table className='w-full bg-white mt-10 border-gray-200 border-b-2'>
                <thead className='text-black'>
                    <tr className='p-4'>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Address</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>From/To</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Amount</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Status</th>
                    </tr>
                </thead>
                <tbody >
                    <tr>
                        <td className='p-3 text-sm text-gray-700'>0x098tghj7675rtghk</td>
                        <td className='p-3 text-sm text-gray-700'>
                            <div className='flex flex-col'>
                                <p>From: 0x047fghiyut4rywhg</p>
                                <p>To: 0x047fghiyut4rywhg</p>
                            </div>
                        </td>
                        <td className='p-3 text-sm text-gray-700'>
                            <button className='border border-black'>0.5eth</button>
                        </td>
                        <td className='p-3 text-sm text-gray-700'>
                            <p className='bg-green-600 p-2 '>Created</p>
                        </td>
                    </tr>
                    <tr>
                        <td className='p-3 text-sm text-gray-700'>0x098tghj7675rtghk</td>
                        <td className='p-3 text-sm text-gray-700'>
                            <div className='flex flex-col'>
                                <p>From: 0x047fghiyut4rywhg</p>
                                <p>To: 0x047fghiyut4rywhg</p>
                            </div>
                        </td>
                        <td className='p-3 text-sm text-gray-700'>0.5eth</td>
                        <td className='p-3 text-sm text-gray-700'>Created</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
}
export default page;