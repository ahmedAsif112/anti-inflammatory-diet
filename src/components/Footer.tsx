"use client";

import Image from "next/image";
import logo from "@/assets/Anti_Inflammery_Logo.png";

const LINKS = {
    Shop: ["Diet Plan Bundle", "Cookbooks", "Meal Plans", "Bonus Guides"],
    Company: ["About Us", "Blog", "Press", "Careers"],
    Support: ["Contact Us", "FAQ", "Shipping Policy", "Refund Policy"],
    Legal: ["Privacy Policy", "Terms of Service", "Disclaimer", "Cookie Policy"],
};

const SOCIALS = [
    {
        label: "Facebook",
        href: "#",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
        ),
    },
    {
        label: "Instagram",
        href: "#",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
            </svg>
        ),
    },
    {
        label: "TikTok",
        href: "#",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.75a8.16 8.16 0 0 0 4.78 1.52V6.82a4.85 4.85 0 0 1-1.01-.13z" />
            </svg>
        ),
    },
    {
        label: "YouTube",
        href: "#",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
            </svg>
        ),
    },
];

export default function Footer() {
    return (
        <footer className="w-full bg-[#1a2e1f] text-white">

            {/* Top CTA strip */}
            <div className="border-b border-white/10">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 py-8 sm:py-10 flex flex-col sm:flex-row items-center justify-between gap-5">
                    <div>
                        <p className="text-base sm:text-lg font-extrabold text-white leading-tight">
                            Ready to fight inflammation naturally?
                        </p>
                        <p className="text-xs sm:text-sm text-white/50 mt-1">
                            Join 10,000+ people already healing with our plan.
                        </p>
                    </div>
                    <a
                        href="/email"
                        className="flex-shrink-0 inline-flex items-center gap-2 bg-[#2d5a3d] hover:bg-[#3a7a52] text-white font-bold text-xs sm:text-sm px-6 sm:px-8 py-3 sm:py-3.5 rounded-full shadow-lg transition-all duration-200 active:scale-95 whitespace-nowrap"
                    >
                        Buy Your Plan Now
                    </a>
                </div>
            </div>

            {/* Main footer grid */}
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 py-12 sm:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

                    {/* Brand col */}
                    <div className="sm:col-span-2 lg:col-span-1 flex flex-col gap-4">
                        {/* Logo — same as header */}
                        <a href="/" className="flex items-center gap-2.5 w-fit">
                            <Image
                                src={logo}
                                alt="Anti Inflammatory Logo"
                                width={120}
                                height={48}
                                className="h-10 sm:h-12 w-auto object-contain"
                            />
                            <div className="flex flex-col leading-tight">
                                <span className="text-[#a8d5b5] font-bold text-sm sm:text-[15px] tracking-tight whitespace-nowrap">
                                    Anti Inflammatory
                                </span>
                                <span className="text-white/40 text-[9px] sm:text-[10px] uppercase tracking-widest font-medium">
                                    Nature&apos;s Remedy
                                </span>
                            </div>
                        </a>

                        <p className="text-xs sm:text-sm text-white/50 leading-relaxed max-w-xs">
                            Science-backed anti-inflammatory diet plans trusted by thousands to reduce pain, boost energy, and restore health — naturally.
                        </p>

                        {/* Socials */}
                        <div className="flex items-center gap-2 mt-1">
                            {SOCIALS.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    aria-label={s.label}
                                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-[#2d5a3d] flex items-center justify-center text-white/70 hover:text-white transition-all duration-200"
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {Object.entries(LINKS).map(([title, links]) => (
                        <div key={title} className="flex flex-col gap-3">
                            <p className="text-xs font-extrabold uppercase tracking-widest text-white/40">{title}</p>
                            <ul className="flex flex-col gap-2">
                                {links.map((link) => (
                                    <li key={link}>
                                        <a
                                            href="#"
                                            className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors duration-200"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                    <p className="text-[10px] sm:text-xs text-white/30">
                        © {new Date().getFullYear()} Anti Inflammatory — Nature's Remedy. All rights reserved.
                    </p>
                    <p className="text-[10px] sm:text-xs text-white/30">
                        ✅ 30-Day Money Back &nbsp;·&nbsp; ✅ Instant Digital Access &nbsp;·&nbsp; ✅ Doctor-Reviewed
                    </p>
                </div>
            </div>

        </footer>
    );
}