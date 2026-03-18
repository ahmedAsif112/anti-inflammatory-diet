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

        return NextResponse.json({ success: true, orders });

    } catch (err) {
        console.error("Get orders error:", err);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}