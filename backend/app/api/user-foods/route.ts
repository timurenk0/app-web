import { insertUserFoodEntrySchema } from "@/database/schema";
import storage from "@/database/storage";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
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

        const userFoods = await storage.getUserFoodEntriesForUser(session.user.id, date || new Date().toISOString().slice(0, 10));
        console.log(userFoods);

        return res.json(userFoods, { status: 200 });
    } catch (error) {
        const msg = error instanceof Error ? error.message : "Unknown error";
        return res.json({ error: `Failed to fetch user food entries: ${msg}` }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: req.headers
        });

        if (!session) return res.json({ error: "UNAUTHORIZED" }, { status: 401 });

        const body = await req.json();

        console.log(body)
        const validUserFoodEntryData = insertUserFoodEntrySchema.parse({ ...body, userId: session.user.id });

        const newUserFoodEntry = await storage.addUserFoodEntry(validUserFoodEntryData);

        return res.json(newUserFoodEntry, { status: 201 });
    } catch (error) {
        const msg = error instanceof Error ? error.message : "Unknown error";
        return res.json({ error: `Failed to post user food entry: ${msg}` }, { status: 500 });
    }
}