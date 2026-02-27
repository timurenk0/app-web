import { authenticate } from "@/middleware/authenticate";
import { NextResponse as res } from "next/server";


export async function GET() {
    try {
        const user = await authenticate();

        return res.json({ message: `You access secure API endpoint: ${user}` }, { status: 200 });
    } catch (error) {
        const msg = error instanceof Error ? error.message : "Unknown error";
        return res.json({ error: `Failed to test endpoint: ${msg}` }, { status: 500 });
    }
}