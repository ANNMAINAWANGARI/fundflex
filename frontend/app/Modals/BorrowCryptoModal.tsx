import Image from 'next/image';
import React from 'react';
import EthImage from '../../public/ethereum.png'
import USDCImage from '../../public/usdc.png'

type BorrowCryptoModalProps = {
    
};

const BorrowCryptoModal:React.FC<BorrowCryptoModalProps> = () => {
    
    return (
        <div className='flex flex-col gap-5'>
            <div className='border border-gray-400 rounded-lg p-2 flex items-center '>
                <div className=' basis-4/5 flex flex-col'>
                    <p className="text-black font-bold text-sm tracking-wider after:content-['*'] after:ml-0.5 after:text-red-500">I want to borrow</p>
                    <input className='grow outline-none bg-transparent cursor-pointer py-2 placeholder:text-gray-400' placeholder='0.75ETH' required type='number' min="0" step="any"/>
                </div>
                <div className='relative  basis-1/5 flex items-center justify-center gap-2'>
                    <Image src={EthImage} alt='Eth' width={40} height={40} className='object-cover'/>
                    <p className='font-bold'>ETH</p>
                </div>
            </div>
            {/* <div className='border border-gray-400 rounded-lg p-4 flex items-center '>
                <div className=' basis-4/5 flex flex-col'>
                    <p className="text-black font-bold after:content-['*'] after:ml-0.5 after:text-red-500">Collateral Amount</p>
                    <input className='grow outline-none bg-transparent cursor-pointer py-2 placeholder:text-gray-400' placeholder='2USDC' required type='number' min="0" step="any"/>
                </div>
                <div className='relative  basis-1/5 flex items-center justify-center gap-2'>
                    <Image src={USDCImage} alt='USDC' width={70} height={70} className='object-cover'/>
                    <p className='font-bold'>USDC</p>
                </div>
            </div> */}
            <div className='border border-gray-400 rounded-lg p-2 flex  flex-col'>
                <p className="text-black font-bold text-sm tracking-wider after:content-['*'] after:ml-0.5 after:text-red-500">Percentage Interest</p>
                <input className='grow outline-none bg-transparent cursor-pointer py-2 placeholder:text-gray-400' placeholder='5%' required type='number' min="1" step="any"/>
            </div>
            <div className='border border-gray-400 rounded-lg p-2 flex flex-col gap-2'>
                <p className="text-black text-sm tracking-wider font-bold after:content-['*'] after:ml-0.5 after:text-red-500">Duration of Loan</p>
                <div className='flex items-center gap-3'>
                    <button className='rounded py-2 px-4 bg-gray-200 hover:bg-green-600'>7 days</button>
                    <button className='rounded py-2 px-4 bg-gray-200 hover:bg-green-600'>14 days</button>
                    <button className='rounded py-2 px-4 bg-gray-200 hover:bg-green-600'>35 days</button>
                    <button className='rounded py-2 px-4 bg-gray-200 hover:bg-green-600'>100 days</button>
                </div>
            </div>
            <div className='border border-gray-400 rounded-lg p-2 flex flex-col gap-2'>
                <h4 className='tracking-wider text-sm font-bold'>Summary</h4>
                <div className='flex flex-col gap-3'>
                    <div className='flex items-center justify-between'>
                        <p className='text-gray-500'>Amount</p>
                        <p className='font-bold text-sm tracking-wider'>1 ETH/ $2000</p>
                    </div>
                    <div className='flex items-center justify-between'>
                        <p className='text-gray-500'>Collateral</p>
                        <p className='font-bold text-sm tracking-wider'>1 USDC/ $100</p>
                    </div>
                    <div className='flex items-center justify-between'>
                        <p className='text-gray-500'>Loan Duration</p>
                        <p className='font-bold text-sm tracking-wider'>100 days</p>
                    </div>
                    <div className='flex items-center justify-between'>
                        <p className='text-gray-500'>Interest</p>
                        <p className='font-bold text-sm tracking-wider'>5%</p>
                    </div>
                    <div className='flex items-center justify-between'>
                        <p className='text-gray-500'>Return Amount</p>
                        <p className='font-bold text-sm tracking-wider'>2 ETH/ $4000</p>
                    </div>
                </div>
            </div>
            <button className='p-4 rounded-lg flex items-center bg-green-600 justify-center text-white font-bold'>Borrow</button>

        </div>
    )
}
export default BorrowCryptoModal;