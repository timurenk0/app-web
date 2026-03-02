import { isLoggedIn } from "@l/auth-client";
import { createRouter, createWebHistory } from "vue-router";


export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "Home",
            component: ()=> import("@v/Home.vue")
        },
        {
            path: "/login",
            name: "Login",
            component: ()=> import("@v/Login.vue")
        },
        {
            path: "/signup",
            name: "Sign Up",
            component: ()=> import("@v/Signup.vue")
        },
    ]
});

router.beforeEach(async (to, from) => {
    const access = await isLoggedIn();
    if (!access && to.name !== "Login") {
        console.log("Should be redirected")
        return { name: "Login" }
    }
});