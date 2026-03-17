"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Search, X, Menu } from "lucide-react";
import logo from "@/assets/Anti_Inflammery_Logo.png";
import hero from "@/assets/hero.jpg";

function useCountdown(initialHours = 6, initialMinutes = 23, initialSeconds = 47) {
    const [timeLeft, setTimeLeft] = useState({
        hours: initialHours,
        minutes: initialMinutes,
        seconds: initialSeconds,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                let { hours, minutes, seconds } = prev;
                if (seconds > 0) return { hours, minutes, seconds: seconds - 1 };
                if (minutes > 0) return { hours, minutes: minutes - 1, seconds: 59 };
                if (hours > 0) return { hours: hours - 1, minutes: 59, seconds: 59 };
                return { hours: 0, minutes: 0, seconds: 0 };
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return timeLeft;
}

function pad(n: number) {
    return String(n).padStart(2, "0");
}

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const { hours, minutes, seconds } = useCountdown(6, 23, 47);

    return (
        <header className="w-full font-sans sticky top-0 z-50">            {/* Announcement Bar with Countdown */}
            <div className="bg-[#2d5a3d] text-[#e8f0e9] px-4 py-2.5">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-4 text-center">



                    {/* Divider */}
                    <span className="hidden sm:inline text-[#4a7a5a]">|</span>

                    {/* Urgency + Countdown */}
                    <span className="inline-flex items-center gap-2 text-xs sm:text-sm">
                        <span className="text-[#f5c842] font-semibold animate-pulse">🔥 Sale ends in:</span>
                        <span className="inline-flex items-center gap-1">
                            <span className="bg-[#1e3f2b] text-white font-bold text-xs px-2 py-0.5 rounded tabular-nums min-w-[1.75rem] text-center">
                                {pad(hours)}
                            </span>
                            <span className="text-[#a0c8a8] font-bold">:</span>
                            <span className="bg-[#1e3f2b] text-white font-bold text-xs px-2 py-0.5 rounded tabular-nums min-w-[1.75rem] text-center">
                                {pad(minutes)}
                            </span>
                            <span className="text-[#a0c8a8] font-bold">:</span>
                            <span className="bg-[#1e3f2b] text-white font-bold text-xs px-2 py-0.5 rounded tabular-nums min-w-[1.75rem] text-center">
                                {pad(seconds)}
                            </span>
                        </span>
                        <span className="text-[#f5c842] font-semibold text-xs">
                            — Grab your diet plan now!
                        </span>
                    </span>
                </div>
            </div>

            {/* Main Header */}
            <div className="bg-[#f5f2eb] border-b border-[#e0dbd0]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 sm:h-20">

                        {/* Logo + Brand Text */}
                        <div className="flex-shrink-0">
                            <a href="/" className="flex items-center gap-2.5">
                                <Image
                                    src={logo}
                                    alt="Anti Inflammatory Logo"
                                    width={120}
                                    height={48}
                                    className="h-10 sm:h-12 w-auto object-contain"
                                    priority
                                />
                                <div className="flex flex-col leading-tight">
                                    <span className="text-[#2d5a3d] font-bold text-sm sm:text-[15px] tracking-tight whitespace-nowrap">
                                        Anti Inflammatory
                                    </span>
                                    <span className="text-[#8a7d5a] text-[9px] sm:text-[10px] uppercase tracking-widest font-medium">
                                        Nature&apos;s Remedy
                                    </span>
                                </div>
                            </a>
                        </div>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-7 text-sm text-[#3a3a3a] font-medium tracking-wide">
                            <a href="#" className="hover:text-[#2d5a3d] transition-colors duration-200">Shop</a>
                            <a href="#" className="hover:text-[#2d5a3d] transition-colors duration-200">Collections</a>
                            <a href="#" className="hover:text-[#2d5a3d] transition-colors duration-200">About</a>
                            <a href="#" className="hover:text-[#2d5a3d] transition-colors duration-200">Blog</a>
                        </nav>

                        {/* Right Actions */}
                        <div className="flex items-center gap-1 sm:gap-2">

                            {/* Search */}
                            <button
                                onClick={() => setSearchOpen(!searchOpen)}
                                className="p-2 text-[#3a3a3a] hover:text-[#2d5a3d] hover:bg-[#eee9df] rounded-full transition-colors duration-200"
                                aria-label="Search"
                            >
                                <Search size={20} />
                            </button>

                            {/* CTA Button — desktop */}
                            <a
                                href="#"
                                className="hidden sm:inline-flex items-center gap-1.5 bg-[#2d5a3d] hover:bg-[#245033] text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors duration-200 shadow-sm whitespace-nowrap"
                            >
                                🥗 Get Diet Plan
                            </a>

                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="md:hidden p-2 text-[#3a3a3a] hover:text-[#2d5a3d] hover:bg-[#eee9df] rounded-full transition-colors duration-200"
                                aria-label="Toggle menu"
                            >
                                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                            </button>
                        </div>
                    </div>

                    {/* Expandable Search Bar */}
                    {searchOpen && (
                        <div className="pb-4 pt-1">
                            <div className="relative max-w-lg mx-auto">
                                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9a9485]" />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    autoFocus
                                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#d4cfc6] rounded-full text-sm text-[#3a3a3a] placeholder-[#b0a898] focus:outline-none focus:ring-2 focus:ring-[#2d5a3d]/30 focus:border-[#2d5a3d] transition-all"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Mobile Nav Drawer */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-[#e0dbd0] bg-[#f5f2eb]">
                        <nav className="flex flex-col px-6 py-4 gap-4 text-sm font-medium text-[#3a3a3a]">
                            <a href="#" className="hover:text-[#2d5a3d] transition-colors py-1 border-b border-[#e8e3da]">Shop</a>
                            <a href="#" className="hover:text-[#2d5a3d] transition-colors py-1 border-b border-[#e8e3da]">Collections</a>
                            <a href="#" className="hover:text-[#2d5a3d] transition-colors py-1 border-b border-[#e8e3da]">About</a>
                            <a href="#" className="hover:text-[#2d5a3d] transition-colors py-1 border-b border-[#e8e3da]">Blog</a>
                            <a
                                href="#"
                                className="inline-flex items-center justify-center gap-2 bg-[#2d5a3d] text-white text-sm font-semibold px-4 py-2.5 rounded-full mt-1"
                            >
                                🥗 Get Your Diet Plan Now
                            </a>
                        </nav>
                    </div>
                )}
            </div>
        </header>



    );
}