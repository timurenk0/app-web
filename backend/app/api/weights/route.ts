import { auth } from "@/lib/auth";
import storage from "@/database/storage";
import { NextRequest, NextResponse as res } from "next/server";
import { insertWeightEntrySchema } from "@/database/schema";


export async function GET(req: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: req.headers
        });

        if (!session) return res.json({ error: "UNAUTHORIZED" }, { status: 401 });

        const weights = await storage.getWeightEntriesForUser(session.user.id);

        return res.json(weights, { status: 200 });
    } catch (error) {
        const msg = error instanceof Error ? error.message : "Unknown error";
        return res.json({ error: `Failed to fetch weight entries: ${msg}` }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: req.headers
        });

        if (!session) return res.json({ error: "UNAUTHORIZED" }, { status: 401 });

        const body = await req.json();

        const { weight } = body; 

        const validWeightEntryData = insertWeightEntrySchema.parse({ weight, userId: session.user.id });

        const newWeightEntry = await storage.addWeightEntry(validWeightEntryData);

        return res.json(newWeightEntry, { status: 200 });
    } catch (error) {
        const msg = error instanceof Error ? error.message : "Unknown error";
        return res.json({ error: `Failed to add weight record: ${msg}` }, { status: 500 });    
    }
}