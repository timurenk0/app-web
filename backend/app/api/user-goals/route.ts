import { insertUserGoalEntrySchema, insertWeightEntrySchema } from "@/database/schema";
import storage from "@/database/storage";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse as res } from "next/server";


export async function GET(req: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: req.headers
        });
        if (!session) return res.json({ error: "UNAUTHORIZED" }, { status: 401 });
    
        const userGoal = await storage.getUserGoalEntryForUser(session.user.id);

        return res.json(userGoal, { status: 200 });
    } catch (error) {
        const msg = error instanceof Error ? error.message : "Unknown error";
        return res.json({ error: `Failed to fetch user goal records: ${msg}` }, { status: 500 });
    }
};

export async function POST(req: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: req.headers
        });
        if (!session) return res.json({ error: "UNAUTHORIZED" }, { status: 401 });

        const body = await req.json();


        const validUserGoalData = insertUserGoalEntrySchema.parse({ ...body, userId: session.user.id });
        const newUserGoalEntry = await storage.addUserGoalEntry(validUserGoalData);

        return res.json(newUserGoalEntry, { status: 201 });
    } catch (error) { 
        const msg = error instanceof Error ? error.message : "Unknown error";
        return res.json({ error: `Failed to post user goal records: ${msg}` }, { status: 500 });
    }
}