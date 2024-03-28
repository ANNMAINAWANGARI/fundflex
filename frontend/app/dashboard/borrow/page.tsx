"use client"
import BorrowCryptoModal from '@/app/Modals/BorrowCryptoModal';
import React,{useState} from 'react';

type pageProps = {
    
};

const BorrowPage:React.FC<pageProps> = () => {
    const [tab,setTab]= useState('crypto')
    
    return (
        <div className='flex items-center justify-center'>
            <div className='bg-white flex flex-col p-5 rounded-lg w-2/4 mt-5'>
                <div className='flex items-center gap-10 mb-4'>
                    <h3 className={`cursor-pointer ${tab === 'crypto'? 'font-bold text-lg text-green-600':'font-light text-sm'}`} onClick={()=>setTab('crypto')}>Borrow ETH</h3>
                    <h3 className={`cursor-pointer ${tab === 'rwa'? 'font-bold text-lg text-green-600':'font-light text-sm'}`} onClick={()=>setTab('rwa')}>Borrow RWA</h3>
                </div>
                <div>
                    {tab ==='crypto'?(
                     <div><BorrowCryptoModal/></div>):(<div>rwa</div>)}
                </div>
            </div>
        </div>
    )
}
export default BorrowPage;