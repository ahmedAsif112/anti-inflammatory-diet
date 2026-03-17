"use client";

import { useState } from "react";

const PRESETS = [
  { label: "$5",  value: 5,   emoji: "☕", desc: "A coffee" },
  { label: "$15", value: 15,  emoji: "🍕", desc: "A slice" },
  { label: "$25", value: 25,  emoji: "🎁", desc: "A gift" },
  { label: "$50", value: 50,  emoji: "🌟", desc: "A star" },
];

export default function AmountStep({ onConfirm }) {
  const [selected, setSelected]   = useState(null);
  const [custom, setCustom]       = useState("");
  const [name, setName]           = useState("");
  const [email, setEmail]         = useState("");
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");

  const displayAmount = selected ?? (custom ? Number(custom) : null);

  const handleSubmit = async () => {
    setError("");
    if (!name.trim())                          return setError("Please enter your name.");
    if (!email.trim() || !email.includes("@")) return setError("Please enter a valid email.");
    if (!displayAmount || displayAmount < 1)   return setError("Minimum amount is $1.");

    setLoading(true);
    await onConfirm(displayAmount, name, email);
    setLoading(false);
  };

  return (
    <div className="w-full max-w-lg relative z-10">

      {/* Header card */}
      <div className="bg-white rounded-3xl shadow-xl shadow-amber-900/10 overflow-hidden fade-up">

        {/* Top banner */}
        <div className="bg-gradient-to-r from-amber-400 to-yellow-300 px-8 pt-10 pb-8 text-center relative">
          <div className="text-5xl mb-3">💼</div>
          <h1 className="text-3xl text-amber-950 mb-1" style={{ fontFamily: "'DM Serif Display', serif" }}>
            Complete Your Payment
          </h1>
          <p className="text-amber-800/80 text-sm font-light">
            Please enter the agreed service fee and proceed with the secure checkout.
            Thank you for choosing SapienceERP.
          </p>
        </div>

        <div className="px-8 py-8">

          {/* Preset tiles */}
          <p className="text-xs font-semibold tracking-widest text-stone-400 uppercase mb-3 fade-up-delay-1">
            Select Service Fee
          </p>
          <div className="grid grid-cols-4 gap-2 mb-6 fade-up-delay-1">
            {PRESETS.map((p) => (
              <button
                key={p.value}
                onClick={() => { setSelected(p.value); setCustom(""); }}
                className={`flex flex-col items-center py-4 rounded-2xl border-2 transition-all duration-200 group ${
                  selected === p.value
                    ? "border-amber-400 bg-amber-50 shadow-md shadow-amber-200"
                    : "border-stone-200 bg-stone-50 hover:border-amber-300 hover:bg-amber-50/50"
                }`}
              >
                <span className="text-xl mb-1">{p.emoji}</span>
                <span className={`font-semibold text-sm ${selected === p.value ? "text-amber-700" : "text-stone-700"}`}>
                  {p.label}
                </span>
                <span className="text-stone-400 text-[10px]">{p.desc}</span>
              </button>
            ))}
          </div>

          {/* Custom amount */}
          <p className="text-xs font-semibold tracking-widest text-stone-400 uppercase mb-2 fade-up-delay-2">
            Or Enter Agreed Amount
          </p>
          <div className="relative mb-6 fade-up-delay-2">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-600 font-semibold text-lg">$</span>
            <input
              type="number"
              min="1"
              value={custom}
              onChange={(e) => { setCustom(e.target.value); setSelected(null); }}
              placeholder="Enter service fee amount..."
              className="w-full bg-stone-50 border-2 border-stone-200 focus:border-amber-400 rounded-2xl py-3.5 pl-9 pr-4 text-stone-800 placeholder-stone-300 outline-none transition-colors text-base"
            />
          </div>

          {/* Name & Email */}
          <div className="space-y-3 mb-6 fade-up-delay-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full bg-stone-50 border-2 border-stone-200 focus:border-amber-400 rounded-2xl py-3.5 px-4 text-stone-800 placeholder-stone-300 outline-none transition-colors text-sm"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full bg-stone-50 border-2 border-stone-200 focus:border-amber-400 rounded-2xl py-3.5 px-4 text-stone-800 placeholder-stone-300 outline-none transition-colors text-sm"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm">
              <span>⚠️</span> {error}
            </div>
          )}

          {/* CTA */}
          <button
            onClick={handleSubmit}
            disabled={loading || !displayAmount}
            className="w-full bg-amber-400 hover:bg-amber-500 disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed text-amber-950 font-semibold py-4 rounded-2xl text-base transition-all duration-200 hover:shadow-lg hover:shadow-amber-300/40 hover:-translate-y-0.5 active:translate-y-0"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-amber-700/30 border-t-amber-800 rounded-full animate-spin" />
                Setting up payment...
              </span>
            ) : displayAmount ? (
              `Proceed to Secure Checkout — $${displayAmount} →`
            ) : (
              "Enter your service fee to continue"
            )}
          </button>

          <p className="text-center text-stone-400 text-xs mt-4">
            Secured by Stripe · SSL encrypted · SapienceERP
          </p>
        </div>
      </div>
    </div>
  );
}
