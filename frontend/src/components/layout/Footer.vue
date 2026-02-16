<script setup lang="ts">
import { BookTextIcon, HomeIcon, Settings2Icon, TrendingUpIcon, UserIcon } from 'lucide-vue-next';


</script>

<template>
    <footer class="fixed bottom-0 bg-white/60 w-full flex justify-between px-5">
        <button>
            <BookTextIcon :size="32" />
        </button>
        <button>
            <TrendingUpIcon :size="32" />
        </button>
        <button class="relative bottom-10 bg-green border rounded-full px-4 py-4">
            <HomeIcon :size="48" />
        </button>
        <button>
            <UserIcon :size="32" />
        </button>
        <button>
            <Settings2Icon :size="32" />
        </button>
    </footer>
</template>

<style scoped></style>