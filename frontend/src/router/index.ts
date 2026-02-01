import { createRouter, createWebHistory } from "vue-router"


export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "Counter",
            component: ()=> import("@v/Counter.vue")
        }
    ]
})