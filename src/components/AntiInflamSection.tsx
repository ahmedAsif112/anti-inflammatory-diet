"use client";

import Image from "next/image";

const benefits = [
    {
        bold: "Reduced menstrual symptoms",
        rest: " like cramping, mood swings, and hormonal headaches.",
        icon: "🌸",
    },
    {
        bold: "Reduced bloating",
        rest: " and feeling light, comfortable, and confident in your body again.",
        icon: "✨",
    },
    {
        bold: "Lowering inflammation",
        rest: " and promoting hormonal balance naturally — no pills needed.",
        icon: "⚖️",
    },
    {
        bold: "Glowing skin & stronger hair",
        rest: " as antioxidants fight the oxidative stress that ages you faster.",
        icon: "💆‍♀️",
    },
    {
        bold: "More energy every morning",
        rest: " because your body finally stops fighting itself while you sleep.",
        icon: "⚡",
    },
];

export default function ForWomenSection() {
    return (
        <section className="w-full bg-[#e8f5ee] pt-10 pb-16 sm:pt-12 sm:pb-20 lg:pt-14 lg:pb-28 overflow-hidden">
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16">

                {/* Heading — center */}
                <div className="text-center mb-12 sm:mb-16">
                    <span className="inline-block text-xs font-bold tracking-widest uppercase text-[#2d5a3d] bg-[#2d5a3d]/10 border border-[#2d5a3d]/20 px-4 py-1.5 rounded-full mb-4">
                        Made for Her
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1a2e1f] leading-tight tracking-tight">
                        Perfectly Designed{" "}
                        <span className="text-[#2d5a3d]">for Women!</span>
                    </h2>
                    <p className="text-[#5a5a4a] text-sm sm:text-base mt-3 max-w-xl mx-auto leading-relaxed">
                        Women's bodies respond differently to inflammation. This plan is built around your biology — not a one-size-fits-all diet.
                    </p>
                </div>

                {/* Two-col layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">

                    {/* LEFT — Image with decorative circle */}
                    <div className="relative flex items-center justify-center order-2 md:order-1">
                        {/* Big teal circle behind */}
                        <div className="absolute w-[75%] aspect-square rounded-full bg-gradient-to-br from-[#a8d5c2] to-[#7bbfa8] opacity-40" />

                        {/* Floating stat badge */}
                        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white rounded-2xl shadow-lg px-3 py-2.5 flex items-center gap-2 z-10">
                            <span className="text-xl">🌿</span>
                            <div>
                                <p className="text-xs font-extrabold text-[#1a2e1f]">100% Natural</p>
                                <p className="text-[10px] text-[#8a8a7a]">No hormones or pills</p>
                            </div>
                        </div>

                        {/* Floating stat badge 2 */}
                        <div className="absolute bottom-6 left-4 sm:left-6 bg-white rounded-2xl shadow-lg px-3 py-2.5 flex items-center gap-2 z-10">
                            <span className="text-xl">❤️</span>
                            <div>
                                <p className="text-xs font-extrabold text-[#1a2e1f]">10,000+ Women</p>
                                <p className="text-[10px] text-[#8a8a7a]">Transformed their health</p>
                            </div>
                        </div>

                        <div className="relative z-0 w-[70%] sm:w-[60%] md:w-[75%] aspect-square">
                            <Image
                                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=700&q=85"
                                alt="Woman feeling healthy"
                                fill
                                className="object-cover object-top rounded-full shadow-2xl"
                            />
                        </div>
                    </div>

                    {/* RIGHT — Benefits + CTA */}
                    <div className="flex flex-col gap-6 order-1 md:order-2">

                        <div className="flex flex-col gap-4">
                            {benefits.map((b, i) => (
                                <div
                                    key={i}
                                    className="flex items-start gap-3 bg-white rounded-2xl px-4 py-4 shadow-sm border border-[#e8e4dc] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    <span className="text-xl flex-shrink-0 mt-0.5">{b.icon}</span>
                                    <p className="text-sm text-[#5a5a4a] leading-relaxed">
                                        <strong className="text-[#1a2e1f] font-bold">{b.bold}</strong>
                                        {b.rest}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <a
                            href="/email"
                            className="inline-flex items-center justify-center gap-2 bg-[#1a2e1f] hover:bg-[#2d5a3d] active:scale-95 text-white font-bold text-sm sm:text-base px-6 py-4 rounded-2xl shadow-xl shadow-[#1a2e1f]/20 transition-all duration-200 mt-2"
                        >
                            Let's Make 2026 Healthier — Grab the Offer! 📚
                        </a>

                        <p className="text-xs text-[#9a9a8a]">
                            ✅ 30-day money back &nbsp;·&nbsp; ✅ No strict diets &nbsp;·&nbsp; ✅ Doctor-reviewed
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}