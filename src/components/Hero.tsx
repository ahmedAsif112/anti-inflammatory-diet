"use client";

import Image from "next/image";
import heroDesktop from "@/assets/hero-desktop.jpg"; // 1440x560px
import heroMobile from "@/assets/Anti-hero-mobile.jpg";   // 800x900px

export default function Hero() {
    return (
        <section className="w-full bg-[#f5f2eb]">

            {/* Desktop Image — visible on md+ */}
            <div className="hidden md:block w-full">
                <Image
                    src={heroDesktop}
                    alt="Anti Inflammatory Hero"
                    width={1440}
                    height={560}
                    sizes="100vw"
                    priority
                    quality={90}
                    style={{ width: "100%", height: "auto", display: "block" }}
                />
            </div>

            {/* Mobile Image — visible on small screens */}
            <div className="block md:hidden w-full">
                <Image
                    src={heroMobile}
                    alt="Anti Inflammatory Hero"
                    width={800}
                    height={900}
                    sizes="100vw"
                    priority
                    quality={90}
                    style={{ width: "100%", height: "auto", display: "block" }}
                />
            </div>



        </section>
    );
}