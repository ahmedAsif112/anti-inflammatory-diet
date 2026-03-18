import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

// ✅ Yeh line add karo — caching disable
export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const db = await getDb();
        const orders = await db
            .collection("orders")
            .find({})
            .sort({ createdAt: -1 })
            .toArray();

        const serialized = orders.map(order => ({
            ...order,
            _id: order._id.toString(),
        }));

        return NextResponse.json(
            { success: true, orders: serialized },
            {
                headers: {
                    // ✅ Browser ko bhi cache na karne do
                    "Cache-Control": "no-store, no-cache, must-revalidate",
                },
            }
        );

    } catch (err) {
        console.error("Get orders error:", err);
        return NextResponse.json({ success: false, orders: [] }, { status: 500 });
    }
}