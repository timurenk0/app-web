import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './router'
import "vuetify/_styles.scss"
import { createVuetify } from "vuetify"
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura"
import { ToastService } from 'primevue'
import { VueQueryPlugin } from "@tanstack/vue-query";
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { FcGoogle } from 'oh-vue-icons/icons'

addIcons(FcGoogle)

const vuetify = createVuetify();

createApp(App)
    .use(router)
    .use(vuetify)
    .use(PrimeVue, {
        pt: {
            card: {
                root: {
                    style: { backgroundColor: "var(--color-card)" }
                },
                title: {
                    style: { color: "var(--color-text-card)" }
                }
            }
        },
        theme: {
            preset: Aura,
            options: {
                darkModeSelector: ".dark"
            }
        }
    })
    .use(ToastService)
    .use(VueQueryPlugin)
    .component("v-icon", OhVueIcon)
    .mount('#app')
