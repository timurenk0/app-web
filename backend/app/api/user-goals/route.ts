import storage from "@/database/storage";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse as res } from "next/server";


export async function GET(req: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: req.headers
        });
        if (!session) return res.json({ error: "UNAUTHORIZED" }, { status: 401 });
    
        const userGoals = await storage.getUserGoalEntries(session.user.id);

        return res.json(userGoals, { status: 200 });
    } catch (error) {
        const msg = error instanceof Error ? error.message : "Unknown error";
        return res.json({ error: `Failed to fetch user goal records: ${msg}` }, { status: 500 });
    }
}