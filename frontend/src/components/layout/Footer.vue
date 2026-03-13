<script setup lang="ts">
import { HomeIcon, BookTextIcon, UserIcon } from 'lucide-vue-next';
import { ref } from 'vue';

const location = window.location.pathname;
console.log(location)
const activeIdx = ref(location);

const items = [
    { icon: BookTextIcon, href: "https://mealprepmanual.com/" },
    { icon: HomeIcon, href: "/" },
    { icon: UserIcon, href: "/user" },
]

function setActive(idx: string) {
    activeIdx.value = idx;
}
</script>

<template>
    <footer class="fixed left-0 bottom-0 w-full">
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