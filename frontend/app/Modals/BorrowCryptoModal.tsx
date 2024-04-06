'use client'
import Image from 'next/image';
import React, { useEffect } from 'react';
import EthImage from '../../public/ethereum.png'
import { ethers, formatEther } from 'ethers';
import { abi,sepoliaUsdcArbitrum } from '@/constants';
import { useMyContext } from '../context/CeramicContext';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

type BorrowCryptoModalProps = {
    
};

const BorrowCryptoModal:React.FC<BorrowCryptoModalProps> =  () => {
    // const [runner,setRunner] = React.useState< ethers.ContractRunner|null|undefined>(null)
    const [interests, setInterests] =React. useState('');
    const [duration, setDuration] = React.useState('');
    const [collateral, setCollateral] = React.useState('');
    const [amount, setAmount] = React.useState('');
    const [loading,setLoading] = React.useState(false)
    const { connectToCeramic,loggedIn,walletAddress,disconnect, runner,createClaim,findEvent} = useMyContext()
    console.log('runner',runner)
    const usdcContractAddress = '0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d';
    const LOANLENDING_CONTRACT_ADDRESS='0x45569901ECaAa0427247A84507681794e2d8093C';
    


    const fetchRunner = async()=>{
        const ethProvider =await window.ethereum;
        if(runner){
            console.log('runnnnnnnnnnn',runner)
            return runner
           }
           console.log('no runner')
           
    }
    useEffect(()=>{
        const eventE = async()=>{
           let run = await fetchRunner()
           const contract = new ethers.Contract(LOANLENDING_CONTRACT_ADDRESS, abi, run)
           console.log()
            contract.on('LoanCreated',(loanCount,borrower,amount,loanInterest,loanDuration,loanCollateral)=>{
                toast.success(`Loan has been created for amount: ${ethers.formatEther(amount)} ETH with interest ${loanInterest.toString()}% with a collateral deposit of ${ethers.formatUnits(loanCollateral,6)} USDC for a duration of ${loanDuration.toString()} days.`, {
                    position: "top-left"
                });
         });
         return ()=>{
            contract.removeAllListeners()
         }
        }
        eventE()
        
    },[])
    
    
    const createLoan = async (e: React.FormEvent<HTMLFormElement>)=>{
        let run = await fetchRunner()
        const contract = new ethers.Contract(LOANLENDING_CONTRACT_ADDRESS, abi, run)
        const usdcContract = new ethers.Contract(usdcContractAddress, sepoliaUsdcArbitrum[0], run);
        try {
            setLoading(true)
            e.preventDefault()
            const prize = ethers.parseEther(amount);
            let requiredUsdcCollateral = await contract.calculateCollateral(prize);
            const allowance = await usdcContract.allowance(walletAddress, LOANLENDING_CONTRACT_ADDRESS);
            console.log('collateral',requiredUsdcCollateral,allowance,ethers.formatUnits(requiredUsdcCollateral, 6),ethers.formatUnits(allowance, 6))
            const approveTx = await usdcContract.approve(LOANLENDING_CONTRACT_ADDRESS,requiredUsdcCollateral);
            await approveTx.wait();
            //const eventPromise = ContractEvents(contract);
            
            const tx = await contract.createLoan(prize,interests,duration)
            console.log('Transaction sent:', tx.hash);
            const res = await  tx.wait(); 
            //await eventPromise;
            localStorage.setItem('code','LoanCreated')
            
            //await findEvent()
            //await createClaim()
            console.log('Transaction mined in block:', res.blockNumber);
            console.log('tx',tx)
            setInterests('');
            setCollateral('');
            setAmount('');
            setDuration('')
            setLoading(false)
            toast.success("LoanCreated !", {
                position: "top-right"
            });
        } catch (error) {
            setLoading(false)
            console.error(error);
        }
    }
   
    return (<div className='relative'>
        <form className='flex flex-col gap-5' onSubmit={createLoan}>
            <div className='border border-gray-400 rounded-lg p-2 flex items-center '>
                <div className=' basis-4/5 flex flex-col'>
                    <p className="text-black font-bold text-sm tracking-wider after:content-['*'] after:ml-0.5 after:text-red-500">I want to borrow</p>
                    <input className='grow outline-none bg-transparent cursor-pointer py-2 placeholder:text-gray-400 text-black' placeholder='0.75ETH' required type='number' min="0" step="any"  value={amount} onChange={e => {setAmount(e.target.value);}}/>
                </div>
                <div className='relative  basis-1/5 flex items-center justify-center gap-2'>
                    <Image src={EthImage} alt='Eth' width={40} height={40} className='object-cover'/>
                    <p className='font-bold'>ETH</p>
                </div>
            </div>
            
            <div className='border border-gray-400 rounded-lg p-2 flex  flex-col'>
                <p className="text-black font-bold text-sm tracking-wider after:content-['*'] after:ml-0.5 after:text-red-500">Percentage Interest</p>
                <input className='grow outline-none bg-transparent cursor-pointer py-2 placeholder:text-gray-400 text-black' placeholder='5%' required type='number' min="1" step="any" value={interests} onChange={e => {setInterests(e.target.value);}}/>
            </div>
            <select name="days" id="days" className='border border-gray-400 rounded-lg p-2 flex  flex-col bg-white text-black tracking-wider' onChange={(e)=>setDuration(e.target.value)}>
               <option value="7">7 days</option>
               <option value="14" >14 days</option>
               <option value="35" >35 days</option>
               <option value="100" >100 days</option>
            </select>
            
            <div className='border border-gray-400 rounded-lg p-2 flex flex-col gap-2 text-black'>
                <h4 className='tracking-wider text-sm font-bold'>Summary</h4>
                <div className='flex flex-col gap-3'>
                    <div className='flex items-center justify-between'>
                        <p className='text-gray-500'>Amount</p>
                        <p className='font-bold text-sm tracking-wider '>{amount} ETH</p>
                    </div>
                    <div className='flex items-center justify-between'>
                        <p className='text-gray-500'>Collateral</p>
                        <p className='font-bold text-sm tracking-wider'>{collateral} USDC</p>
                    </div>
                    <div className='flex items-center justify-between'>
                        <p className='text-gray-500'>Loan Duration</p>
                        <p className='font-bold text-sm tracking-wider'>{duration} days</p>
                    </div>
                    <div className='flex items-center justify-between'>
                        <p className='text-gray-500'>Interest</p>
                        <p className='font-bold text-sm tracking-wider'>{interests}%</p>
                    </div>
                    {/* <div className='flex items-center justify-between'>
                        <p className='text-gray-500'>Return Amount</p>
                        <p className='font-bold text-sm tracking-wider'>2 ETH/ $4000</p>
                    </div> */}
                </div>
            </div>
            <button className='p-4 rounded-lg flex items-center bg-green-600 justify-center text-white font-bold' type="submit" disabled={loading}>{loading ? 'Loading' :'Borrow'}</button>

        </form>
        <ToastContainer />

        </div>
    )
}
export default BorrowCryptoModal;