'use client';
import './globals.css';
import { ConfigProvider } from 'antd';
import { AnimatePresence } from "framer-motion";
import Analytics from '@/components/Analytics';
import { Suspense } from "react";              // ← add
import RefTracker from "@/components/ReferralTracker"; // ← add
import PurchasePopup from '@/components/PurchasePopup';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col">
        <Analytics />
        <Suspense fallback={null}>             {/* ← add */}
          <RefTracker />                     {/* ← add */}
        </Suspense>
        <PurchasePopup />                           {/* ← add */}
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#4658A4',
              colorText: '#6B7A99',
              colorTextSecondary: '#6B7A99',
              colorLink: '#4658A4',
              borderRadius: 5,
            },
          }}
        >
          <AnimatePresence>{children}</AnimatePresence>
        </ConfigProvider>
      </body>
    </html>
  );
}