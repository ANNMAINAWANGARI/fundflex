"use client"
import React from 'react';

type pageProps = {
    
};

const SingleLoanPage:React.FC<pageProps> = () => {
    
    const address = '0xA0Dc04E5F32a9637528b66c452A288747eeCAe69'
    
    return (
        <div className='m-5'>
          <h1 className='py-4 text-lg font-bold'>LoanId: 389657</h1>
          <section className='bg-white mt-5 py-5 rounded px-5 flex flex-col lg:items-center gap-3 md:flex-col lg:flex-row md:gap-5 '>
              <div className='flex flex-col basis-3/5'>
                <div className='flex items-center'>
                    <div className='flex flex-col gap-2'>
                        <h4 className='text-gray-400'>Loan Amount</h4>
                        <p className='font-bold text-lg'>$13,900</p>
                        <span className='bg-green-600 rounded-lg px-2'>Active</span>
                    </div>
                </div>
                <div  className='grid grid-cols-2 lg:grid-cols-3 gap-2 mt-10 items-center justify-between'>
                    <div className='flex flex-col gap-1'>
                        <p className='text-gray-400'>Total Interest</p>
                        <h5 className='font-bold'>$100000</h5>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <p className='text-gray-400'>Term</p>
                        <h5 className='font-bold'>48 months</h5>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <p className='text-gray-400'>Total Repayments</p>
                        <h5 className='font-bold'>$100000000</h5>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <p className='text-gray-400'>Rate</p>
                        <h5 className='font-bold'>6.5%</h5>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <p className='text-gray-400'>Principal Coin</p>
                        <h5 className='font-bold'>Ether</h5>
                    </div>
                </div>
              </div>
              <div className='flex  flex-col gap-2 basis-2/5 '>
                <div className='flex gap-2 items-center'>
                    <h3 className='font-bold'>Address :</h3>
                    <p>{`${address.slice(0,4)}...${address.slice(35)}`}</p>
                </div>
                <div className='flex gap-2 items-center'>
                    <h3 className='font-bold'>Points :</h3>
                    <p>0</p>
                </div>
                <div className='flex gap-2 items-center'>
                    <h3 className='font-bold'>Credit :</h3>
                    <p>1000</p>
                </div>
                <div className='flex gap-2 items-center'>
                    <h3 className='font-bold'>Analysis :</h3>
                    <p>Neutral</p>
                </div>
                <button className='bg-green-600 p-2 rounded text-white mt-3'>Send a message</button>
              </div> 
          </section>
          <div>recommendation algorithm</div>
        </div>
    )
}
export default SingleLoanPage;