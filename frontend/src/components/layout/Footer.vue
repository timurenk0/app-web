<script setup lang="ts">
import { HomeIcon, BookTextIcon, UserIcon } from 'lucide-vue-next';
import { ref } from 'vue';

const location = window.location.pathname;
console.log(location)
const activeIdx = ref(location);

const items = [
    { icon: BookTextIcon, href: "https://mealprepmanual.com/", title: "recipes" },
    { icon: HomeIcon, href: "/", title: "home" },
    { icon: UserIcon, href: "/user", title: "user" },
]

function setActive(idx: string) {
    activeIdx.value = idx;
}
</script>

<template>
    <footer class="fixed left-0 bottom-0 w-full lg:hidden">
        <div class="bg-auxiliary footer-shadow grid grid-cols-3 mx-16 my-2 py-4 rounded-full">
            <div
                v-for="(item,index) in items"
                :key="index"
                class="flex relative justify-center items-center" 
            >
            <a
                :href="item.href"
                :target="index === 0 ? 'blank' : ''"
                @click="setActive(item.href)"
                :class="{ active: activeIdx === item.href }"
            >
                <component :is="item.icon" :size="32" />
            </a>
            </div>
        </div>
    </footer>
    <footer class="hidden lg:grid lg:grid-cols-2 mb-6">
        <div></div>
        <div class="flex justify-around relative mx-10">
            <div
                v-for="(item, index) in items"
                :key="index"
            >
                <a
                    :href="item.href"
                    :target="index === 0 ? 'blank' : ''"
                    @click="setActive(item.href)"
                    :class="{ activeLg: activeIdx === item.href }"
                >
                    <p>{{ item.title }}</p>
                </a>
            </div>
        </div>
    </footer>
</template>

<style scoped>
a {
    display: inline-flex;
    transition: transform 0.3s ease, background-color 0.3s ease;
}

.active {
    position: absolute;
    transform: translateY(calc(var(--spacing)*3));
    background-color: var(--color-accent);
    border-radius: 50%;
    padding: calc(var(--spacing)*3);
    margin-bottom: calc(var(--spacing)*6);
    z-index: 10;
}

.activeLg {
    position: absolute;
    transform: translateY(calc(var(--spacing)*3));
    color: var(--color-accent);
    border-bottom: 2px solid var(--color-text);
}

.footer-shadow {
    box-shadow: 0 0 8px 0 var(--color-ghost-text);
}
</style>