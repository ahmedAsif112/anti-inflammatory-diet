import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET() {
    try {
        const db = await getDb();
        const orders = await db
            .collection("orders")
            .find({})
            .sort({ createdAt: -1 })
            .toArray();

        // ✅ ObjectId ko string mein convert karo
        const serialized = orders.map(order => ({
            ...order,
            _id: order._id.toString(),
        }));

        return NextResponse.json({ success: true, orders: serialized });

    } catch (err) {
        console.error("Get orders error:", err);
        return NextResponse.json({ success: false, orders: [] }, { status: 500 });
    }
}