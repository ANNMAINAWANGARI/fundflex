"use client"
import LendCard from '@/app/components/LendCard';
import Link from 'next/link';
import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs"

type pageProps = {
    
};

const LendPage:React.FC<pageProps> = () => {
    const [asset,setAsset] = useState('crypto')
    const [open, setIsOpen] = useState(true)
    
    const assetList :string[] = ['crypto','car','furniture'];
    const address = '0xA0Dc04E5F32a9637528b66c452A288747eeCAe69'
    
    return (
        <main className='w-full px-4'>
          <div className='bg-white py-5 px-5 rounded-lg'>
            <div className='flex gap-5 border-b-2 pb-2 mx-4'>
                <h4 className={`cursor-pointer ${asset =='crypto'?'underline underline-offset-8 decoration-blue-500':''}`} onClick={()=>setAsset('crypto')}>Crypto</h4>
                <h4 className={`cursor-pointer ${asset =='rwa'?'underline underline-offset-8 decoration-blue-500':''}`} onClick={()=>setAsset('rwa')}>Real World Asset</h4>
            </div>
             <table className='w-full bg-white mt-2   rounded-sm m-4 '>
                <thead className='text-black'>
                    <tr className='p-4 bg-gray-200'>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Address</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Amount</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Interest</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Status</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Duration</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Lend</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Action</th>
                    </tr>
                </thead>
                <tbody className='font-semibold'>
                    <tr>
                        <td className='p-3 text-sm text-gray-700 tracking-wider'>{`${address.slice(0,4)}...${address.slice(35)}`}</td>
                        <td className='p-3 text-sm text-gray-700 tracking-wider'>
                            0.5ETH
                        </td>
                        <td className='p-3 text-sm text-gray-700 tracking-wider'>
                            5%
                        </td>
                        <td className='p-3 text-sm text-gray-700'>
                            <span className='bg-green-600 p-2 text-xs font-medium rounded-lg bg-opacity-50 tracking-wider text-green-800 '>Created</span>
                        </td>
                        <td className='p-3 text-sm text-gray-700'>
                            <span className='p-2 tracking-wider'>100days</span>
                        </td>
                        <td className='p-3 text-sm text-gray-700'>
                        <button className='rounded px-4 text-green-800 bg-green-100  border-2 border-green-800 font-bold opacity-50 py-1'>Lend</button>
                        </td>
                        <td className='p-3 text-sm text-gray-700'>
                        <Link href={'/dashboard/lend/1'}><BsThreeDotsVertical className='cursor-pointer  text-2xl'/></Link>
                        </td>
                    </tr>
                    <tr>
                        <td className='p-3 text-sm text-gray-700 tracking-wider'>{`${address.slice(0,4)}...${address.slice(35)}`}</td>
                        <td className='p-3 text-sm text-gray-700 tracking-wider'>
                            0.5ETH
                        </td>
                        <td className='p-3 text-sm text-gray-700 tracking-wider'>
                            5%
                        </td>
                        <td className='p-3  text-gray-700'>
                          <span className='bg-green-600 p-2 text-sm font-medium rounded-lg bg-opacity-50 tracking-wider text-green-800 '>Created</span>
                        </td>
                        <td className='p-3 text-sm text-gray-700 tracking-wider'>
                            <p className=' p-2 '>100days</p>
                        </td>
                        <td className='p-3 text-sm text-gray-700'>
                        <button className='rounded px-4 text-green-800 bg-green-100  border-2 border-green-800 font-bold opacity-50 py-1'>Lend</button>
                        </td>
                        <td className='p-3 text-sm text-gray-700'>
                        <Link href={'/dashboard/lend/1'}><BsThreeDotsVertical className='cursor-pointer  text-2xl'/></Link>
                        </td>
                    </tr>
                    <tr>
                        <td className='p-3 text-sm text-gray-700 tracking-wider'>{`${address.slice(0,4)}...${address.slice(35)}`}</td>
                        <td className='p-3 text-sm text-gray-700 tracking-wider'>
                            0.5ETH
                        </td>
                        <td className='p-3 text-sm text-gray-700 tracking-wider'>
                            5%
                        </td>
                        <td className='p-3  text-gray-700'>
                          <span className='bg-green-600 p-2 text-sm font-medium rounded-lg bg-opacity-50 tracking-wider text-green-800 '>Created</span>
                        </td>
                        <td className='p-3 text-sm text-gray-700 tracking-wider'>
                            <p className=' p-2 '>100days</p>
                        </td>
                        <td className='p-3 text-sm text-gray-700'>
                        <button className='rounded px-4 text-green-800 bg-green-100  border-2 border-green-800 font-bold opacity-50 py-1'>Lend</button>
                        </td>
                        <td className='p-3 text-sm text-gray-700'>
                        <Link href={'/dashboard/lend/1'}><BsThreeDotsVertical className='cursor-pointer  text-2xl'/></Link>
                        </td>
                    </tr>
                    <tr>
                        <td className='p-3 text-sm text-gray-700 tracking-wider'>{`${address.slice(0,4)}...${address.slice(35)}`}</td>
                        <td className='p-3 text-sm text-gray-700 tracking-wider'>
                            0.5ETH
                        </td>
                        <td className='p-3 text-sm text-gray-700 tracking-wider'>
                            5%
                        </td>
                        <td className='p-3  text-gray-700'>
                          <span className='bg-green-600 p-2 text-sm font-medium rounded-lg bg-opacity-50 tracking-wider text-green-800 '>Created</span>
                        </td>
                        <td className='p-3 text-sm text-gray-700 tracking-wider'>
                            <p className=' p-2 '>100days</p>
                        </td>
                        <td className='p-3 text-sm text-gray-700'>
                        <button className='rounded px-4 text-green-800 bg-green-100  border-2 border-green-800 font-bold opacity-50 py-1'>Lend</button>
                        </td>
                        <td className='p-3 text-sm text-gray-700'>
                        <Link href={'/dashboard/lend/1'}><BsThreeDotsVertical className='cursor-pointer  text-2xl'/></Link>
                        </td>
                    </tr>
                    <tr>
                        <td className='p-3 text-sm text-gray-700 tracking-wider'>{`${address.slice(0,4)}...${address.slice(35)}`}</td>
                        <td className='p-3 text-sm text-gray-700 tracking-wider'>
                            0.5ETH
                        </td>
                        <td className='p-3 text-sm text-gray-700 tracking-wider'>
                            5%
                        </td>
                        <td className='p-3  text-gray-700'>
                          <span className='bg-green-600 p-2 text-sm font-medium rounded-lg bg-opacity-50 tracking-wider text-green-800 '>Created</span>
                        </td>
                        <td className='p-3 text-sm text-gray-700 tracking-wider'>
                            <p className=' p-2 '>100days</p>
                        </td>
                        <td className='p-3 text-sm text-gray-700'>
                        <button className='rounded px-4 text-green-800 bg-green-100  border-2 border-green-800 font-bold opacity-50 py-1'>Lend</button>
                        </td>
                        <td className='p-3 text-sm text-gray-700'>
                        <Link href={'/dashboard/lend/1'}><BsThreeDotsVertical className='cursor-pointer  text-2xl'/></Link>
                        </td>
                    </tr>
                </tbody>
             </table>
          </div>
        </main>
    )
}
export default LendPage;