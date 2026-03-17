// app/api/checkout/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json(); // ✅ Fix: parse the incoming body
    const { planId, email } = body;       // Optional, in case you want to use it later

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [
        {
          // price: 'price_1SGJdjBTtdntfEmTBmNBEstD', test
          price: 'price_1RnCLcBTtdntfEmTuPipNFWP', // ✅ make sure this price ID is correct
          quantity: 1,
        },
      ],
      metadata: { email },
      mode: 'payment',
      success_url: 'https://www.lifestylecarnivore.com/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://www.lifestylecarnivore.com/cancel',
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json({ error: 'Unable to create checkout session' }, { status: 500 });
  }
}
