import { createAuthClient } from "better-auth/client";
export const authClient = createAuthClient({
    baseURL: "http://localhost:3000"
});


const CALLBACK_URL = "http://localhost:5173"

export const signInWithGoogle = async () => {
    const data = await authClient.signIn.social({
        provider: "google",
        callbackURL: CALLBACK_URL
    });
    console.log(data);
};

export const signUpWithEmail = async (userInfo: { name: string, email: string, password: string }) => {
    const data = await authClient.signUp.email({
        ...userInfo,
        callbackURL: CALLBACK_URL
    })
    console.log(data);
}

export const signInWithEmail = async (loginInfo: { name: string, email: string, password: string }) => {
    const data = await authClient.signIn.email({
        ...loginInfo,
        callbackURL: CALLBACK_URL
    });
    console.log(data);
}

export const isLoggedIn = async (): Promise<boolean> => {
    const { data: session } = await authClient.getSession();
    return !!session;
}

export const logOut = async (): Promise<boolean> => {
    await authClient.signOut();
    return true;
}