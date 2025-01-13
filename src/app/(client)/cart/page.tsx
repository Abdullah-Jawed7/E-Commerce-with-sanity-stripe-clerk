"use client";

import { createCheckoutSession, Metadata } from '@/actions/createCheckoutSession';
import Container from '@/components/owned/container';
import EmptyCart from '@/components/owned/EmptyCart';
import Loader from '@/components/owned/Loader';
import NoUser from '@/components/owned/NoUser';
import PriceFormatter from '@/components/owned/PriceFormatter';
import QuantityBtn from '@/components/owned/QuantityBtn';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { urlFor } from '@/sanity/lib/image';
import userCartStore from '@/store';
import { useAuth, useUser } from '@clerk/nextjs';
import { ShoppingBag, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const CartPage = () => {
    const {deleteCartProduct ,getTotalPrice, getSubTotalPrice,getItemCount ,resetCart} = userCartStore();
    const groupedItems =userCartStore((state)=>state.getGroupedItems());
    const [loading , setLoading] = useState(false);
    const [isClient ,setIsClient] = useState(false);
    const {isSignedIn}= useAuth();
    const {user} = useUser();

    useEffect(()=>{
        setIsClient(true);
    },[])

    const handleCheckout = async ()=>{
        setLoading(true);
        try {
            const metadata:Metadata={
                orderNumber:crypto.randomUUID(),
                customerName:user?.fullName ?? "unknown",
                customerEmail:user?.emailAddresses[0].emailAddress ?? "unknown",
                clerkUserId:user?.id ?? ''
            }

            const checkoutUrl = await createCheckoutSession(groupedItems ,metadata)
            if (checkoutUrl) {
                console.log('checkoutUrl',checkoutUrl);
                window.location.href = checkoutUrl;
                
            }
            
        } catch (error) {
            console.error('Error while checking out',error);
            
        }finally{
            setLoading(false);
        }

    };
    const handleDeleteProduct = async (id:string)=>{
        setLoading(true);
        await deleteCartProduct(id);
        setLoading(false);
        toast.success( 'Product removed from cart');
    }
    const handleResetCart= async ()=>{
        const confirmed = window.confirm('Are you sure to reset your cart?');
        if(confirmed){
            setLoading(true);
            await resetCart();
            setLoading(false);
            toast.success('Cart Reset Successfully');
        }
    }
    if (!isClient) {
        return <Loader/>
    }
  return (
    <div>
  {isSignedIn ? (<Container>
    {groupedItems?.length ? 
    <>
    <div className='flex items-center gap-2 py-5'>
        <ShoppingBag className='h-6 w-6 text-primary'/>
        <h1 className='text-2xl font-semibold'>Shopping Cart</h1>
    </div>
    <div className="grid lg:grid-cols-3 md:gap-8">
        <div className="lg:col-span-1">
            <div className="hidden md:inline-block w-full bg-white p-6 rounded-lg border">
                <h2 className='text-xl font-semibold mb-4'>
                    Order Summary
                </h2>
                <div className='space-y-4'>
                    <div className="flex items-center justify-between">
                        <span>SubTotal</span>
                        <PriceFormatter amount={getSubTotalPrice()}/>
                    </div>
                    <div className="flex items-center justify-between">
                        <span>Discount</span>
                        <PriceFormatter amount={getSubTotalPrice() - getTotalPrice()}/>
                    </div>
                    <Separator/>
                    <div className="flex items-center justify-between">
                        <span>Total Price</span>
                        <PriceFormatter amount={getTotalPrice()}/>
                    </div>
                    <div className='flex flex-col gap-2'>
                    <Button onClick={handleCheckout} disabled={loading}
                    >{loading ? 'Processing' : 'Proceed to Checkout'}
                    </Button>
                    <Link className='text-sm text-center text-primary hover:underline hoverEffect hover:text-darkBlue' href={'/'}>Continue Shopping</Link>
                    </div>

                </div>
            </div>
        </div>
        <div className="lg:col-span-2">
            <div className='grid grid-cols-5 md:grid-cols-6 border rounded-tr-lg rounded-tl-lg bg-white p-2.5 text-xs sm:text-base font-semibold'>
                <h2 className='col-span-2 md:col-span-3'>Product</h2>
                <h2>Price</h2>
                <h2>Quantity</h2>
                <h2>Total</h2>
            </div>
            <div className='bg-white border border-t-0 rounded-br-lg rounded-bl-lg pb-96'>
            {groupedItems?.map(({product})=>{
                const itemCount = getItemCount(product?._id);
                return(
                    <div key={product?._id} 
                    className='grid grid-cols-5 md:grid-cols-6 border-b p-2.5 last:border-b-0'>
                        <div className='col-span-2 md:col-span-3 flex items-center'>
                            <Trash2
                            onClick={()=>handleDeleteProduct(product?._id)}
                            className='w-4 h-4 md:w-5 md:h-5 mr-1 text-gray-500 hover:text-red-600 hoverEffect'/>
                            {product?.image &&
                            <Link 
                            className='border p-0.5 md:p-1 mr-2 rounded-md overflow-hidden group'
                            href={`/product/${product?.slug?.current}`}>
                            <Image 
                            src={urlFor(product.image).url()} 
                            alt='product image ' 
                            width={300} 
                            height={300} 
                            className='w-10 h-10 md:w-full md:h-14 object-cover group-hover:scale-105 overflow-hidden hoverEffect '/>
                             </Link>}
                             <h2 className='text-sm text-pretty'>{product?.name}</h2>
                        </div>
                        <div className='flex items-center'>
                            <PriceFormatter amount={product?.price ? product?.price  : 0}/>
                            
                        </div>
                        <QuantityBtn product={product} className='text-sm gap-0 md:gap-1'/>
                        <div className='flex items-center'>
                            <PriceFormatter amount={product?.price ? product?.price * itemCount  : 0}/>
                            
                        </div>
                    </div>
                )
            })}
            <Button className='m-5 font-semibold' variant={'destructive'} onClick={handleResetCart}>Reset Cart</Button>
            </div>
        </div>
    </div>
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-lightBg">
        <div className="bg-white p-4 rounded-lg border mx-2">
            <h2 className='text-lg font-semibold mb-1'>
        Order Summary
            </h2>
            <div className='space-y-2'>
                    <div className="flex  justify-between">
                        <span>SubTotal</span>
                        <PriceFormatter amount={getSubTotalPrice()}/>
                    </div>
                    <div className="flex justify-between">
                        <span>Discount</span>
                        <PriceFormatter amount={getSubTotalPrice() - getTotalPrice()}/>
                    </div>
                    <Separator/>
                    <div className="flex  justify-between">
                        <span>Total Price</span>
                        <PriceFormatter amount={getTotalPrice()}/>
                    </div>
                    <div className='flex flex-col gap-2'>
                    <Button className='w-full ' size={'lg'} onClick={handleCheckout} disabled={loading}
                    >{loading ? 'Processing' : 'Proceed to Checkout'}
                    </Button>
                    <Link className='block text-sm text-center text-primary hover:underline hoverEffect hover:text-darkBlue' 
                    href={'/'}>Continue Shopping</Link>
                    </div>

                </div>
        </div>
    </div>
    </>
        
        
        
        
        :<div><EmptyCart/></div>}
  </Container>


): (<NoUser/>)}
    </div>
  )
}

export default CartPage
