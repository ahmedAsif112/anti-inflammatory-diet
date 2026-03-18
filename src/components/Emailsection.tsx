"use client";

import { useState } from "react";

export default function EmailCaptureSection() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const validate = (val: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        setError("");

        // Save email to localStorage
        const existing = JSON.parse(localStorage.getItem("subscribers") || "[]");
        if (!existing.includes(email)) {
            existing.push(email);
            localStorage.setItem("subscribers", JSON.stringify(existing));
        }
        localStorage.setItem("pending_email", email);

        // Redirect to Stripe checkout
        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const { url } = await res.json();
            window.location.href = url;
        } catch {
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <section className="w-full bg-[#E8F5EE] py-12 sm:py-16 lg:py-24">
            <div className="max-w-2xl mx-auto px-4 sm:px-8 text-center">

                {!submitted ? (
                    <>
                        {/* Icon */}
                        <div className="flex justify-center mb-5">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#2d5a3d] flex items-center justify-center shadow-xl shadow-[#2d5a3d]/20">
                                <span className="text-2xl sm:text-3xl">📧</span>
                            </div>
                        </div>

                        {/* Heading */}
                        <span className="inline-block text-[10px] sm:text-xs font-bold tracking-widest uppercase text-[#2d5a3d] bg-[#2d5a3d]/10 border border-[#2d5a3d]/20 px-3 sm:px-4 py-1.5 rounded-full mb-4">
                            One Step Away
                        </span>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1a2e1f] leading-tight tracking-tight mb-3">
                            Enter Your Email to{" "}
                            <span className="text-[#2d5a3d]">Claim Your Bundle</span>
                        </h2>
                        <p className="text-[#5a5a4a] text-xs sm:text-sm leading-relaxed mb-8 max-w-md mx-auto">
                            Enter your email below to reserve your spot. You'll be taken to a secure checkout page to complete your purchase — then your full bundle gets delivered straight to your inbox.
                        </p>

                        {/* What they'll receive */}
                        <div className="bg-white border border-[#d4edda] rounded-2xl px-4 sm:px-6 py-4 sm:py-5 mb-8 text-left shadow-sm">
                            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#8a8a7a] mb-3">
                                📚 What's included after purchase:
                            </p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                                {[
                                    "The Complete Anti-Inflammatory Diet Cookbook",
                                    "Anti-Inflammatory Food Guide 2026",
                                    "The Plant-Based Anti-Inflammatory Cookbook",
                                    "Anti-Inflammatory Food Management Guide",
                                    "The Anti-Inflammatory Family Cookbook",
                                    "10+ Bonus Guides & Meal Plans",
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-2 text-[10px] sm:text-xs text-[#5a5a4a]">
                                        <span className="text-[#2d5a3d] font-bold flex-shrink-0 mt-px">✓</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (error) setError("");
                                    }}
                                    placeholder="Enter your email address..."
                                    className={`flex-1 bg-white border ${error ? "border-red-400" : "border-[#c4dfc9]"} text-[#1a2e1f] placeholder-[#aaaaaa] text-sm px-4 py-3.5 rounded-xl sm:rounded-full focus:outline-none focus:ring-2 focus:ring-[#2d5a3d]/30 focus:border-[#2d5a3d] transition-all duration-200 shadow-sm`}
                                />
                                <button
                                    type="submit"
                                    className="flex-shrink-0 inline-flex items-center justify-center gap-2 bg-[#2d5a3d] hover:bg-[#245033] active:scale-95 text-white font-bold text-sm px-6 sm:px-8 py-3.5 rounded-xl sm:rounded-full shadow-lg shadow-[#2d5a3d]/25 transition-all duration-200 whitespace-nowrap"
                                >
                                    Continue to Checkout →
                                </button>
                            </div>

                            {error && (
                                <p className="text-red-500 text-xs text-left px-1">{error}</p>
                            )}
                        </form>

                        <p className="text-[10px] sm:text-xs text-[#9a9a8a] mt-4">
                            🔒 Secure checkout. Your email is safe with us — no spam, ever.
                        </p>
                    </>
                ) : (
                    /* Success — prompt to pay */
                    <div className="flex flex-col items-center gap-5 py-4">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#2d5a3d] flex items-center justify-center shadow-xl shadow-[#2d5a3d]/20">
                            <span className="text-3xl sm:text-4xl">🎉</span>
                        </div>
                        <div>
                            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1a2e1f] mb-2">
                                Email Saved!
                            </h3>
                            <p className="text-[#5a5a4a] text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
                                We've reserved your spot for{" "}
                                <strong className="text-[#2d5a3d]">{email}</strong>.
                                Complete your purchase to instantly receive your full bundle.
                            </p>
                        </div>

                        {/* Price reminder */}
                        <div className="bg-white border border-[#d4edda] rounded-2xl px-5 py-4 w-full max-w-sm shadow-sm">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-bold text-[#1a2e1f]">Exclusive Bundle 2026</span>
                                <span className="text-xs bg-red-100 text-red-600 font-bold px-2 py-0.5 rounded-full">80% OFF</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[#9a9a8a] line-through text-sm">$100.00</span>
                                <span className="text-xl font-extrabold text-[#2d5a3d]">$19.99</span>
                            </div>
                        </div>

                        <a
                            href="#"
                            className="w-full max-w-sm inline-flex items-center justify-center gap-2 bg-[#2d5a3d] hover:bg-[#245033] active:scale-95 text-white font-extrabold text-sm sm:text-base px-8 py-4 rounded-2xl shadow-lg shadow-[#2d5a3d]/25 transition-all duration-200"
                        >
                            🔒 Proceed to Secure Checkout
                        </a>

                        <button
                            onClick={() => { setSubmitted(false); setEmail(""); }}
                            className="text-xs text-[#9a9a8a] hover:text-[#2d5a3d] underline transition-colors"
                        >
                            Use a different email
                        </button>
                    </div>
                )}

            </div>
        </section>
    );
}