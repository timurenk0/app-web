<script setup lang="ts">
import { BookTextIcon, HomeIcon, Settings2Icon, TrendingUpIcon, UserIcon } from 'lucide-vue-next';
import { ref } from 'vue';

const location = window.location.pathname;
console.log(location)
const activeIdx = ref(location);

const items = [
    { icon: BookTextIcon, href: "/recipies" },
    { icon: TrendingUpIcon, href: "/stats" },
    { icon: HomeIcon, href: "/" },
    { icon: UserIcon, href: "/user" },
    { icon: Settings2Icon, href: "/settings" },
]

function setActive(idx: string) {
    activeIdx.value = idx;
}
</script>

<template>
    <footer class="fixed left-0 bottom-0 w-full">
        <div class="bg-white footer-shadow grid grid-cols-5 mx-4 my-2 py-4 rounded-full">
            <div
                v-for="(item,index) in items"
                :key="index"
                class="flex relative justify-center items-center" 
            >
            <a
                :href="item.href"
                @click="setActive(item.href)"
                :class="{ active: activeIdx === item.href }"
            >
                <component :is="item.icon" :size="32" />
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
    background-color: var(--color-primary);
    border-radius: 50%;
    padding: calc(var(--spacing)*3);
    margin-bottom: calc(var(--spacing)*6);
    z-index: 10;
}

.footer-shadow {
    box-shadow: 0 0 8px 0 var(--color-ghost-text);
}
</style>