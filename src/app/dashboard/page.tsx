"use client";

import { useEffect, useState } from "react";

type Order = {
    _id: string;
    orderNumber: string;
    transactionId: string;
    sessionId: string;
    email: string;
    deliveredAt: string;
    status: string;
    createdAt: string;
};

export default function DashboardPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch("/api/get-orders")
            .then(r => r.json())
            .then(data => {
                setOrders(data.orders || []);
                setLoading(false);
            });
    }, []);

    const filtered = orders.filter(o =>
        o.email.toLowerCase().includes(search.toLowerCase()) ||
        o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
        o.transactionId.toLowerCase().includes(search.toLowerCase())
    );

    const formatDate = (d: string) =>
        new Date(d).toLocaleString("en-US", {
            year: "numeric", month: "short", day: "numeric",
            hour: "2-digit", minute: "2-digit",
        });

    return (
        <main className="min-h-screen bg-[#f5f2eb] py-10 px-4 sm:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1a2e1f]">
                        Orders Dashboard
                    </h1>
                    <p className="text-[#5a5a4a] text-sm mt-1">
                        All transactions and delivery records
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                    {[
                        { label: "Total Orders", value: orders.length },
                        { label: "Delivered", value: orders.filter(o => o.status === "delivered").length },
                        { label: "Today", value: orders.filter(o => new Date(o.createdAt).toDateString() === new Date().toDateString()).length },
                    ].map(s => (
                        <div key={s.label} className="bg-white rounded-2xl px-5 py-4 border border-[#e8e4dc] shadow-sm">
                            <p className="text-2xl font-extrabold text-[#2d5a3d]">{s.value}</p>
                            <p className="text-xs text-[#8a8a7a] mt-0.5">{s.label}</p>
                        </div>
                    ))}
                </div>

                {/* Search */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search by email, order number, or transaction ID..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full bg-white border border-[#e8e4dc] rounded-xl px-4 py-3 text-sm text-[#1a2e1f] placeholder-[#aaaaaa] focus:outline-none focus:ring-2 focus:ring-[#2d5a3d]/30 focus:border-[#2d5a3d]"
                    />
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl border border-[#e8e4dc] shadow-sm overflow-hidden">
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="w-10 h-10 rounded-full border-4 border-[#2d5a3d] border-t-transparent animate-spin" />
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="text-center py-20 text-[#8a8a7a] text-sm">
                            No orders found.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-[#f5f2eb] border-b border-[#e8e4dc]">
                                        {["Order No.", "Email", "Transaction ID", "Delivered At", "Status"].map(h => (
                                            <th key={h} className="text-left px-4 py-3 text-xs font-bold text-[#8a8a7a] uppercase tracking-wider whitespace-nowrap">
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map((o, i) => (
                                        <tr
                                            key={o._id}
                                            className={`border-b border-[#f0ede6] hover:bg-[#f9f7f3] transition-colors ${i % 2 === 0 ? "" : "bg-[#fdfcfa]"}`}
                                        >
                                            <td className="px-4 py-3 font-bold text-[#1a2e1f] whitespace-nowrap">
                                                {o.orderNumber}
                                            </td>
                                            <td className="px-4 py-3 text-[#5a5a4a] whitespace-nowrap">
                                                {o.email}
                                            </td>
                                            <td className="px-4 py-3 text-[#8a8a7a] font-mono text-xs whitespace-nowrap max-w-[200px] truncate">
                                                {o.transactionId}
                                            </td>
                                            <td className="px-4 py-3 text-[#5a5a4a] whitespace-nowrap">
                                                {formatDate(o.deliveredAt)}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full">
                                                    ✓ {o.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                <p className="text-xs text-[#9a9a8a] mt-4 text-center">
                    Total {filtered.length} of {orders.length} orders
                </p>
            </div>
        </main>
    );
}