import Link from 'next/link';
import React from 'react';
import { FaArrowRight } from "react-icons/fa";

type HomeCardProps = {
    Icon: React.ElementType
    h1:string
    description:string
    link:string
};

const HomeCard:React.FC<HomeCardProps> = ({Icon,h1,description,link}) => {
    
    return (
     <div className='bg-white p-4 flex flex-col items-center'>
        <div className="flex items-center cursor-pointer justify-center">
         {Icon && <Icon className="h-8 w-8 text-green-500" />}
        </div>
        <h1 className='font-bold text-xl'>{h1}</h1>
        <p className='text-gray-400'>{description}</p>
        <Link href={link} className=' flex items-center mt-4 text-green-600 gap-2'>Click here to apply<FaArrowRight/></Link>
     </div>)
}
export default HomeCard;