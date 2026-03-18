import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
    try {
        const { session_id } = await req.json();

        if (!session_id) {
            return NextResponse.json({ valid: false }, { status: 400 });
        }

        const session = await stripe.checkout.sessions.retrieve(session_id);

        // Only valid if payment is complete
        if (session.payment_status !== "paid") {
            return NextResponse.json({ valid: false }, { status: 400 });
        }

        return NextResponse.json({
            valid: true,
            email: session.customer_email,
            amount: session.amount_total,
        });

    } catch {
        return NextResponse.json({ valid: false }, { status: 400 });
    }
}