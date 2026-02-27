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
