'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

const GA_MEASUREMENT_ID = 'G-80THEGVX29'; // 👈 apna GA4 ID

export default function Analytics() {
    const pathname = usePathname();

    // Track route changes
    useEffect(() => {
        if (typeof window.gtag !== 'undefined') {
            window.gtag('event', 'page_view', {
                page_path: pathname,
            });
        }
    }, [pathname]);

    return (
        <>
            {/* GA4 Script */}
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                strategy="afterInteractive"
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
            gtag('event', 'page_view', {
              page_path: window.location.pathname,
            });
          `,
                }}
            />
        </>
    );
}
