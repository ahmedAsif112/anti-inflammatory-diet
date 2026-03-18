"use client";

import Image from "next/image";
import { useState } from "react";
import heroDesktop from "@/assets/bundle.jpg"; // replace with your bundle image

const BONUSES = [
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
];

export default function ProductSection() {
    const [qty, setQty] = useState(1);

    return (
        <section className="w-full bg-white py-10 sm:py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">

                {/* Top badge */}
                <div className="flex justify-center mb-6 sm:mb-8">
                    <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-[#2d5a3d] bg-[#2d5a3d]/10 border border-[#2d5a3d]/20 px-3 sm:px-4 py-1.5 rounded-full text-center">
                        🔥 Limited Time Offer — 80% Off Today Only
                    </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-16 items-start">

                    {/* LEFT — Bundle Image */}
                    <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#f5f2eb] flex items-center justify-center p-3 sm:p-6 lg:p-8">
                        <Image
                            src={heroDesktop}
                            alt="Exclusive Bundle Offer 2026"
                            width={900}
                            height={560}
                            className="w-full h-auto object-contain rounded-xl"
                            priority
                        />
                        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-red-500 text-white text-[10px] sm:text-xs font-extrabold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-lg">
                            SALE
                        </div>
                    </div>

                    {/* RIGHT — Purchase Panel */}
                    <div className="flex flex-col gap-4 sm:gap-5">

                        {/* Title */}
                        <div>
                            <p className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-[#2d5a3d] mb-1 leading-relaxed">
                                Exclusive Bundle Offer 2026 — Includes 10+ Free Bonuses!
                            </p>
                            <h2 className="text-xl sm:text-2xl lg:text-4xl font-extrabold text-[#1a2e1f] leading-tight">
                                The Complete Anti-Inflammatory Diet Cookbook
                            </h2>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                            <span className="text-sm sm:text-lg text-[#9a9a8a] line-through font-semibold">$100.00 USD</span>
                            <span className="text-2xl sm:text-3xl font-extrabold text-[#2d5a3d]">$19.99 USD</span>
                            <span className="bg-red-100 text-red-600 text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full">Save 80%</span>
                        </div>

                        <p className="text-[10px] sm:text-xs text-[#9a9a8a]">
                            Taxes included. Instant digital download after purchase.
                        </p>

                        {/* What's included */}
                        <div className="bg-[#f5f2eb] rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-[#e8e4dc]">
                            <p className="text-[10px] sm:text-xs font-bold text-[#1a2e1f] uppercase tracking-wider mb-2 sm:mb-3">
                                📦 What's Inside This Bundle:
                            </p>
                            <ul className="flex flex-col gap-1 sm:gap-1.5">
                                {BONUSES.map((b, i) => (
                                    <li key={i} className="flex items-start gap-2 text-[10px] sm:text-xs text-[#5a5a4a]">
                                        <span className="text-[#2d5a3d] font-bold flex-shrink-0 mt-px">✓</span>
                                        <span>{b}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Quantity */}


                        {/* Buttons */}
                        <div className="flex flex-col gap-2.5 sm:gap-3">

                            <a
                                href="/email"
                                className="w-full inline-flex items-center justify-center gap-2 bg-[#2d5a3d] hover:bg-[#245033] text-white font-extrabold text-xs sm:text-sm py-3 sm:py-3.5 rounded-xl sm:rounded-2xl shadow-lg shadow-[#2d5a3d]/30 transition-all duration-200 active:scale-95"
                            >
                                Buy Your Plan Now — $19.99
                            </a>
                        </div>

                        {/* Trust badges */}
                        <div className="grid grid-cols-3 gap-2">
                            {[
                                { icon: "🔒", label: "Secure Checkout" },
                                { icon: "↩️", label: "30-Day Refund" },
                                { icon: "⚡", label: "Instant Access" },
                            ].map(t => (
                                <div key={t.label} className="flex flex-col items-center gap-1 bg-[#f5f2eb] rounded-xl py-2.5 sm:py-3 px-1 sm:px-2 text-center border border-[#e8e4dc]">
                                    <span className="text-base sm:text-lg">{t.icon}</span>
                                    <span className="text-[9px] sm:text-[10px] font-semibold text-[#5a5a4a] leading-tight">{t.label}</span>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}