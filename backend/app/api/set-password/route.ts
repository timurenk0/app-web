import storage from "@/database/storage";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse as res } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: req.headers
        });
        if (!session) return res.json({ error: "UNAUTHORIZED" }, { status: 401 });

        const { password } = await req.json();
        if (!password || password.length < 8) {
            return res.json({ error: "Invalid password" }, { status: 400 });
        }

        const existing = await storage.setUserPassword(password, session.user.id, session.user.email);
    
        return res.json(existing, { status: 201 });
    } catch (error) {
        const msg = error instanceof Error ? error.message : "Unknown error";
        return res.json({ error: `Failed to set the password for user: ${msg}` }, { status: 500 });
    }
}