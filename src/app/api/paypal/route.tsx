// app/api/paypal/route.ts
import { NextResponse } from "next/server";

const PAYPAL_BASE = "https://api-m.paypal.com";
// ⚠️ Use sandbox for testing, change to "https://api-m.paypal.com" in production

export async function POST() {
    try {
        // 1. Get access token
        const auth = Buffer.from(
            `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
        ).toString("base64");

        const tokenRes = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
            method: "POST",
            headers: {
                "Authorization": `Basic ${auth}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: "grant_type=client_credentials",
        });

        const tokenData = await tokenRes.json();
        if (!tokenData.access_token) {
            throw new Error("Failed to get PayPal access token");
        }

        // 2. Create order
        const orderRes = await fetch(`${PAYPAL_BASE}/v2/checkout/orders`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${tokenData.access_token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                intent: "CAPTURE",
                purchase_units: [
                    {
                        amount: {
                            currency_code: "USD",
                            value: "27.99",
                        },
                    },
                ],
                application_context: {
                    brand_name: "Lifestyle Carnivore",
                    landing_page: "LOGIN",
                    user_action: "PAY_NOW",
                    return_url: "https://www.lifestylecarnivore.com/success",
                    cancel_url: "https://www.lifestylecarnivore.com/cancel",
                },
            }),
        });

        const orderData = await orderRes.json();

        // 3. Find approval link
        const approvalUrl = orderData.links?.find(
            (l: any) => l.rel === "approve"
        )?.href;

        if (!approvalUrl) {
            throw new Error("No approval link from PayPal");
        }

        return NextResponse.json({ url: approvalUrl });
    } catch (err) {
        console.error("PayPal error:", err);
        return NextResponse.json(
            { error: "Unable to create PayPal order" },
            { status: 500 }
        );
    }
}
