import React from 'react'
import Container from './container'
import Image from 'next/image'
import payment from '../../../public/payment.png'

function Footer() {
  return (
    <footer className='bg-lightBg text-sm'>
        <Container className='py-5 flex items-center justify-between'>
            <p className='text-gray-500'>
              Copyright © 2025  
               <span className='text-darkBlue 
               font-semibold'> BlueBerry </span>
                . All Rights Reserved.
            </p>
            <Image src={payment} alt='payment methods'
             className='w-64 object-cover' />
        </Container>
    </footer>
  )
}

export default Footer
