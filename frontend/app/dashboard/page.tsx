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
    const address = '0xA0Dc04E5F32a9637528b66c452A288747eeCAe69'
    return <div className='flex w-full flex-col px-4'>
        <div className='flex gap-5 mt-5'>
            <div className='bg-green-600   rounded  w-1/2 p-5 h-40 shadow-md shadow-black/5'>
                <h4>Total Loaned</h4>
                <p className='mt-5 font-bold text-lg'>$200,000</p>
            </div>
            <div className='bg-black rounded  w-1/2 text-white p-5 '>
             <h4>Collateral</h4>
             <p className='mt-5 font-bold text-lg'>$200,000</p>
            </div>
            <div className='bg-white rounded  w-1/2 text-black p-5'>
             <h4>Total Applicants: 4000</h4>
             <p className='mt-5 font-bold text-lg'>100 points awarded</p>
            </div>
        </div>
        <div className='mt-10 '>
            <h1 className='font-bold text-lg bg-gray-200 py-2 rounded-sm'>Latest Transactions</h1>
            {/* <div className='flex items-center mt-4 gap-10'>
                <div className='flex gap-1 tracking-wider'>
                  <h6 className='font-bold'>All</h6>
                  <p className='bg-violet-600 rounded-sm p-1 text-xs text-white'>76</p>
                </div>
                <div className='flex gap-1 tracking-wider'>
                  <h6 className='font-bold'>Approved</h6>
                  <p className='bg-cyan-500 rounded-sm p-1 text-xs text-white'>60</p>
                </div>
                <div className='flex gap-1 tracking-wider'>
                  <h6 className='font-bold'>Registered</h6>
                  <p className='bg-yellow-600 rounded-sm p-1 text-xs text-white'>100</p>
                </div>
                <div className='flex gap-1 tracking-wider'>
                  <h6 className='font-bold'>Loans expiring soon</h6>
                  <p className='bg-orange-600 rounded-sm p-1 text-xs text-white'>10</p>
                </div>
            </div> */}
            <table className='w-3/4 bg-white mt-10 border-gray-200 border-b-2'>
                <thead className='text-black'>
                    <tr className='p-4'>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Loan #</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>From</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>To</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Amount</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Status</th>
                    </tr>
                </thead>
                <tbody className='[&>*:nth-child(odd)]:bg-gray-100'>
                    <tr>
                        <td className='p-3 text-xs text-gray-700 tracking-wider'>1</td>
                        <td className='p-3 text-sm text-gray-700 tracking-wider'>
                        {`${address.slice(0,4)}...${address.slice(35)}`}
                        </td>
                        <td className='p-3 text-xs text-gray-700 tracking-wider '>
                        {`${address.slice(0,4)}...${address.slice(35)}`}
                        </td>
                        <td className='p-3 text-xs text-gray-700 tracking-wider '>
                            0.5 ETH
                        </td>
                        <td className='p-3 text-sm text-gray-700'>
                            <span className='bg-green-600 p-2 text-xs font-medium rounded-lg bg-opacity-50 tracking-wider text-green-800 '>Created</span>
                        </td>
                    </tr>
                    <tr>
                        <td className='p-3 text-xs text-gray-700 tracking-wider'>2</td>
                        <td className='p-3 text-sm text-gray-700 tracking-wider'>
                        {`${address.slice(0,4)}...${address.slice(35)}`}
                        </td>
                        <td className='p-3 text-xs text-gray-700 tracking-wider '>
                        {`${address.slice(0,4)}...${address.slice(35)}`}
                        </td>
                        <td className='p-3 text-xs text-gray-700 tracking-wider '>
                            0.5 ETH
                        </td>
                        <td className='p-3 text-sm text-gray-700'>
                            <span className='bg-red-600 p-2 text-xs font-medium rounded-lg bg-opacity-50 tracking-wider text-red-800 '>Rejected</span>
                        </td>
                    </tr>
                    <tr>
                        <td className='p-3 text-xs text-gray-700 tracking-wider'>3</td>
                        <td className='p-3 text-sm text-gray-700 tracking-wider'>
                        {`${address.slice(0,4)}...${address.slice(35)}`}
                        </td>
                        <td className='p-3 text-xs text-gray-700 tracking-wider '>
                        {`${address.slice(0,4)}...${address.slice(35)}`}
                        </td>
                        <td className='p-3 text-xs text-gray-700 tracking-wider '>
                            0.5 ETH
                        </td>
                        <td className='p-3 text-sm text-gray-700'>
                            <span className='bg-yellow-600 p-2 text-xs font-medium rounded-lg bg-opacity-50 tracking-wider text-yellow-800 '>Loaned</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
}
export default page;