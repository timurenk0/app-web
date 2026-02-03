import { createRouter, createWebHistory } from "vue-router"


export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "Home",
            component: ()=> import("@v/Home.vue")
        },
        {
            path: "/search",
            name: "Search",
            component: ()=> import("@v/Search.vue")
        },
        {
            path: "/favorites",
            name: "Favorites",
            component: ()=> import("@v/Favorites.vue")
        },
        {
            path: "/counter",
            name: "Counter",
            component: ()=> import("@v/Settings.vue")
        },

    ]
})