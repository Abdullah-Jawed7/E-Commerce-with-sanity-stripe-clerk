"use client";
import userCartStore from '@/store'
import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const CartIcon = () => {
  const groupedItems = userCartStore((state)=>state.getGroupedItems())
  return (
   <Link href={'/cart'}
   className='flex items-center text-xs md:text-sm gap-1 md:gap-2 border
    border-gray-200 px-2 py-1 rounded-md shadow-md 
    hover:shadow-none hoverEffect'
   >
    <ShoppingBag className='text-darkBlue w-4 h-4 md:w-6 md:h-6 '/>
    <div className="flex flex-col">
        <p className="text-xs">
            <span className='font-semibold'>{groupedItems?.length ? groupedItems?.length : 0}</span> items
        </p>
        <p className="font-semibold">Cart</p>
    </div>
   
   </Link>
  )
}

export default CartIcon
