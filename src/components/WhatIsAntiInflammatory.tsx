"use client";

import Image from "next/image";

const benefits = [
    {
        icon: "🔥",
        title: "Reduces Chronic Pain",
        desc: "Calms the body's inflammatory response, easing joint pain, muscle aches, and long-term discomfort.",
    },
    {
        icon: "🧠",
        title: "Boosts Brain Health",
        desc: "Protects neurons from oxidative stress, improving focus, memory, and mental clarity.",
    },
    {
        icon: "❤️",
        title: "Supports Heart Health",
        desc: "Lowers inflammatory markers linked to heart disease, keeping your arteries healthy and strong.",
    },
    {
        icon: "⚡",
        title: "Restores Energy",
        desc: "Fights fatigue at the cellular level so you wake up refreshed and stay energized all day.",
    },
];

const foods = [
    {
        name: "Turmeric",
        tag: "Anti-inflammatory powerhouse",
        img: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&q=80",
    },
    {
        name: "Wild Salmon",
        tag: "Rich in Omega-3",
        img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&q=80",
    },
    {
        name: "Blueberries",
        tag: "Loaded with antioxidants",
        img: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400&q=80",
    },
    {
        name: "Leafy Greens",
        tag: "Vitamin K & folate rich",
        img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80",
    },
];

export default function WhatIsAntiInflammatory() {
    return (
        <section className="w-full bg-[#f5f2eb] py-16 sm:py-20 lg:py-28 overflow-hidden">
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16">

                {/* ── Header ── */}
                <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
                    <span className="inline-block text-xs font-bold tracking-widest uppercase text-[#2d5a3d] bg-[#2d5a3d]/10 border border-[#2d5a3d]/20 px-4 py-1.5 rounded-full mb-4">
                        The Science Behind It
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1a2e1f] leading-tight tracking-tight mb-4">
                        What Is An{" "}
                        <span className="text-[#2d5a3d] relative">
                            Anti-Inflammatory
                            <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 200 6" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                                <path d="M0 5 Q50 0 100 4 Q150 8 200 3" stroke="#2d5a3d" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.5" />
                            </svg>
                        </span>{" "}
                        Diet?
                    </h2>
                    <p className="text-[#5a5a4a] text-sm sm:text-base leading-relaxed">
                        Inflammation is your body's natural defense — but when it becomes chronic, it silently damages your cells, tissues, and organs. An anti-inflammatory diet is a science-backed eating plan that targets and neutralizes this hidden fire.
                    </p>
                </div>

                {/* ── Split: Image + Explanation ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-20 sm:mb-28">

                    {/* Image */}
                    <div className="relative w-full rounded-3xl overflow-hidden shadow-xl shadow-[#2d5a3d]/10">
                        <Image
                            src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&q=85"
                            alt="Anti-inflammatory foods"
                            width={900}
                            height={600}
                            className="w-full h-[280px] sm:h-[380px] lg:h-[460px] object-cover"
                        />
                        {/* floating badge */}
                        <div className="absolute bottom-5 left-5 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg flex items-center gap-3">
                            <span className="text-2xl">🌿</span>
                            <div>
                                <p className="text-xs font-bold text-[#1a2e1f]">Nature's Medicine</p>
                                <p className="text-xs text-[#8a8a7a]">Food as your first treatment</p>
                            </div>
                        </div>
                    </div>

                    {/* Text */}
                    <div className="flex flex-col gap-5">
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1a2e1f] leading-snug">
                            Your body is fighting a silent war every day.
                        </h3>
                        <p className="text-[#5a5a4a] text-sm sm:text-base leading-relaxed">
                            Chronic inflammation is the root cause of over <strong className="text-[#2d5a3d]">80% of modern diseases</strong> — from heart disease and diabetes to arthritis and fatigue. Most people don't even know they have it.
                        </p>
                        <p className="text-[#5a5a4a] text-sm sm:text-base leading-relaxed">
                            An anti-inflammatory diet fights back by flooding your body with <strong className="text-[#2d5a3d]">healing nutrients, antioxidants, and omega-3 fatty acids</strong> — while eliminating the processed foods and refined sugars that trigger inflammation in the first place.
                        </p>

                        {/* Quick stats */}
                        <div className="grid grid-cols-2 gap-4 mt-2">
                            {[
                                { num: "80%", label: "Of chronic diseases linked to inflammation" },
                                { num: "21 days", label: "Average time to feel a difference" },
                                { num: "3x", label: "More energy reported by followers" },
                                { num: "100%", label: "Natural — no pills, no prescriptions" },
                            ].map((s) => (
                                <div key={s.label} className="bg-white rounded-2xl px-4 py-4 shadow-sm border border-[#e8e4dc]">
                                    <p className="text-xl font-extrabold text-[#2d5a3d]">{s.num}</p>
                                    <p className="text-xs text-[#7a7a6a] leading-snug mt-0.5">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Benefits Grid ── */}
                <div className="mb-20 sm:mb-28">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1a2e1f] text-center mb-10">
                        What It Does For Your Body
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {benefits.map((b) => (
                            <div
                                key={b.title}
                                className="bg-white rounded-3xl p-6 shadow-sm border border-[#e8e4dc] hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                            >
                                <span className="text-3xl mb-4 block">{b.icon}</span>
                                <h4 className="font-bold text-[#1a2e1f] text-base mb-2">{b.title}</h4>
                                <p className="text-xs text-[#7a7a6a] leading-relaxed">{b.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Top Foods ── */}
                <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1a2e1f] text-center mb-3">
                        Top Anti-Inflammatory Foods
                    </h3>
                    <p className="text-center text-sm text-[#8a8a7a] mb-10">
                        Nature packed these with compounds that cool inflammation at the source.
                    </p>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {foods.map((f) => (
                            <div key={f.name} className="group relative rounded-3xl overflow-hidden shadow-sm border border-[#e8e4dc]">
                                <Image
                                    src={f.img}
                                    alt={f.name}
                                    width={400}
                                    height={300}
                                    className="w-full h-[160px] sm:h-[200px] object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e1f]/70 via-transparent to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <p className="text-white font-bold text-sm sm:text-base">{f.name}</p>
                                    <p className="text-white/70 text-xs mt-0.5">{f.tag}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Bottom CTA ── */}
                <div className="mt-16 sm:mt-20 text-center bg-[#2d5a3d] rounded-3xl px-6 py-12 sm:py-16 relative overflow-hidden">
                    {/* decorative circles */}
                    <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full" />
                    <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-white/5 rounded-full" />

                    <span className="inline-block text-xs font-bold tracking-widest uppercase text-white/60 mb-3">
                        Start Healing Today
                    </span>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-4">
                        Ready to fight inflammation naturally?
                    </h3>
                    <p className="text-white/70 text-sm sm:text-base max-w-lg mx-auto mb-8">
                        Get our complete 80-day anti-inflammatory meal plan with 10+ free bonus guides — trusted by over 10,000 people.
                    </p>
                    <a
                        href="#"
                        className="inline-flex items-center gap-2 bg-white text-[#2d5a3d] font-extrabold text-sm sm:text-base px-8 py-4 rounded-full shadow-xl hover:bg-[#f5f2eb] active:scale-95 transition-all duration-200"
                    >
                        🥗 Buy Your Plan Now
                    </a>
                </div>

            </div>
        </section>
    );
}