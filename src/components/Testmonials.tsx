"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import testone from "@/assets/card.jpg";
import testtwo from "@/assets/card2.jpg";
import testthree from "@/assets/card3.jpg";

const BASE = [
    { before: testone, after: testtwo, name: "Sarah M.", days: "60 Days", quote: "I lost 18 lbs and my joint pain completely disappeared. I finally feel like myself again!", stars: 5 },
    { before: testtwo, after: testthree, name: "James K.", days: "80 Days", quote: "My doctor was shocked. Inflammation markers dropped to normal for the first time in 5 years.", stars: 5 },
    { before: testthree, after: testone, name: "Linda R.", days: "45 Days", quote: "More energy, clearer skin, and I sleep like a baby. This plan changed my life completely.", stars: 5 },
    { before: testone, after: testthree, name: "David P.", days: "70 Days", quote: "No pills, no surgery — just real food. The transformation speaks for itself!", stars: 5 },
];

const MAX_CHARS = 80;

/* ─── Single card ─────────────────────────────────────────── */
function BeforeAfterCard({ item }: { item: typeof BASE[0] }) {
    const [expanded, setExpanded] = useState(false);
    const isLong = item.quote.length > MAX_CHARS;

    const quote =
        !expanded && isLong
            ? item.quote.slice(0, MAX_CHARS).trimEnd() + "…"
            : item.quote;

    return (
        <div className="flex flex-col bg-white rounded-3xl overflow-hidden shadow-lg border border-[#e8e4dc]">
            {/* Single image */}
            <div
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: "4/3" }}
            >
                <Image
                    src={item.after}
                    alt={item.name}
                    fill
                    className="object-cover object-center"
                />
            </div>

            {/* Info */}
            <div className="p-4 flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-bold text-[#1a2e1f] text-sm">{item.name}</p>
                        <p className="text-[11px] text-[#2d5a3d] font-semibold">
                            ✅ Verified — {item.days} Result
                        </p>
                    </div>
                    <span className="text-yellow-400 text-xs">
                        {"★".repeat(item.stars)}
                    </span>
                </div>

                <p className="text-xs text-[#5a5a4a] leading-relaxed italic">
                    {quote}
                </p>

                {isLong && (
                    <button
                        onClick={() => setExpanded((p) => !p)}
                        className="text-[11px] font-semibold text-[#2d5a3d] hover:underline text-left w-fit"
                    >
                        {expanded ? "Show less ↑" : "Show more ↓"}
                    </button>
                )}
            </div>
        </div>
    );
}

