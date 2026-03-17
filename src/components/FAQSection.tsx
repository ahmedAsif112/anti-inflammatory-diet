"use client";

import { useState } from "react";

const FAQS = [
    {
        q: "What exactly is the Anti-Inflammatory Diet Plan?",
        a: "It's a complete 80-day eating program built around foods that reduce chronic inflammation in your body. You get meal plans, shopping lists, recipes, and 10+ bonus guides — everything you need to start healing naturally.",
    },
    {
        q: "Do I need any cooking experience to follow this plan?",
        a: "Not at all. Every recipe is beginner-friendly with simple ingredients you can find at any grocery store. If you can boil water, you can follow this plan.",
    },
    {
        q: "How soon will I start feeling results?",
        a: "Most people report less bloating, better sleep, and more energy within the first 7 days. Significant changes in joint pain and inflammation markers typically show within 3–4 weeks.",
    },
    {
        q: "Is this plan suitable for men and women both?",
        a: "Yes. While we have specific guidance for women's hormonal health, the core anti-inflammatory principles benefit everyone — regardless of age or gender.",
    },
    {
        q: "Do I have to give up all my favourite foods?",
        a: "No strict elimination required. The plan focuses on adding healing foods rather than obsessing over restriction. You'll naturally crowd out the bad with the good.",
    },
    {
        q: "Is this a digital product or physical book?",
        a: "It's 100% digital — instant access after purchase. You can read it on your phone, tablet, or laptop. No waiting for shipping.",
    },
    {
        q: "What if it doesn't work for me?",
        a: "We offer a full 30-day money-back guarantee. If you follow the plan and don't see results, just email us and we'll refund every penny. No questions asked.",
    },
    {
        q: "Is this plan doctor-reviewed?",
        a: "Yes. The nutritional guidelines in this plan are reviewed by health professionals and grounded in peer-reviewed research on inflammation and diet.",
    },
];

function FAQItem({ faq, index }: { faq: typeof FAQS[0]; index: number }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`border rounded-2xl overflow-hidden transition-all duration-300 ${open ? "border-[#2d5a3d] shadow-sm shadow-[#2d5a3d]/10" : "border-[#e8e4dc]"}`}
        >
            <button
                onClick={() => setOpen((p) => !p)}
                className="w-full flex items-center justify-between gap-4 px-4 sm:px-6 py-4 sm:py-5 text-left bg-white hover:bg-[#f9f7f3] transition-colors duration-200"
            >
                <div className="flex items-center gap-3 sm:gap-4">
                    <span className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#2d5a3d]/10 text-[#2d5a3d] text-[10px] sm:text-xs font-extrabold flex items-center justify-center">
                        {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-[#1a2e1f] leading-snug">
                        {faq.q}
                    </span>
                </div>
                <span
                    className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${open ? "bg-[#2d5a3d] border-[#2d5a3d] rotate-45" : "bg-white border-[#d4cfc6]"}`}
                >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M6 1v10M1 6h10" stroke={open ? "white" : "#1a2e1f"} strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                </span>
            </button>

            {/* Answer */}
            <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{ maxHeight: open ? "300px" : "0px", opacity: open ? 1 : 0 }}
            >
                <p className="px-4 sm:px-6 pb-4 sm:pb-5 text-xs sm:text-sm text-[#5a5a4a] leading-relaxed pt-1 border-t border-[#f0ede6]">
                    {faq.a}
                </p>
            </div>
        </div>
    );
}

export default function FAQSection() {
    return (
        <section className="w-full bg-[#f5f2eb] py-12 sm:py-16 lg:py-24">
            <div className="max-w-3xl mx-auto px-4 sm:px-8 lg:px-6">

                {/* Header */}
                <div className="text-center mb-10 sm:mb-14">
                    <span className="inline-block text-[10px] sm:text-xs font-bold tracking-widest uppercase text-[#2d5a3d] bg-[#2d5a3d]/10 border border-[#2d5a3d]/20 px-3 sm:px-4 py-1.5 rounded-full mb-4">
                        Got Questions?
                    </span>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1a2e1f] leading-tight tracking-tight mb-3">
                        Frequently Asked{" "}
                        <span className="text-[#2d5a3d]">Questions</span>
                    </h2>
                    <p className="text-[#5a5a4a] text-xs sm:text-sm leading-relaxed max-w-lg mx-auto">
                        Everything you need to know before starting your anti-inflammatory journey.
                    </p>
                </div>

                {/* FAQ List */}
                <div className="flex flex-col gap-2.5 sm:gap-3">
                    {FAQS.map((faq, i) => (
                        <FAQItem key={i} faq={faq} index={i} />
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-10 sm:mt-14 text-center bg-white rounded-2xl sm:rounded-3xl px-5 sm:px-8 py-8 sm:py-10 border border-[#e8e4dc] shadow-sm">
                    <p className="text-sm sm:text-base font-bold text-[#1a2e1f] mb-1">Still have questions?</p>
                    <p className="text-xs sm:text-sm text-[#5a5a4a] mb-5">
                        Our team is happy to help. Reach out anytime before or after your purchase.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <a
                            href="mailto:support@example.com"
                            className="inline-flex items-center gap-2 border border-[#2d5a3d] text-[#2d5a3d] font-bold text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 rounded-full hover:bg-[#2d5a3d] hover:text-white transition-all duration-200 w-full sm:w-auto justify-center"
                        >
                            ✉️ Contact Support
                        </a>
                        <a
                            href="#"
                            className="inline-flex items-center gap-2 bg-[#2d5a3d] hover:bg-[#245033] text-white font-bold text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-200 active:scale-95 w-full sm:w-auto justify-center"
                        >
                            Buy Your Plan Now
                        </a>
                    </div>
                </div>

            </div>
        </section>
    );
}