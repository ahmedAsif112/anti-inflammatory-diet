"use client";

export default function SuccessScreen({ amount, payerName, onReset }) {
  return (
    <div className="w-full max-w-md relative z-10 pop-in">
      <div className="bg-white rounded-3xl shadow-xl shadow-amber-900/10 overflow-hidden text-center">

        {/* Top burst */}
        <div className="bg-gradient-to-b from-amber-300 to-yellow-200 px-8 pt-10 pb-8">
          <div className="text-7xl mb-3" style={{ filter: "drop-shadow(0 4px 16px rgba(217,119,6,0.4))" }}>
            ✅
          </div>
          <h1 className="text-3xl text-amber-950 mb-1" style={{ fontFamily: "'DM Serif Display', serif" }}>
            Payment Successful
          </h1>
          <p className="text-amber-800/70 text-sm">Thank you for choosing SapienceERP.</p>
        </div>

        <div className="px-8 py-8">
          {/* Amount pill */}
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-5 py-2 mb-6">
            <span className="text-amber-600 font-semibold">${amount}</span>
            <span className="text-stone-400 text-sm">service fee received</span>
          </div>

          {/* Message */}
          <p className="text-stone-500 text-sm leading-relaxed mb-8">
            Your payment has been processed successfully. A receipt has been sent to your email address.
            We appreciate your trust in SapienceERP and look forward to serving you.
          </p>

          {/* Divider */}
          <div className="border-t border-stone-100 mb-6" />

          <button
            onClick={onReset}
            className="w-full border-2 border-stone-200 hover:border-amber-400 text-stone-500 hover:text-amber-700 font-medium py-3 rounded-2xl text-sm transition-all"
          >
            Make Another Payment
          </button>

          <p className="text-center text-stone-400 text-xs mt-4">
            SapienceERP · Secured by Stripe
          </p>
        </div>
      </div>
    </div>
  );
}
