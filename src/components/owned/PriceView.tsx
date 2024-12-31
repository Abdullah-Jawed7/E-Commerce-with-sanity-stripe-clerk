import React from 'react'
import PriceFormatter from './PriceFormatter';
import { cn } from '@/lib/utils';
interface Props{
    price:number |undefined;
    discount:number |undefined;
    label?:string;
    className?:string;
}
const PriceView = ({price, discount , label ,className}:Props) => {
  return (
    <div className='flex items-center justify-between gap-5 '>
        <div className="flex items-center gap-2">
           <PriceFormatter amount={price} className={className}/>
           {price && discount && (
            <PriceFormatter amount={price + (price * discount / 100)}
            className={cn('line-through text-xs font-medium', className)}
            />
           )}
        </div>
        <p className="text-gray-500">{label}</p>
      
    </div>
  )
}

export default PriceView
