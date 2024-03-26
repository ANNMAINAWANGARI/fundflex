"use client"
import React from 'react';
import { IoPersonCircle } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";

type LendCardProps = {
    address:string,
    duration:string
    
};

const LendCard:React.FC<LendCardProps> = ({address,duration}) => {
    
    return (
        <div className='bg-white rounded py-6 pl-2'>
            <div className='flex items-center justify-between px-4  relative'>
            
              <div className='flex items-center gap-4 mb-5'>
                <IoPersonCircle className='text-3xl text-green-600'/>
                <h4 className='font-bold'>{address}</h4>
                <p className='bg-gray-300 rounded-lg px-2 text-gray-500 text-sm'>{duration}</p>
              </div>
              <BsThreeDotsVertical className='cursor-pointer absolute top-0 right-1 text-2xl'/>
            </div>
            <div className='grid grid-cols-3 gap-7 px-4'>
                <div className='flex flex-col gap-1 justify-center'>
                    <p className='text-gray-500 tracking-tight'>Loan Amount</p>
                    <p className='font-bold text-sm'>10ARB</p>
                </div>
                <div className='justify-center flex flex-col gap-1'>
                    <p className='text-gray-500 tracking-tight'>Interest</p>
                    <p className='font-bold text-sm'>5%</p>
                </div>
                <div className=''>
                    <button className='rounded px-4 text-green-800 bg-green-100  border-2 border-green-800 font-bold opacity-50 py-1'>Lend</button>
                </div>
            </div>
        </div>
    )
}
export default LendCard;