import { db } from "@/database/db";
import { user } from "@/database/schema";
import bcrypt from "bcryptjs";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { eq } from "drizzle-orm";


export const auth = betterAuth({
    trustedOrigins: ["http://localhost:5173"],
    

    // database adapter
    database: drizzleAdapter(db, {
        provider: "pg"
    }),

    // send email verification after signup
    emailVerification: {
        sendOnSignUp: false,
        sendOnSignIn: false,
    },

    // signin options
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 8,
        maxPasswordLength: 128,
    },
    socialProviders: {
        google: {
            clientId: process.env.AUTH_GOOGLE_ID as string,
            clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
        }
    },
    
    // session
    session: {
        expiresIn: 86400,
        updateAge: 86400,
        disableSessionRefresh: true,
        storeSessionInDatabase: true,
        preserveSessionInDatabase: false,
        cookieCache: {
            enabled: true,
            maxAge: 300
        },   
    },
    
    // user
    user: {
        additionalFields: {
            role: {
                type: ["user", "admin"],
                required: true,
                defaultValue: "user",
                input: false
            },
        }
    }
});