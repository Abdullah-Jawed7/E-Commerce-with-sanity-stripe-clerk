'use server';
import stripe from "@/lib/stripe";
import { urlFor } from "@/sanity/lib/image";
import { CartItem } from "@/store";
import Stripe from "stripe";

export interface Metadata {
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    clerkUserId: string;
}
interface GroupedItem {
    product:CartItem['product'];
    quantity:number;
}


export async function createCheckoutSession(items:GroupedItem[] , metadata: Metadata) {
    try {
        const itemsWithoutPrice = items.filter((item)=>!item.product.price);
if (itemsWithoutPrice.length >0) {
    throw new Error('Some items does not have price');
    
}
const customers = await stripe.customers.list({
    email:metadata.customerEmail,
    limit:1
})
 const customerId = customers.data.length > 0? customers.data[0].id : '';
 const sessionPayload :Stripe.Checkout.SessionCreateParams ={
    metadata:{
        orderNumber:metadata.orderNumber,
        customerName:metadata.customerName,
        customerEmail:metadata.customerEmail,
        clerkUserId:metadata.clerkUserId
    },
    mode:'payment',
    allow_promotion_codes:true,
    payment_method_types:['card'],
    success_url: `https://blueeberry.vercel.app/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
    cancel_url:`https://blueeberry.vercel.app/cart`,
    line_items: items.map((item)=>({
        price_data:{
            currency:'USD',
            unit_amount:Math.round(item.product.price! *  100),
            product_data:{
                name:item.product.name || 'unnamed Product',
                description:item.product.description|| 'Product description are not available yet',
                metadata:{id:item.product._id},
                images : item?.product?.image ?[urlFor(item.product.image).url()]: undefined
            }
        },
        quantity:item.quantity
    })),
 };
 console.log(process.env.NEXT_PUBLIC_BASE_URL);
 
 if (customerId) {
    sessionPayload.customer = customerId;
 }else{
    sessionPayload.customer_email =metadata?.customerEmail
 }
const session = await stripe.checkout.sessions.create(sessionPayload)
return session.url;

    } catch (error) {
        console.error('Error while creating checking out',error);
        throw(error)
    }
    // const response = await fetch('/api/create-checkout-session', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(metadata),
    // });
    // return response.json();
}