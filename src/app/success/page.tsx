"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

type Status = "verifying" | "sending" | "success" | "error";

function SuccessContent() {
    const router = useRouter();
    const params = useSearchParams();
    const session_id = params.get("session_id");

    const [status, setStatus] = useState<Status>("verifying");
    const [email, setEmail] = useState("");

    useEffect(() => {
        // No session_id → go home immediately
        if (!session_id) {
            router.replace("/");
            return;
        }

        async function run() {
            try {
                // Step 1 — Verify Stripe session
                setStatus("verifying");
                const verifyRes = await fetch("/api/verify-session", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ session_id }),
                });
                const verifyData = await verifyRes.json();

                if (!verifyData.valid) {
                    // Invalid / unpaid session → go home
                    router.replace("/");
                    return;
                }

                // Step 2 — Get email (from Stripe or localStorage fallback)
                const userEmail =
                    verifyData.email ||
                    localStorage.getItem("pending_email") ||
                    "";

                if (!userEmail) {
                    router.replace("/");
                    return;
                }

                setEmail(userEmail);

                // Step 3 — Send books
                setStatus("sending");
                await fetch("/api/send-books", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: userEmail }),
                });

                // Step 4 — Clean up localStorage
                localStorage.removeItem("pending_email");

                setStatus("success");

            } catch {
                setStatus("error");
            }
        }

        run();
    }, [session_id, router]);

    /* ── Verifying UI ── */
    if (status === "verifying" || status === "sending") {
        return (
            <main className="min-h-screen bg-[#E8F5EE] flex items-center justify-center px-4">
                <div className="text-center flex flex-col items-center gap-5">
                    <div className="w-16 h-16 rounded-full border-4 border-[#2d5a3d] border-t-transparent animate-spin" />
                    <p className="text-[#1a2e1f] font-bold text-lg">
                        {status === "verifying" ? "Verifying your payment..." : "Sending your bundle..."}
                    </p>
                    <p className="text-[#5a5a4a] text-sm">Please don't close this page.</p>
                </div>
            </main>
        );
    }

    /* ── Error UI ── */
    if (status === "error") {
        return (
            <main className="min-h-screen bg-[#E8F5EE] flex items-center justify-center px-4">
                <div className="text-center max-w-md flex flex-col items-center gap-5">
                    <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-3xl">❌</div>
                    <h1 className="text-2xl font-extrabold text-[#1a2e1f]">Something went wrong</h1>
                    <p className="text-[#5a5a4a] text-sm leading-relaxed">
                        Your payment was successful but we had trouble sending your books.
                        Please contact support with your order email and we'll send them manually.
                    </p>
                    <a
                        href="mailto:support@yourdomain.com"
                        className="inline-flex items-center gap-2 bg-[#2d5a3d] text-white font-bold text-sm px-6 py-3 rounded-full"
                    >
                        ✉️ Contact Support
                    </a>
                </div>
            </main>
        );
    }

    /* ── Success UI ── */
    return (
        <main className="min-h-screen bg-[#E8F5EE] py-14 sm:py-20 px-4">
            <div className="max-w-lg mx-auto text-center flex flex-col items-center gap-6">

                {/* Icon */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#2d5a3d] flex items-center justify-center shadow-2xl shadow-[#2d5a3d]/25 text-4xl sm:text-5xl">
                    🎉
                </div>

                {/* Heading */}
                <div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1a2e1f] leading-tight mb-2">
                        Payment Successful!
                    </h1>
                    <p className="text-[#5a5a4a] text-sm sm:text-base leading-relaxed">
                        Your complete Anti-Inflammatory Bundle has been sent to:
                    </p>
                    <p className="text-[#2d5a3d] font-extrabold text-base sm:text-lg mt-1 break-all">
                        {email}
                    </p>
                </div>

                {/* Info card */}
                <div className="w-full bg-white rounded-2xl border border-[#d4edda] shadow-sm px-5 py-5 text-left">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#8a8a7a] mb-3">
                        📦 What's been sent to your inbox:
                    </p>
                    <ul className="flex flex-col gap-2">
                        {[
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
                        ].map((b) => (
                            <li key={b} className="flex items-start gap-2 text-xs text-[#5a5a4a]">
                                <span className="text-[#2d5a3d] font-bold flex-shrink-0">✓</span>
                                <span>{b}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Tip */}
                <div className="w-full bg-[#1a2e1f] rounded-2xl px-5 py-4 text-left">
                    <p className="text-[#a8d5b5] text-xs font-bold mb-1">💡 Didn't receive the email?</p>
                    <p className="text-white/60 text-xs leading-relaxed">
                        Check your spam/junk folder. If it's not there within 5 minutes,
                        contact us at{" "}
                        <a href="mailto:support@yourdomain.com" className="text-[#a8d5b5] underline">
                            support@yourdomain.com
                        </a>{" "}
                        with your order email and we'll resend immediately.
                    </p>
                </div>

                {/* Back home */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 border border-[#2d5a3d] text-[#2d5a3d] font-bold text-sm px-6 py-3 rounded-full hover:bg-[#2d5a3d] hover:text-white transition-all duration-200"
                >
                    ← Back to Home
                </Link>

            </div>
        </main>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={
            <main className="min-h-screen bg-[#E8F5EE] flex items-center justify-center px-4">
                <div className="text-center flex flex-col items-center gap-5">
                    <div className="w-16 h-16 rounded-full border-4 border-[#2d5a3d] border-t-transparent animate-spin" />
                    <p className="text-[#1a2e1f] font-bold text-lg">Loading...</p>
                </div>
            </main>
        }>
            <SuccessContent />
        </Suspense>
    );
}