import React from 'react';

type FooterProps = {
    
};

const Footer:React.FC<FooterProps> = () => {
    
    return <div className='flex items-center bg-black flex-col py-10'>
        <h1 className='text-green-600 font-bold text-2xl pb-5'>Subscribe for newsletter, offers and articles</h1>
        <p className='text-gray-500 pb-5'>To be able to receive a loan on fundflex, you must create a loan application. After creating the application, you become the boorower.</p>
        <div className='flex gap-2'>
            <input type='email' placeholder='Email Address' className='rounded p-4'/>
            <button className='bg-green-600 text-white p-4'>Sign up here</button>
        </div>
    </div>
}
export default Footer;