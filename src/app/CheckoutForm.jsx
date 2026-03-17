"use client";

import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

export default function CheckoutForm({ amount, payerName, onSuccess, onBack }) {
  const stripe   = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Stripe hasn't loaded yet — wait
    if (!stripe || !elements) return;

    setLoading(true);

    // Tell Stripe to collect and confirm the payment
    // The PaymentElement already has the card details
    const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
      elements,
      // We handle the result ourselves (redirect: "if_required" means
      // no full-page redirect for card payments — stays in our app)
      confirmParams: {
        return_url: `${window.location.origin}/success`, // fallback for redirect-based methods
      },
      redirect: "if_required",
    });

    if (stripeError) {
      // Show Stripe's human-friendly error message
      setError(stripeError.message);
      setLoading(false);
      return;
    }

    if (paymentIntent && paymentIntent.status === "succeeded") {
      onSuccess();
    } else {
      setError("Payment was not completed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-lg relative z-10 fade-up">
      <div className="bg-white rounded-3xl shadow-xl shadow-amber-900/10 overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-amber-400 to-yellow-300 px-8 pt-8 pb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-amber-800 text-sm hover:text-amber-950 transition-colors mb-4"
          >
            ← Back
          </button>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-800/70 text-sm">Service fee</p>
              <p className="text-4xl font-bold text-amber-950" style={{ fontFamily: "'DM Serif Display', serif" }}>
                ${amount}
              </p>
            </div>
            <div className="text-5xl">💛</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-8">
          <p className="text-xs font-semibold tracking-widest text-stone-400 uppercase mb-3">
            Payment Details
          </p>

          {/* Stripe's pre-built Payment Element */}
          {/* This renders card number, expiry, CVC, and more based on browser/location */}
          <div className="mb-6">
            <PaymentElement
              options={{
                layout: "tabs", // shows card, Apple Pay, Google Pay tabs
              }}
            />
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm">
              <span>⚠️</span> {error}
            </div>
          )}

          {/* Pay button */}
          <button
            type="submit"
            disabled={loading || !stripe}
            className="w-full bg-amber-400 hover:bg-amber-500 disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed text-amber-950 font-semibold py-4 rounded-2xl text-base transition-all duration-200 hover:shadow-lg hover:shadow-amber-300/40 hover:-translate-y-0.5 active:translate-y-0"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-amber-700/30 border-t-amber-800 rounded-full animate-spin" />
                Processing payment...
              </span>
            ) : (
              `Complete Payment — $${amount}`
            )}
          </button>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-4 mt-5">
            <span className="text-stone-400 text-xs flex items-center gap-1">
              🔒 SSL Secure
            </span>
            <span className="text-stone-300">·</span>
            <span className="text-stone-400 text-xs flex items-center gap-1">
              ⚡ Powered by Stripe
            </span>
            <span className="text-stone-300">·</span>
            <span className="text-stone-400 text-xs flex items-center gap-1">
              🛡️ PCI Compliant
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
