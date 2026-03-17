import { createAuthClient } from "better-auth/client";
export const authClient = createAuthClient({
    baseURL: "http://localhost:3000",
    fetchOptions: {
        credentials: "include"
    }
});


const CALLBACK_URL = "http://localhost:5173"


export const auth = async () => {
    try {
        const { data: session } = await authClient.getSession();
        if (!session) throw new Error("No session");
        if (!session.user.image) {
            session.user.image = "hello"
        }
        return session.user;
    } catch (error) {
        const msg = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to load user data: ${msg}`);
    }
}

export const signInWithGoogle = async () => {
    const data = await authClient.signIn.social({
        provider: "google",
        callbackURL: CALLBACK_URL,
    });
    console.log(data);
};

export const signUpWithEmail = async (userInfo: { name: string, email: string, password: string }) => {
    const data = await authClient.signUp.email({
        ...userInfo,
        callbackURL: CALLBACK_URL+"/login"
    }, {
        onSuccess: (ctx) => {
            alert("Logged in successfully");
            window.location.href = CALLBACK_URL+"/login"
        }
    })
    console.log(data);
}

export const signInWithEmail = async (loginInfo: { email: string, password: string }) => {
    const data = await authClient.signIn.email({
        ...loginInfo,
        callbackURL: CALLBACK_URL
    });
    console.log(data);
}

export const isLoggedIn = async (): Promise<boolean> => {
    const { data: session } = await authClient.getSession();
    console.log(session);
    return !!session;
}

export const logOut = async (): Promise<boolean> => {
    await authClient.signOut();
    return true;
}