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

        const today = new Date();
        const result: { date: string; weight: number | null }[] = [];

        // map existing entries
        const weightsMap = new Map(
            weights.map((w) => [
                new Date(w.uploadedAt).toISOString().slice(0, 10),
                w.weight
            ])
        );

        // last or first next weight taken as reference for nulls
        let anchorWeight: number = weights[0].weight;

        // build last 7 days
        for (let i = 6; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(today.getDate() - i);

            const dateStr = d.toISOString().slice(0, 10);

            if (weightsMap.has(dateStr)) {
                anchorWeight = weightsMap.get(dateStr)!;
                result.push({ date: dateStr, weight: anchorWeight });
            } else {
                result.push({ date: dateStr, weight: anchorWeight });
            }
        }

        return res.json(result, { status: 200 });
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

        return res.json(newWeightEntry, { status: 201});
    } catch (error) {
        const msg = error instanceof Error ? error.message : "Unknown error";
        return res.json({ error: `Failed to add weight record: ${msg}` }, { status: 500 });    
    }
}