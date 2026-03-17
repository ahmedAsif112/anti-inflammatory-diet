import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Stripe from 'stripe';
import { prisma } from '../../../../lib/prisma';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
    try {
        const { sessionId, referrer } = await req.json();
        console.log('📥 Incoming session ID:', sessionId);

        if (!sessionId) {
            return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
        }

        // Retrieve the Stripe checkout session
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        console.log('✅ Stripe session retrieved:', session.id);

        if (!session) {
            return NextResponse.json({ error: 'Session not found' }, { status: 400 });
        }

        // Extract email from metadata or customer details
        const email = session.metadata?.email || session.customer_details?.email;

        if (!email) {
            return NextResponse.json({ error: 'Email not found in session' }, { status: 400 });
        }

        // Create email transporter
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Send email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: '30 Day Carnivore Diet Mealplan With 6 + Free Bonuses Cookbooks',
            html: `
                <p>Hi there, hope you are well</p>
                <br />
                <div>
                    Here's your Customised Meal-Plan with 6 free Carnivore Cookbooks.
                    <br />
                    Here you can Download: 
                    <a href="https://drive.google.com/drive/folders/1qZuHN_ZwpYtGDvVnu8--xKddsKK_Ojb_?usp=drive_link">Download PDF</a>
                </div>
                <br /><br />
                <div>
                    Regards,<br/>
                    Carnivore Diet Representative
                </div>
            `,
        });

        console.log('✅ Email sent successfully to:', email);

        // Log in database
        await prisma.emailLog.create({
            data: {
                email,
                status: 'Delivered',
                site: 'Carnivore',
                referrer: referrer || null,
            },
        });

        console.log('✅ Email log created in database');

        return NextResponse.json({
            success: true,
            email,
            message: 'Email sent successfully'
        });

    } catch (error: any) {
        console.error('❌ Error:', error);

        // Handle specific Stripe errors
        if (error.type === 'StripeInvalidRequestError') {
            return NextResponse.json(
                { error: 'Invalid session ID or session not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to send email', details: error.message },
            { status: 500 }
        );
    }
}