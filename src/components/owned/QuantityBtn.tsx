import { cn } from '@/lib/utils'
import React from 'react'
import { Button } from '../ui/button'
import {HiPlus , HiMinus} from 'react-icons/hi'
import { Product } from '../../../sanity.types'
import toast from 'react-hot-toast'
interface Props {
    product :Product;
    className?:string;
    borderStyle?:string;
}
const QuantityBtn = ({product ,className ,borderStyle}:Props) => {
    const itemCount = 0
    const handleRemoveProduct =()=>{
toast.success('Product removed Successfully')
    }
    const handleAddProduct =()=>{
toast.success('Product added Successfully')
    }
  return (
    <div className={cn('flex items-center gap-1 pb-1 text-base ')}>
        <Button
        variant={'outline'}
        size={'icon'}
        className='w-6 h-6'
        onClick={handleRemoveProduct}
        >
<HiMinus/>
        </Button>
        <span className='font-semibold w-8 text-darkBlue text-center'>{itemCount}</span>
        <Button
        variant={'outline'}
        size={'icon'}
        className='w-6 h-6'
        onClick={handleAddProduct}
        >
<HiPlus/>
        </Button>
      
    </div>
  )
}

export default QuantityBtn
