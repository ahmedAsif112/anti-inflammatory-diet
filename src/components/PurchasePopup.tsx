"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

/* ── Buyer data ─────────────────────────────────────────────── */
const BUYERS = [
    { name: "Emma R.", location: "New York, US", time: "2 min ago", avatar: "ER" },
    { name: "James K.", location: "London, UK", time: "5 min ago", avatar: "JK" },
    { name: "Sofia M.", location: "Toronto, CA", time: "8 min ago", avatar: "SM" },
    { name: "Liam T.", location: "Sydney, AU", time: "11 min ago", avatar: "LT" },
    { name: "Aisha N.", location: "Dubai, UAE", time: "14 min ago", avatar: "AN" },
    { name: "Carlos D.", location: "Madrid, ES", time: "17 min ago", avatar: "CD" },
    { name: "Priya S.", location: "Mumbai, IN", time: "20 min ago", avatar: "PS" },
    { name: "Noah W.", location: "Chicago, US", time: "23 min ago", avatar: "NW" },
];

const SHOW_DURATION = 4500;  // ms popup stays visible
const INTERVAL = 12000;  // ms between popups
const INITIAL_DELAY = 3000;  // ms before first popup

/* ── Colour pool for avatars ────────────────────────────────── */
const AVATAR_COLORS = [
    "#2d5a3d", "#4a7c59", "#1a3d2b", "#3d6b50",
    "#5a8c6e", "#26503a", "#437058", "#1f4532",
];

/* ── Component ──────────────────────────────────────────────── */
export default function PurchasePopup() {
    const pathname = usePathname();
    const [visible, setVisible] = useState(false);
    const [buyerIdx, setBuyerIdx] = useState(0);
    const [dismissed, setDismissed] = useState(false);

    /* only render on home page */
    const isHome = pathname === "/";

    const showNext = useCallback(() => {
        if (dismissed) return;
        setBuyerIdx((i) => (i + 1) % BUYERS.length);
        setVisible(true);
        setTimeout(() => setVisible(false), SHOW_DURATION);
    }, [dismissed]);

    useEffect(() => {
        if (!isHome) return;

        const initial = setTimeout(() => {
            if (!dismissed) {
                setVisible(true);
                setTimeout(() => setVisible(false), SHOW_DURATION);
            }
        }, INITIAL_DELAY);

        const interval = setInterval(showNext, INTERVAL);

        return () => {
            clearTimeout(initial);
            clearInterval(interval);
        };
    }, [isHome, showNext, dismissed]);

    if (!isHome) return null;

    const buyer = BUYERS[buyerIdx];
    const avatarColor = AVATAR_COLORS[buyerIdx % AVATAR_COLORS.length];

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    key={buyerIdx}
                    initial={{ opacity: 0, y: 24, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 16, scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    className="
            fixed bottom-5 left-4 right-4
            sm:left-5 sm:right-auto sm:w-[320px]
            z-[9999]
          "
                    role="status"
                    aria-live="polite"
                >
                    <div
                        className="
              relative flex items-center gap-3
              bg-white border border-[#e8e4dc]
              rounded-2xl shadow-2xl shadow-black/10
              px-4 py-3
            "
                    >
                        {/* Progress bar */}
                        <motion.div
                            className="absolute bottom-0 left-0 h-[3px] rounded-b-2xl bg-[#2d5a3d]"
                            initial={{ width: "100%" }}
                            animate={{ width: "0%" }}
                            transition={{ duration: SHOW_DURATION / 1000, ease: "linear" }}
                        />

                        {/* Avatar */}
                        <div
                            className="
                flex-shrink-0 w-11 h-11 rounded-full
                flex items-center justify-center
                text-white text-[13px] font-bold tracking-wide
                shadow-md
              "
                            style={{ backgroundColor: avatarColor }}
                        >
                            {buyer.avatar}
                        </div>

                        {/* Text */}
                        <div className="flex-1 min-w-0">
                            <p className="text-[12px] text-[#5a5a4a] leading-tight">
                                <span className="font-bold text-[#1a2e1f]">{buyer.name}</span>
                                {" "}from{" "}
                                <span className="font-semibold text-[#2d5a3d]">{buyer.location}</span>
                            </p>
                            <p className="text-[11px] text-[#5a5a4a] mt-0.5 leading-snug">
                                🎉 Just purchased the{" "}
                                <span className="font-semibold text-[#1a2e1f]">Wellness Bundle</span>
                            </p>
                            <p className="text-[10px] text-[#9a9a8a] mt-0.5 flex items-center gap-1">
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                                {buyer.time}
                            </p>
                        </div>

                        {/* Close */}
                        <button
                            onClick={() => { setVisible(false); setDismissed(true); }}
                            className="
                flex-shrink-0 w-6 h-6 rounded-full
                flex items-center justify-center
                text-[#9a9a8a] hover:text-[#1a2e1f]
                hover:bg-[#f0ede6]
                transition-colors duration-150 text-xs
              "
                            aria-label="Dismiss"
                        >
                            ✕
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}