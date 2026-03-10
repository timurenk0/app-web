import storage from "@/database/storage";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse as res } from "next/server";


export async function GET(req: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: req.headers
        });
        if (!session) return res.json({ error: "UNAUTHORIZED" }, { status: 401 });

        const date = req.nextUrl.searchParams.get("date");
        if (date) {
            if (isNaN(Date.parse(date))) return res.json({ error: "Invalid date format" }, { status: 400 });
        }

        console.log(date);

        const stats = await storage.getUserStats(session.user.id, date || new Date().toISOString().slice(0, 10));

        return res.json(stats, { status: 200 });
    } catch (error) {
        const msg = error instanceof Error ? error.message : "Unknown error";
        return res.json({ error: `Failed to fetch user stats: ${msg}` }, { status: 500 });
    }
}