"use client";

const points = [
    {
        bold: "Beginner-Friendly:",
        rest: " No prior nutrition knowledge needed. Start exactly where you are today.",
    },
    {
        bold: "Science-Backed:",
        rest: " Every meal plan is grounded in real research — not trends or guesswork.",
    },
    {
        bold: "Life-Changing:",
        rest: " Thousands have reversed chronic pain, fatigue, and bloating in weeks.",
    },
    {
        bold: "Sustainable:",
        rest: " No starving. No strict rules. Just real food that heals your body naturally.",
    },
];

export default function DareToBeginSection() {
    return (
        <section className="w-full bg-[#E8F5EE] py-12 sm:py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">

                    {/* LEFT — Big bold handwritten-style text */}
                    <div className="flex items-center justify-center md:justify-start">
                        <div className="leading-none select-none">
                            <p
                                className="text-[clamp(3.5rem,12vw,8rem)] font-black text-[#1a2e1f] leading-[0.88] tracking-tight uppercase"
                                style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.03em" }}
                            >
                                Dare
                            </p>
                            <p
                                className="text-[clamp(3.5rem,12vw,8rem)] font-black text-[#1a2e1f] leading-[0.88] tracking-tight uppercase"
                                style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.03em" }}
                            >
                                To
                            </p>
                            <p
                                className="text-[clamp(3.5rem,12vw,8rem)] font-black text-[#2d5a3d] leading-[0.88] tracking-tight uppercase"
                                style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.03em" }}
                            >
                                Begin
                            </p>
                            {/* Underline stroke */}
                            <svg viewBox="0 0 320 24" className="w-full mt-2 sm:mt-3" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 18 Q80 4 160 14 Q240 24 316 8" stroke="#1a2e1f" strokeWidth="5" strokeLinecap="round" />
                            </svg>
                        </div>
                    </div>

                    {/* RIGHT — Points */}
                    <div className="flex flex-col gap-5 sm:gap-6">
                        <div>
                            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#1a2e1f] uppercase leading-tight tracking-tight">
                                Beginner to <br className="hidden sm:block" />
                                <span className="text-[#2d5a3d]">Healed & Thriving</span>
                            </h3>
                        </div>

                        <div className="flex flex-col gap-4 sm:gap-5">
                            {points.map((p, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#1a2e1f] flex-shrink-0 mt-2" />
                                    <p className="text-sm sm:text-base text-[#3a3a3a] leading-relaxed">
                                        <strong className="font-bold text-[#1a2e1f]">{p.bold}</strong>
                                        {p.rest}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <a
                            href="#"
                            className="inline-flex items-center gap-2 bg-[#1a2e1f] hover:bg-[#2d5a3d] text-white font-bold text-sm px-6 py-3.5 rounded-full transition-all duration-200 active:scale-95 w-fit mt-1"
                        >
                            Start Your Journey →
                        </a>
                    </div>

                </div>
            </div>
        </section>
    );
}