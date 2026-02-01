import { NextResponse as res } from "next/server"


export async function GET() {
    return res.json("Hello from /api/test endpoint")
}