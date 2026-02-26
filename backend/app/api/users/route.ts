import { insertUserSchema } from "@/database/schema";
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

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const validUserData = insertUserSchema.parse(body);

        const newUser = await storage.addUser(validUserData);

        return res.json(newUser, { status: 201 });
    } catch (error) {
        const msg = error instanceof Error ? error.message : "Unknown error";
        return res.json({ error: `Failed to add user: ${msg}` }, { status: 500 });
    }
}