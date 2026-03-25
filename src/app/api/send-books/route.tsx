import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const BUNDLE_LINK = "https://drive.google.com/drive/folders/1t1LK1B65wxp31RlMgzhVqX9gR4XdaHes?usp=sharing";
const BUNDLE_NAME = "Anti-Inflammatory Complete Bundle 2026";
const FROM_EMAIL = "orders@antiinflammationguide.store";
// hello
export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ success: false, error: "No email provided" }, { status: 400 });
        }

        const { data, error } = await resend.emails.send({
            from: `Anti-Inflammation Guide <${FROM_EMAIL}>`,
            to: email,
            // ✅ No spam words — clean subject
            subject: "Your order is confirmed — here is your download link",
            // ✅ Anti-spam headers
            headers: {
                "List-Unsubscribe": `<mailto:${FROM_EMAIL}?subject=unsubscribe>`,
                "X-Entity-Ref-ID": `bundle-${Date.now()}`,
            },
            // ✅ Plain text version — very important for spam filters
            text: `
Hi there,

Your ${BUNDLE_NAME} is ready to download.

Click here to access your bundle:
${BUNDLE_LINK}

What's included:
- The Complete Anti-Inflammatory Diet Cookbook
- Anti-Inflammatory Food Guide 2026
- The Plant-Based Anti-Inflammatory Cookbook
- Anti-Inflammatory Food Management Guide
- The Anti-Inflammatory Family Cookbook 2026
- Super Easy Anti-Inflammatory Diet Cookbook
- Overcoming Inflammation Recipe Book
- Full-Color 30-Day Meal Plan + 3 Bonus Books
- Anti-Inflammatory Food Guide (Complete Edition)
- The Complete Diet Cookbook for Beginners

Save this email — your link never expires.

© 2026 Anti-Inflammation Guide. All rights reserved.
To unsubscribe, reply with "unsubscribe" in the subject.
            `.trim(),
            html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Order is Confirmed</title>
</head>
<body style="margin:0;padding:0;background:#f5f2eb;font-family:Georgia,serif;">
    <div style="max-width:600px;margin:0 auto;padding:20px;">

        <!-- Header -->
        <div style="background:#1a2e1f;border-radius:16px 16px 0 0;padding:32px 24px;text-align:center;">
            <h1 style="color:white;margin:0;font-size:22px;font-weight:bold;">
                Order Confirmed
            </h1>
            <p style="color:rgba(255,255,255,0.6);margin:8px 0 0;font-size:14px;">
                Thank you for your purchase. Your download link is ready.
            </p>
        </div>

        <!-- Body -->
        <div style="background:white;padding:28px 24px;border-radius:0 0 16px 16px;">

            <p style="color:#5a5a4a;font-size:14px;line-height:1.8;margin-top:0;">
                Hi there,
            </p>
            <p style="color:#5a5a4a;font-size:14px;line-height:1.8;">
                Your <strong style="color:#1a2e1f;">${BUNDLE_NAME}</strong> is ready. 
                Click the button below to access your files.
            </p>

            <!-- What's inside -->
            <div style="background:#E8F5EE;border-radius:12px;padding:16px 20px;margin:20px 0;">
                <p style="color:#2d5a3d;font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;margin:0 0 10px;">
                    Included in your order:
                </p>
                <ul style="margin:0;padding:0;list-style:none;">
                    ${[
                    "The Complete Anti-Inflammatory Diet Cookbook",
                    "Anti-Inflammatory Food Guide 2026",
                    "The Plant-Based Anti-Inflammatory Cookbook",
                    "Anti-Inflammatory Food Management Guide",
                    "The Anti-Inflammatory Family Cookbook 2026",
                    "Super Easy Anti-Inflammatory Diet Cookbook",
                    "Overcoming Inflammation Recipe Book",
                    "Full-Color 30-Day Meal Plan + 3 Bonus Books",
                    "Anti-Inflammatory Food Guide (Complete Edition)",
                    "The Complete Diet Cookbook for Beginners",
                ].map(b => `
                        <li style="color:#5a5a4a;font-size:13px;padding:4px 0;line-height:1.5;">
                            <span style="color:#2d5a3d;font-weight:bold;margin-right:6px;">✓</span>${b}
                        </li>
                    `).join("")}
                </ul>
            </div>

            <!-- Download Button -->
            <div style="text-align:center;margin:28px 0;">
                <a href="${BUNDLE_LINK}"
                   style="display:inline-block;background:#2d5a3d;color:white;font-size:15px;font-weight:bold;padding:14px 36px;border-radius:50px;text-decoration:none;">
                    Access Your Bundle
                </a>
            </div>

            <!-- Tip -->
            <div style="background:#f5f2eb;border-radius:10px;padding:14px 18px;">
                <p style="color:#2d5a3d;font-size:12px;font-weight:bold;margin:0 0 4px;">Note</p>
                <p style="color:#5a5a4a;font-size:12px;margin:0;line-height:1.6;">
                    Save this email — your download link never expires and you can access it anytime.
                </p>
            </div>

            <!-- Footer -->
            <p style="color:#9a9a8a;font-size:11px;text-align:center;margin-top:24px;margin-bottom:0;line-height:1.8;">
                © 2026 Anti-Inflammation Guide. All rights reserved.<br/>
                30-Day Money Back &nbsp;·&nbsp; Instant Access &nbsp;·&nbsp; Doctor-Reviewed<br/><br/>
                <a href="mailto:${FROM_EMAIL}?subject=unsubscribe" 
                   style="color:#9a9a8a;font-size:10px;">
                    Unsubscribe
                </a>
            </p>
        </div>
    </div>
</body>
</html>
            `,
        });

        if (error) {
            console.error("Resend error:", error);
            return NextResponse.json({ success: false, error }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });

    } catch (err) {
        console.error("Server error:", err);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}