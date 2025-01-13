import Stripe from 'stripe';
if (!process.env.STRIPE_API_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_API_KEY as string,{
    apiVersion: '2024-12-18.acacia'
})
export default stripe;