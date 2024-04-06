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
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import { toast } from 'react-toastify';
  

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

export default function LendPage (){
    const LOANLENDING_CONTRACT_ADDRESS='0x45569901ECaAa0427247A84507681794e2d8093C';
    const { connectToCeramic,loggedIn,walletAddress,disconnect, runner} = useMyContext()
    const [allLoans, setallLoans] = useState<Loan[]>([])
    const [loading,setLoading] = useState(false)
    const [loadingButton,setLoadingButton] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(6);
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = allLoans.slice(firstPostIndex, lastPostIndex);
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
    const fetchRunner = async()=>{
        const ethProvider =await window.ethereum;
        if(runner){
            console.log('runnnnnnnnnnn',runner)
            return runner
           }
           console.log('no runner')
           
    }
    const [asset,setAsset] = useState('crypto')
    const [open, setIsOpen] = useState(true)
    
    const assetList :string[] = ['crypto','car','furniture'];
    const address = '0xA0Dc04E5F32a9637528b66c452A288747eeCAe69'
    const lend = async(loanId:string,amount:BigInt,recipient:string)=>{
        try{
            console.log(loanId,amount,recipient)
            setLoadingButton(true)
            let run = await fetchRunner()
               const contract = new ethers.Contract(LOANLENDING_CONTRACT_ADDRESS, abi, run)
               const tx = await contract.lend(loanId,amount,recipient,{value:amount})
               const receipt = await tx.wait();
               if (receipt.status === 1) {
                toast.success('Loan funded successfully!',{
                    position: "top-right"
                });
              } else {
                toast.error('Transaction failed',{
                    position: "top-right"
                });
              }
            
        }catch(error){
            console.error(error);
            toast.error('An error occurred',{
                position: "top-right"
            });
        }finally{
            setLoadingButton(false)
        }
        
    }
    
    
    return (
        <main className='w-full px-4'>
          <div className='bg-white py-5 px-5 rounded-lg w-full overflow-x-scroll flex flex-col'>
            <div className='flex gap-5 border-b-2 pb-2 mx-4'>
                <h4 className={`cursor-pointer ${asset =='crypto'?'underline underline-offset-8 decoration-blue-500':''}`} onClick={()=>setAsset('crypto')}>Crypto</h4>
                <h4 className={`cursor-pointer ${asset =='rwa'?'underline underline-offset-8 decoration-blue-500':''}`} onClick={()=>setAsset('rwa')}>Real World Asset</h4>
            </div>
            {loading? (<Spinner/>):(
                <>
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
                    {currentPosts && currentPosts.map((loan)=>(
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
                        <button className='rounded px-4 text-green-800 bg-green-100  border-2 border-green-800 font-bold opacity-50 py-1' onClick={()=>lend(loan?.loanId.toString(),loan?.amount,loan?.borrower.borrower_address.toString())}>Lend</button>
                        </td>
                        <td className='p-3 text-sm text-gray-700'>
                        <Link href={'/dashboard/lend/1'}><BsThreeDotsVertical className='cursor-pointer  text-2xl'/></Link>
                        </td>
                    </tr>
                    ))}  
              
                </tbody>
                </table>
                <PaginationSection
                    totalPosts={allLoans?.length}
                    postsPerPage={postsPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
          /> 
                </>
                
            )}
             
          </div>
        </main>
    )
}

function PaginationSection({
    totalPosts,
    postsPerPage,
    currentPage,
    setCurrentPage,
  }: {
    totalPosts: any;
    postsPerPage: any;
    currentPage: any;
    setCurrentPage: any;
  }) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    const maxPageNum = 5; // Maximum page numbers to display at once
    const pageNumLimit = Math.floor(maxPageNum / 2); // Current page should be in the middle if possible
  
    let activePages = pageNumbers.slice(
      Math.max(0, currentPage - 1 - pageNumLimit),
      Math.min(currentPage - 1 + pageNumLimit + 1, pageNumbers.length)
    );
  
    const handleNextPage = () => {
      if (currentPage < pageNumbers.length) {
        setCurrentPage(currentPage + 1);
      }
    };
  
    const handlePrevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
  
    // Function to render page numbers with ellipsis
    const renderPages = () => {
      const renderedPages = activePages.map((page, idx) => (
        <PaginationItem
          key={idx}
          className={currentPage === page ? "bg-neutral-100 rounded-md" : ""}
        >
          <PaginationLink onClick={() => setCurrentPage(page)}>
            {page}
          </PaginationLink>
        </PaginationItem>
      ));
  
      // Add ellipsis at the start if necessary
      if (activePages[0] > 1) {
        renderedPages.unshift(
          <PaginationEllipsis
            key="ellipsis-start"
            onClick={() => setCurrentPage(activePages[0] - 1)}
          />
        );
      }
  
      // Add ellipsis at the end if necessary
      if (activePages[activePages.length - 1] < pageNumbers.length) {
        renderedPages.push(
          <PaginationEllipsis
            key="ellipsis-end"
            onClick={() =>
              setCurrentPage(activePages[activePages.length - 1] + 1)
            }
          />
        );
      }
  
      return renderedPages;
    };
  
    return (
      <div>
        <Pagination className='border border-green-500 rounded w-full flex items-center'>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={handlePrevPage} />
            </PaginationItem>
  
            {renderPages()}
  
            <PaginationItem>
              <PaginationNext onClick={handleNextPage} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    );
  }