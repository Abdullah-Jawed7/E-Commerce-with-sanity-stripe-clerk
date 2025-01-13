"use client";
import { cn } from '@/lib/utils'
import React from 'react'
import { Button } from '../ui/button'
import {HiPlus , HiMinus} from 'react-icons/hi'
import { Product } from '../../../sanity.types'
import toast from 'react-hot-toast'
import userCartStore from '@/store'
interface Props {
    product :Product;
    className?:string;
}
const QuantityBtn = ({product ,className }:Props) => {
   const{getItemCount ,addItem ,removeItem} = userCartStore();
    const itemCount = getItemCount(product._id);
    const handleRemoveProduct =()=>{
        removeItem(product._id)
toast.success('Quantity Decreased Successfully')
    }
    const handleAddProduct =()=>{
        addItem(product)
toast.success('Quantity Increased Successfully')
    }

  return (
    <div className={cn('flex items-center gap-1 pb-1 text-base ' ,className)}>
        <Button
        variant={'outline'}
        size={'icon'}
        className='w-4 h-4 sm:w-6 sm:h-6'
        onClick={handleRemoveProduct}
        >
<HiMinus/>
        </Button>
        <span className='font-semibold w-8 text-darkBlue text-center'>{itemCount}</span>
        <Button
        variant={'outline'}
        size={'icon'}
        className='w-4 h-4 sm:w-6 sm:h-6'
        onClick={handleAddProduct}
        >
<HiPlus/>
        </Button>
      
    </div>
  )
}

export default QuantityBtn
