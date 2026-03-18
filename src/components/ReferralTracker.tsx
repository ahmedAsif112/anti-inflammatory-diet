"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function RefTracker() {
    const params = useSearchParams();

    useEffect(() => {
        const ref = params.get("ref");
        if (ref) {
            localStorage.setItem("ref_name", ref);
        }
    }, [params]);

    return null;
}