import { db } from "@/database/db";
import bcrypt from "bcryptjs";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";


export const auth = betterAuth({
    trustedOrigins: ["http://localhost:5173"],

    // database adapter
    database: drizzleAdapter(db, {
        provider: "pg"
    }),

    // send email verification after signup
    emailVerification: {
        sendOnSignUp: true,
        sendOnSignIn: false,
        sendVerificationEmail: async ({ user, url, token }) => {
            // some logic... 
        },
        autoSignInAfterVerification: true,
        expiresIn: 3600
    },

    // signin options
    emailAndPassword: {
        enabled: true,
        disableSignUp: false,
        requireEmailVerification: true,
        minPasswordLength: 8,
        maxPasswordLength: 128,
        autoSignIn: true,
        sendResetPassword: async({ user, url, token }) => {
            // some logic..
        },
        password: {
            hash: async (password) => {
                const hashed = bcrypt.hash(password, 10);
                return hashed;
            },
            verify: async ({ hash, password }) => {
                const isValid = await bcrypt.compare(password, hash);
                return isValid;
            }
        }
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
        }
    }
})