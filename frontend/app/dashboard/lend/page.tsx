"use client"
import LendCard from '@/app/components/LendCard';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs"
import { useMyContext } from '@/app/context/CeramicContext';
import { abi,sepoliaUsdcArbitrum } from '@/constants';
import { ethers, formatEther } from 'ethers';
import Spinner from '@/app/components/Spinner';

type pageProps = {
    
};
interface Borrower{
    borrower_address:[BigInt],
    points:BigInt
}
interface Lender{
    lender_address:[BigInt],
    points:BigInt
}
enum LoanStatus{Open, Funded, Repayed, Defaulted}
interface EnumValues {
    [key: number]: string;
}
const loanStatusMap:EnumValues = {
    0: 'Open',
    1: 'Funded',
    2: 'Repayed',
    3: 'Defaulted'
  };
 interface Loan{
    loanId:BigInt,
    borrower: Borrower,
    lender: Lender,
    status:BigInt,
    amount:BigInt
    interest:BigInt
    duration:BigInt,
    startTime:BigInt,
    repaid:boolean,
    collateralAmount:BigInt
    totalAmount:BigInt,
 }

const LendPage:React.FC<pageProps> = () => {
    const LOANLENDING_CONTRACT_ADDRESS='0x42f09Dd91a4Fffd4407ee4dA01518dBdEcc6f337';
    const { connectToCeramic,loggedIn,walletAddress,disconnect, runner} = useMyContext()
    const [allLoans, setallLoans] = useState<Loan[]>([])
    const [loading,setLoading] = useState(false)
    useEffect(()=>{
        
        
        const getLoans = async()=>{
            setLoading(true)
            const localRunner = localStorage.getItem('runner');
            if(runner){
                console.log('runner',localRunner)
               //const runnerInfo = JSON.parse(localRunner) ;
               const contract = new ethers.Contract(LOANLENDING_CONTRACT_ADDRESS, abi, runner)
               const allloans = await contract.getAllLoans()
               console.log('allloans',allloans)
               console.log(allLoans[0])
              setallLoans(allloans);
            }else{
                const result = await new ethers.BrowserProvider(window.ethereum).getSigner()
                const contract = new ethers.Contract(LOANLENDING_CONTRACT_ADDRESS, abi, result)
               const allloans = await contract.getAllLoans()
               console.log('allloans',allloans)
               
              setallLoans(allloans);

            }
            setLoading(false)
            
        }
        getLoans()
    },[])
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
            {loading? (<Spinner/>):(
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
                    {allLoans && allLoans.map((loan)=>(
                     <tr key={loan?.loanId.toString()}>
                        <td className='p-3 text-sm text-gray-700 tracking-wider'>{`${loan?.borrower?.borrower_address?.toString().slice(0,4)}...${loan?.borrower?.borrower_address?.toString().slice(35)}`}</td>
                        <td className='p-3 text-sm text-gray-700 tracking-wider'>
                            {ethers.formatUnits(loan?.amount?.toString(), 'ether')} ETH
                        </td>
                        <td className='p-3 text-sm text-gray-700 tracking-wider'>
                        {loan?.interest?.toString()}%
                        </td>
                        <td className='p-3 text-sm text-gray-700'>
                            <span className='bg-green-600 p-2 text-xs font-medium rounded-lg bg-opacity-50 tracking-wider text-green-800 '>{loanStatusMap[Number(loan?.status?.toString())]}</span>
                        </td>
                        <td className='p-3 text-sm text-gray-700'>
                            <span className='p-2 tracking-wider'>{loan?.duration?.toString()} days</span>
                        </td>
                        <td className='p-3 text-sm text-gray-700'>
                        <button className='rounded px-4 text-green-800 bg-green-100  border-2 border-green-800 font-bold opacity-50 py-1'>Lend</button>
                        </td>
                        <td className='p-3 text-sm text-gray-700'>
                        <Link href={'/dashboard/lend/1'}><BsThreeDotsVertical className='cursor-pointer  text-2xl'/></Link>
                        </td>
                    </tr>
                    ))}   
                </tbody>
             </table>
            )}
             
          </div>
        </main>
    )
}
export default LendPage;