<script setup lang="ts">
import { BookTextIcon, HomeIcon, Settings2Icon, TrendingUpIcon, UserIcon } from 'lucide-vue-next';


</script>

<template>
    <footer class="fixed bottom-0 bg-white/60 w-full flex justify-between items-center px-5">
        <a href="/recipies">
            <BookTextIcon :size="32" />
        </a>
        <a href="/stats">
            <TrendingUpIcon :size="32" />
        </a>
        <a class="relative bottom-10 bg-green border rounded-full px-4 py-4">
            <HomeIcon :size="48" />
        </a>
        <a href="/user">
            <UserIcon :size="32" />
        </a>
        <a href="/settings">
            <Settings2Icon :size="32" />
        </a>
    </footer>
</template>

<style scoped></style>