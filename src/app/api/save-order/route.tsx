import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function POST(req: Request) {
    try {
        const { email, transactionId, sessionId } = await req.json();

        if (!email || !transactionId) {
            return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
        }

        const db = await getDb();
        const orders = db.collection("orders");

        // Generate order number — ORD-0001 format
        const count = await orders.countDocuments();
        const orderNumber = `ORD-${String(count + 1).padStart(4, "0")}`;

        const order = {
            orderNumber,
            transactionId,
            sessionId,
            email,
            deliveredAt: new Date(),
            status: "delivered",
            createdAt: new Date(),
        };

        await orders.insertOne(order);

        return NextResponse.json({ success: true, orderNumber });

    } catch (err) {
        console.error("Save order error:", err);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}