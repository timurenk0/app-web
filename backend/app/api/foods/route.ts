import { insertFoodEntrySchema } from "@/database/schema";
import storage from "@/database/storage";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse as res } from "next/server";


export async function GET() {
    try {
        const foods = await storage.getFoods();

        return res.json(foods, { status: 200 });
    } catch (error) {
        const msg = error instanceof Error ? error.message : "Unknown error";
        return res.json({ error: `Failed to fetch food entries: ${msg}` }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: req.headers
        });
        if (!session) return res.json({ error: "UNAUTHORIZED" }, { status: 401 });
        if (session.user.role !== "admin") return res.json({ error: "FORBIDDEN" }, { status: 403 });

        const body = await req.json();
        console.log(body);

        const validFoodData = insertFoodEntrySchema.parse(body);

        const newFood = await storage.addFoodEntry(validFoodData);

        return res.json(newFood, { status: 201 }); 
    } catch (error) {
        const msg = error instanceof Error ? error.message : "Unknown error";
        return res.json({ error: `Failed to post food entry: ${msg}` }, { status: 500 });
    }
}