import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// ✅ Sirf ek link — apna Google Drive link yahan paste karo
const BUNDLE_LINK = "https://drive.google.com/uc?export=download&id=TUMHARA_FILE_ID";
const BUNDLE_NAME = "Anti-Inflammatory Complete Bundle 2026";

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ success: false, error: "No email provided" }, { status: 400 });
        }

        await resend.emails.send({
            from: "Anti-Inflammatory <orders@yourdomain.com>",
            to: email,
            subject: " Your Anti-Inflammatory Bundle is Here!",
            html: `
            <!DOCTYPE html>
            <html>
            <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
            <body style="margin: 0; padding: 0; background: #f5f2eb; font-family: Georgia, serif;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">

                    <!-- Header -->
                    <div style="background: #1a2e1f; border-radius: 16px 16px 0 0; padding: 32px 24px; text-align: center;">
                        <h1 style="color: white; margin: 0; font-size: 24px;">🎉 Your Bundle is Ready!</h1>
                        <p style="color: rgba(255,255,255,0.6); margin: 8px 0 0; font-size: 14px;">
                            Thank you for your purchase. Your download link is below.
                        </p>
                    </div>

                    <!-- Body -->
                    <div style="background: white; padding: 28px 24px; border-radius: 0 0 16px 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.06);">

                        <p style="color: #5a5a4a; font-size: 14px; line-height: 1.6; margin-top: 0;">
                            Hi there 👋 — Your complete 
                            <strong style="color: #1a2e1f;">${BUNDLE_NAME}</strong> 
                            is ready. Click the button below to download everything in one file.
                        </p>

                        <!-- What's inside -->
                        <div style="background: #E8F5EE; border-radius: 12px; padding: 16px 20px; margin: 20px 0;">
                            <p style="color: #2d5a3d; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 10px;">📦 Included in your bundle:</p>
                            <ul style="margin: 0; padding: 0; list-style: none;">
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
                                    <li style="color: #5a5a4a; font-size: 12px; padding: 3px 0;">
                                        <span style="color: #2d5a3d; font-weight: bold; margin-right: 6px;">✓</span>${b}
                                    </li>
                                `).join("")}
                            </ul>
                        </div>

                        <!-- Big Download Button -->
                        <div style="text-align: center; margin: 28px 0;">
                            <a href="${BUNDLE_LINK}"
                               style="display: inline-block; background: #2d5a3d; color: white; font-size: 16px; font-weight: bold; padding: 16px 40px; border-radius: 50px; text-decoration: none; letter-spacing: 0.3px;">
                                📥 Download Your Bundle
                            </a>
                        </div>

                        <!-- Tip -->
                        <div style="background: #f5f2eb; border-radius: 10px; padding: 14px 18px; margin-top: 4px;">
                            <p style="color: #2d5a3d; font-size: 12px; font-weight: bold; margin: 0 0 4px;">💡 Pro Tip</p>
                            <p style="color: #5a5a4a; font-size: 12px; margin: 0; line-height: 1.6;">
                                Save this email — your download link never expires and you can re-download anytime.
                            </p>
                        </div>

                        <!-- Footer -->
                        <p style="color: #9a9a8a; font-size: 11px; text-align: center; margin-top: 24px; margin-bottom: 0; line-height: 1.8;">
                            © 2026 Anti-Inflammatory — Nature's Remedy. All rights reserved.<br/>
                            ✅ 30-Day Money Back &nbsp;·&nbsp; ✅ Instant Access &nbsp;·&nbsp; ✅ Doctor-Reviewed
                        </p>
                    </div>
                </div>
            </body>
            </html>
            `,
        });

        return NextResponse.json({ success: true });

    } catch (err) {
        console.error("Email send error:", err);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}