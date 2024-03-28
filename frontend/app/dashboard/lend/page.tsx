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
        <main className=''>
          <div className=' py-6 flex items-center mt-5'>
            <input placeholder='search item' className='bg-white py-2 rounded outline-none cursor-pointer w-2/4 ml-4 px-2'/>
            <span className='bg-black text-white cursor-pointer py-3 rounded px-2 font-bold'><CiSearch/></span>
          </div>
          <table className='w-3/4 bg-white mt-2 border-gray-200 border-b-2  rounded-sm m-4 '>
                <thead className='text-black'>
                    <tr className='p-4'>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Address</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Amount</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Interest</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Status</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Duration</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Lend</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>More</th>
                    </tr>
                </thead>
                <tbody className='[&>*:nth-child(odd)]:bg-gray-100'>
                    <tr>
                        <td className='p-3 text-xs text-gray-700 tracking-wider'>{`${address.slice(0,4)}...${address.slice(35)}`}</td>
                        <td className='p-3 text-xs text-gray-700 tracking-wider'>
                            0.5ETH
                        </td>
                        <td className='p-3 text-xs text-gray-700 tracking-wider'>
                            5%
                        </td>
                        <td className='p-3 text-xs text-gray-700'>
                            <span className='bg-green-600 p-2 text-xs font-medium rounded-lg bg-opacity-50 tracking-wider text-green-800 '>Created</span>
                        </td>
                        <td className='p-3 text-xs text-gray-700'>
                            <span className='p-2 tracking-wider'>100days</span>
                        </td>
                        <td className='p-3 text-xs text-gray-700'>
                        <button className='rounded px-4 text-green-800 bg-green-100  border-2 border-green-800 font-bold opacity-50 py-1'>Lend</button>
                        </td>
                        <td className='p-3 text-xs text-gray-700'>
                        <Link href={'/dashboard/lend/1'}><BsThreeDotsVertical className='cursor-pointer  text-2xl'/></Link>
                        </td>
                    </tr>
                    <tr>
                        <td className='p-3 text-xs text-gray-700 tracking-wider'>{`${address.slice(0,4)}...${address.slice(35)}`}</td>
                        <td className='p-3 text-xs text-gray-700 tracking-wider'>
                            0.5ETH
                        </td>
                        <td className='p-3 text-xs text-gray-700 tracking-wider'>
                            5%
                        </td>
                        <td className='p-3  text-gray-700'>
                          <span className='bg-green-600 p-2 text-xs font-medium rounded-lg bg-opacity-50 tracking-wider text-green-800 '>Created</span>
                        </td>
                        <td className='p-3 text-xs text-gray-700 tracking-wider'>
                            <p className=' p-2 '>100days</p>
                        </td>
                        <td className='p-3 text-xs text-gray-700'>
                        <button className='rounded px-4 text-green-800 bg-green-100  border-2 border-green-800 font-bold opacity-50 py-1'>Lend</button>
                        </td>
                        <td className='p-3 text-xs text-gray-700'>
                        <Link href={'/dashboard/lend/1'}><BsThreeDotsVertical className='cursor-pointer  text-2xl'/></Link>
                        </td>
                    </tr>
                    <tr>
                        <td className='p-3 text-xs text-gray-700 tracking-wider'>{`${address.slice(0,4)}...${address.slice(35)}`}</td>
                        <td className='p-3 text-xs text-gray-700 tracking-wider'>
                            0.5ETH
                        </td>
                        <td className='p-3 text-xs text-gray-700 tracking-wider'>
                            5%
                        </td>
                        <td className='p-3  text-gray-700'>
                          <span className='bg-green-600 p-2 text-xs font-medium rounded-lg bg-opacity-50 tracking-wider text-green-800 '>Created</span>
                        </td>
                        <td className='p-3 text-xs text-gray-700 tracking-wider'>
                            <p className=' p-2 '>100days</p>
                        </td>
                        <td className='p-3 text-xs text-gray-700'>
                        <button className='rounded px-4 text-green-800 bg-green-100  border-2 border-green-800 font-bold opacity-50 py-1'>Lend</button>
                        </td>
                        <td className='p-3 text-xs text-gray-700'>
                        <Link href={'/dashboard/lend/1'}><BsThreeDotsVertical className='cursor-pointer  text-2xl'/></Link>
                        </td>
                    </tr>
                    <tr>
                        <td className='p-3 text-xs text-gray-700 tracking-wider'>{`${address.slice(0,4)}...${address.slice(35)}`}</td>
                        <td className='p-3 text-xs text-gray-700 tracking-wider'>
                            0.5ETH
                        </td>
                        <td className='p-3 text-xs text-gray-700 tracking-wider'>
                            5%
                        </td>
                        <td className='p-3  text-gray-700'>
                          <span className='bg-green-600 p-2 text-xs font-medium rounded-lg bg-opacity-50 tracking-wider text-green-800 '>Created</span>
                        </td>
                        <td className='p-3 text-xs text-gray-700 tracking-wider'>
                            <p className=' p-2 '>100days</p>
                        </td>
                        <td className='p-3 text-xs text-gray-700'>
                        <button className='rounded px-4 text-green-800 bg-green-100  border-2 border-green-800 font-bold opacity-50 py-1'>Lend</button>
                        </td>
                        <td className='p-3 text-xs text-gray-700'>
                        <Link href={'/dashboard/lend/1'}><BsThreeDotsVertical className='cursor-pointer  text-2xl'/></Link>
                        </td>
                    </tr>
                    <tr>
                        <td className='p-3 text-xs text-gray-700 tracking-wider'>{`${address.slice(0,4)}...${address.slice(35)}`}</td>
                        <td className='p-3 text-xs text-gray-700 tracking-wider'>
                            0.5ETH
                        </td>
                        <td className='p-3 text-xs text-gray-700 tracking-wider'>
                            5%
                        </td>
                        <td className='p-3  text-gray-700'>
                          <span className='bg-green-600 p-2 text-xs font-medium rounded-lg bg-opacity-50 tracking-wider text-green-800 '>Created</span>
                        </td>
                        <td className='p-3 text-xs text-gray-700 tracking-wider'>
                            <p className=' p-2 '>100days</p>
                        </td>
                        <td className='p-3 text-xs text-gray-700'>
                        <button className='rounded px-4 text-green-800 bg-green-100  border-2 border-green-800 font-bold opacity-50 py-1'>Lend</button>
                        </td>
                        <td className='p-3 text-xs text-gray-700'>
                        <Link href={'/dashboard/lend/1'}><BsThreeDotsVertical className='cursor-pointer  text-2xl'/></Link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </main>
    )
}
export default LendPage;