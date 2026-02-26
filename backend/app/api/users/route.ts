import { storage } from "@/database/storage";
import { NextRequest, NextResponse as res } from "next/server";


export async function GET(req: NextRequest) {
    try {
        const users = await storage.getUsers();

        return res.json(users, { status: 200 });
    } catch (error) {
        const msg = error instanceof Error ? error.message : "Unknown error";
        return res.json({ error: `Failed to fetch users: ${msg}` }, { status: 500 });
    }
}