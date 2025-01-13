'use client'
import React, { useState } from 'react'
import { ORDERS_QUERYResult } from '../../../sanity.types'
import { TableBody, TableCell, TableRow } from '../ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import PriceFormatter from './PriceFormatter'
import OrderProducts from './orderProducts'

const OrderDetails = ({orders}:{orders:ORDERS_QUERYResult}) => {
  const [selectedOrder ,setSelectedOrder] = useState<ORDERS_QUERYResult[number] | null>(null)
  const handleOrderClicked =(order:ORDERS_QUERYResult[number])=>{
    setSelectedOrder(order)
  }  
  return (
      <>
   <TableBody>
    <TooltipProvider>
        {orders.map((order)=>(
          <Tooltip key={order?.orderDate}>
            <TooltipTrigger asChild>
              <TableRow onClick={()=>handleOrderClicked(order)}
                className='cursor-pointer hover:bg-gray-100 h-12'>
                <TableCell className='font-medium'>
                  ...{order?.orderNumber?.slice(-10) ?? "N/A"}
                </TableCell>
                <TableCell className='hidden md:table-cell'>
                  {order?.orderDate && new Date(order?.orderDate)?.toLocaleDateString()}
                </TableCell>
                <TableCell >
                  {order?.customerName}
                </TableCell>
                <TableCell className='hidden sm:table-cell'>
                  {order?.email}
                </TableCell>
                <TableCell >
                <PriceFormatter
                amount={order?.totalPrice}
                className='text-black font-medium'/>
                </TableCell>
                <TableCell >
                  {order?.status && (<span 
                  className={`capitalize px-2 py-1 rounded-full text-xs font-semibold ${order?.status === "paid"? 'text-gray-600 bg-green-100 ':'bg-yellow-100 text-yellow-600'}`}>
                    {order.status}</span>)}
                </TableCell>
              </TableRow>
            </TooltipTrigger>
            <TooltipContent>
              <p>Click to see order details</p>
            </TooltipContent>
          </Tooltip>
        ))}
    </TooltipProvider>

   </TableBody>
   <OrderProducts order={selectedOrder} 
   isOpen={!!selectedOrder}
   onClose={()=>setSelectedOrder(null)}/>
   </>
  )
}

export default OrderDetails
