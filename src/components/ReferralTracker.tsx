"use client";
import { useEffect } from "react";

export default function ReferralTracker() {
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const ref = urlParams.get("ref");

        if (ref) {
            // save in localStorage
            localStorage.setItem("referrer", ref);
            console.log("✅ Referrer captured:", ref);

            // clean URL without reloading
            const newUrl = window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);
        }
    }, []);

    return null; // ye component UI me kuch show nahi karega
}
