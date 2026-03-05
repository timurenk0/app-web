import storage from "@/database/storage";
import { NextResponse as res } from "next/server";


export async function GET() {
    try {
        const foods = await storage.getFoods();

        return res.json(foods, { status: 200 });
    } catch (error) {
        const msg = error instanceof Error ? error.message : "Unknown error";
        return res.json({ error: `Failed to fetch food entries: ${msg}` }, { status: 500 });
    }
}