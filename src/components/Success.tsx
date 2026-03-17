'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, Download, Flame, Gift, Crown, Mail } from 'lucide-react';

export default function SuccessPage() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [emailSent, setEmailSent] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [referrer, setReferrer] = useState<string | null>(null);
    const hasSent = useRef(false);
    const router = useRouter();


    useEffect(() => {
        // Wait until we have a valid sessionId from URL
        if (!sessionId) {
            router.push("/")
            return;
        }

        setIsVisible(true);

        if (typeof window !== 'undefined') {
            const savedRef = localStorage.getItem('referrer');
            setReferrer(savedRef);

            const email = localStorage.getItem('userEmail');
            if (!email || hasSent.current) return;

            hasSent.current = true;
            setLoading(true);

            fetch('/api/sendemail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ referrer: savedRef, sessionId }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log('✅ Email sent:', data);
                    setEmailSent(true);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error('❌ Email send failed:', err);
                    setLoading(false);
                    router.push('/');
                });
        }
    }, [sessionId, router]);


    useEffect(() => {
        if (sessionId === null) return; // wait for hydration
        if (!sessionId) router.push('/');
    }, [sessionId, router]);


    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-950 to-black overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-10 sm:top-20 right-4 sm:right-10 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-full opacity-60 blur-xl animate-pulse" />
                <div className="absolute bottom-20 sm:bottom-40 left-4 sm:left-10 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-r from-amber-500/20 to-red-500/20 rounded-full opacity-40 blur-lg animate-bounce" />
                <div className="absolute top-1/2 left-1/4 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-orange-500/15 to-red-500/15 rounded-full opacity-50 blur-md animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="relative z-10">
                {/* Header */}
                <header className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                    <div className="max-w-7xl mx-auto flex justify-center items-center">
                        <div className="flex items-center space-x-3 sm:space-x-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl border border-red-500/30">
                                <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                                    CARNIVORE
                                </h1>
                                <p className="text-xs text-gray-400 -mt-1">Elite Protocol</p>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex items-center justify-center px-4 py-4 sm:py-8 min-h-[calc(100vh-100px)] sm:min-h-[calc(100vh-120px)]">
                    {loading ? (
                        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} w-full max-w-sm sm:max-w-lg`}>
                            <div className="bg-gradient-to-br from-red-900/30 to-black/50 border border-red-800/30 rounded-2xl sm:rounded-3xl p-6 sm:p-12 text-center shadow-2xl backdrop-blur-sm">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center animate-spin">
                                    <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                                </div>
                                <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Preparing Your Books...</h2>
                                <p className="text-sm sm:text-base text-gray-300">Sending your carnivore transformation guide to your email</p>
                                <div className="mt-4 sm:mt-6 flex justify-center">
                                    <div className="flex space-x-1">
                                        {[0, 1, 2].map((i) => (
                                            <div
                                                key={i}
                                                className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
                                                style={{ animationDelay: `${i * 0.2}s` }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : emailSent ? (
                        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} w-full max-w-sm sm:max-w-2xl`}>
                            <div className="bg-gradient-to-br from-red-900/30 to-black/50 border border-red-800/30 rounded-2xl sm:rounded-3xl p-6 sm:p-12 text-center shadow-2xl backdrop-blur-sm">
                                {/* Success Icon */}
                                <div className="relative mb-6 sm:mb-8">
                                    <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto flex items-center justify-center animate-bounce shadow-xl">
                                        <CheckCircle className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
                                    </div>
                                    <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-pulse">
                                        <Crown className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                                    </div>
                                </div>

                                {/* Main Heading */}
                                <div className="mb-6 sm:mb-8">
                                    <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
                                        THANK YOU!
                                    </h1>
                                    <div className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-gradient-to-r from-green-900/50 to-emerald-900/50 text-green-400 font-semibold border border-green-800/50 backdrop-blur-sm mb-4 sm:mb-6 text-sm sm:text-base">
                                        <Gift className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                        Your Free Books Are Ready!
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="space-y-4 sm:space-y-6 text-left">
                                    <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-red-800/30">
                                        <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                                            Your <strong className="text-red-400">30 Day Carnivore Diet Mealplan With 6 + Free Bonuses Cookbooks</strong> is on its way to your email.
                                        </p>
                                    </div>

                                    <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-orange-800/30">
                                        <p className="text-base sm:text-lg text-gray-300 mb-4">
                                            But you can also download it directly from the link below:
                                        </p>

                                        <a
                                            href="https://drive.google.com/drive/folders/1qZuHN_ZwpYtGDvVnu8--xKddsKK_Ojb_?usp=drive_link"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center px-4 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group text-sm sm:text-base w-full sm:w-auto justify-center"
                                        >
                                            <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 group-hover:animate-bounce flex-shrink-0" />
                                            <span className="text-center">Click Here to Access Your Download Instantly</span>
                                        </a>
                                    </div>

                                    <div className="text-center">
                                        <p className="text-gray-400 text-xs sm:text-sm flex items-center justify-center">
                                            <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                                            We’ve also sent this link to your email for easy access later.
                                        </p>
                                    </div>
                                </div>

                                {/* Bottom decoration */}
                                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-red-800/30">
                                    <div className="flex justify-center items-center space-x-2 text-gray-400 text-xs sm:text-sm">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0" />
                                        <span className="text-center">Welcome to your carnivore transformation journey</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} w-full max-w-sm sm:max-w-lg`}>
                            <div className="bg-gradient-to-br from-red-900/30 to-black/50 border border-red-800/30 rounded-2xl sm:rounded-3xl p-6 sm:p-12 text-center shadow-2xl backdrop-blur-sm">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-red-500 to-red-700 rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center">
                                    <span className="text-xl sm:text-3xl">❌</span>
                                </div>
                                <h2 className="text-xl sm:text-2xl font-bold text-red-400 mb-3 sm:mb-4">
                                    Email Send Failed
                                </h2>
                                <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6">
                                    We encountered an issue sending your books. Please contact our support team for assistance.
                                </p>
                                <div className="bg-gradient-to-r from-red-900/40 to-black/60 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-red-800/30">
                                    <p className="text-red-300 text-xs sm:text-sm break-all">
                                        Support: support@carnivoreprotocol.com
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                @keyframes pulse {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.05); opacity: 0.8; }
                }
                
                @keyframes bounce {
                    0%, 100% {
                        transform: translateY(-25%);
                        animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
                    }
                    50% {
                        transform: translateY(0);
                        animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
                    }
                }
                
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                .animate-pulse {
                    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                
                .animate-bounce {
                    animation: bounce 1s infinite;
                }
                
                .animate-spin {
                    animation: spin 2s linear infinite;
                }
            `}</style>
        </div>
    );
}