/* ─── Section ─────────────────────────────────────────────── */
export default function BeforeAfterSection() {
    const [isMobile, setIsMobile] = useState(false);
    const [paused, setPaused] = useState(false);
    const [index, setIndex] = useState(0);           // logical index into BASE
    const transitioning = useRef(false);
    const trackRef = useRef<HTMLDivElement>(null);

    /* responsive */
    useEffect(() => {
        const upd = () => setIsMobile(window.innerWidth < 640);
        upd();
        window.addEventListener("resize", upd);
        return () => window.removeEventListener("resize", upd);
    }, []);

    const visible = isMobile ? 1 : 2;
    const gap = 20; // px
    const total = BASE.length;

    /*
     * Infinite-loop technique:
     *   slots = [ ...last `visible` clones ] [ ...BASE ] [ ...first `visible` clones ]
     *   real cards start at slot offset = visible
     *   translateX is derived from (index + visible) so we always start on a real card
     *   when we land on a clone, after the transition ends we silently jump to the mirror real card
     */
    const clonesBefore = BASE.slice(-visible);
    const clonesAfter = BASE.slice(0, visible);
    const slots = [...clonesBefore, ...BASE, ...clonesAfter];

    // slot index for current logical index
    const slotIndex = index + visible;

    const cardW = `calc(${100 / visible}% - ${gap * (visible - 1) / visible}px)`;
    const offset = `calc(-${slotIndex * (100 / visible)}% - ${slotIndex * gap / visible}px)`;

    /* slide helpers */
    const slideTo = useCallback((newIndex: number, withTransition = true) => {
        if (transitioning.current) return;
        transitioning.current = true;
        const track = trackRef.current;
        if (track) {
            track.style.transition = withTransition
                ? "transform 0.55s cubic-bezier(0.25, 1, 0.5, 1)"
                : "none";
        }
        setIndex(newIndex);
    }, []);

    /* after each slide — check if we landed on a clone and silently reset */
    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        const onEnd = () => {
            transitioning.current = false;
            // landed past end → jump to start
            if (index >= total) {
                track.style.transition = "none";
                setIndex(index - total);
            }
            // landed before start → jump to end
            if (index < 0) {
                track.style.transition = "none";
                setIndex(index + total);
            }
        };
        track.addEventListener("transitionend", onEnd);
        return () => track.removeEventListener("transitionend", onEnd);
    }, [index, total]);

    const next = useCallback(() => slideTo(index + 1), [index, slideTo]);
    const prev = useCallback(() => slideTo(index - 1), [index, slideTo]);

    /* autoplay */
    useEffect(() => {
        if (paused) return;
        const id = setInterval(next, 2000);
        return () => clearInterval(id);
    }, [paused, next]);

    /* dot index (always 0-based within BASE) */
    const dotIndex = ((index % total) + total) % total;

    return (
        <section className="w-full bg-[#f5f2eb] py-16 sm:py-20 lg:py-28">
            <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-16">

                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
                    <span className="inline-block text-xs font-bold tracking-widest uppercase text-[#2d5a3d] bg-[#2d5a3d]/10 border border-[#2d5a3d]/20 px-4 py-1.5 rounded-full mb-4">
                        Real People. Real Results.
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1a2e1f] leading-tight tracking-tight mb-4">
                        They Chose Us —{" "}
                        <span className="text-[#2d5a3d]">The Results</span>{" "}
                        Speak For Themselves
                    </h2>
                    <p className="text-[#5a5a4a] text-sm sm:text-base leading-relaxed">
                        Over <strong className="text-[#2d5a3d]">10,000+ people</strong> trusted our plan. Drag the slider to reveal the transformation.
                    </p>
                    <div className="flex items-center justify-center gap-6 mt-6 flex-wrap">
                        {[{ icon: "🏆", label: "10,000+ Customers" }, { icon: "⭐", label: "4.9 / 5 Rating" }, { icon: "🔬", label: "Doctor Reviewed" }].map(b => (
                            <div key={b.label} className="flex items-center gap-1.5 text-xs font-semibold text-[#5a5a4a]">
                                <span>{b.icon}</span><span>{b.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Carousel */}
                <div
                    className="flex items-center gap-2 sm:gap-4"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                >
                    {/* ← */}
                    <button onClick={prev} className="flex-shrink-0 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-white border border-[#e8e4dc] shadow-md flex items-center justify-center text-[#2d5a3d] hover:bg-[#2d5a3d] hover:text-white hover:border-[#2d5a3d] active:scale-95 transition-all duration-200 text-base sm:text-lg">←</button>

                    {/* Track */}
                    <div className="flex-1 overflow-hidden">
                        <div
                            ref={trackRef}
                            className="flex"
                            style={{
                                gap: `${gap}px`,
                                transform: `translateX(${offset})`,
                                transition: "transform 0.55s cubic-bezier(0.25, 1, 0.5, 1)",
                                willChange: "transform",
                            }}
                        >
                            {slots.map((item, i) => (
                                <div key={i} style={{ flex: `0 0 ${cardW}`, minWidth: 0 }}>
                                    <BeforeAfterCard item={item} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* → */}
                    <button onClick={next} className="flex-shrink-0 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-white border border-[#e8e4dc] shadow-md flex items-center justify-center text-[#2d5a3d] hover:bg-[#2d5a3d] hover:text-white hover:border-[#2d5a3d] active:scale-95 transition-all duration-200 text-base sm:text-lg">→</button>
                </div>

                {/* Dots */}
                <div className="flex items-center justify-center gap-2 mt-8">
                    {BASE.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => slideTo(i)}
                            className={`rounded-full transition-all duration-300 ${i === dotIndex ? "w-6 h-2.5 bg-[#2d5a3d]" : "w-2.5 h-2.5 bg-[#d4cfc6] hover:bg-[#2d5a3d]/40"}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}