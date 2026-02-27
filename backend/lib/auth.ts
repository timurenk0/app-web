import { db } from "@/database/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";


export const auth = betterAuth({
    trustedOrigins: ["http://localhost:5173"],
    database: drizzleAdapter(db, {
        provider: "pg"
    }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: false
    },
    socialProviders: {
        google: {
            clientId: process.env.AUTH_GOOGLE_ID as string,
            clientSecret: process.env.AUTH_GOOGLE_SECRET as string
        }
    }
})