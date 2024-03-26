"use client"
import LendCard from '@/app/components/LendCard';
import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";

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
          <div className='flex flex-col md:flex-row  w-full my-5'>
            <div className='relative md:basis-1/5 border  px-4'>
                <button 
                onClick = {()=>setIsOpen((prev)=>!prev)}
                className='p-2  font-bold text-lg w-full bg-white rounded flex items-center justify-between'>
                    {asset}
                    {open?(
                        <MdOutlineKeyboardArrowDown/>
                    ):(<MdKeyboardArrowUp/>)}</button>
                <div className='bg-white p-2 flex flex-col items-start rounded-lg mt-2'>
                {assetList.map((asset,i)=>(
                    <div key={i} className='p-3 hover:bg-gray-200 cursor-pointer w-full hover:rounded-r-lg hover:border-l-green-600 hover:border-l-4 border-b-2' onClick={()=>setAsset(asset)}>
                        <h3>{asset}</h3>
                    </div>
                ))}
                </div>
            </div>
            <div className=' md:basis-4/5 grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1  gap-3 items-center  px-3 content-evenly w-full'>
                <LendCard address={`${address.slice(0,4)}...${address.slice(35)}`} duration='100days'/>
                <LendCard address={`${address.slice(0,4)}...${address.slice(35)}`} duration='100days'/>
                <LendCard address={`${address.slice(0,4)}...${address.slice(35)}`} duration='100days'/>
                <LendCard address={`${address.slice(0,4)}...${address.slice(35)}`} duration='100days'/>
                <LendCard address={`${address.slice(0,4)}...${address.slice(35)}`} duration='100days'/>
            </div>
          </div>
        </main>
    )
}
export default LendPage;