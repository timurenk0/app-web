<script setup lang="ts">
import { Icon } from '@iconify/vue';

</script>

<template>
    <footer class="fixed bottom-0 text-5xl grid grid-cols-4 border border-white w-full py-2">
        <RouterLink to="/">
            <Icon icon="mdi:home" class="mx-auto" />
        </RouterLink>
        <RouterLink to="/search">
            <Icon icon="mdi:search" class="mx-auto" />
        </RouterLink>
        <RouterLink to="/favorites">
            <Icon icon="mdi:star" class="mx-auto" />
        </RouterLink>
        <RouterLink to="settings">
            <Icon icon="mdi:settings" class="mx-auto" />
        </RouterLink>
    </footer>
</template>

<style scoped></style>