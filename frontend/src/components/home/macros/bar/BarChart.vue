<script setup lang="ts">
import ProgressBar from 'primevue/progressbar';

const { title, color, consumed, total } = defineProps<{
    title: string,
    color: string,
    consumed: number,
    total: number
}>();

const ratio = consumed/total*100;
console.log(color)

</script>

<template>
    <div class="w-full">
        <p class="text-center text-sm text-ghost-text">{{ title }}</p>
        <ProgressBar :value="ratio" style="height: 8px;" :pt="{value:{style:{backgroundColor:color}}}" :show-value="false"></ProgressBar>
        <p class="text-center text-sm font-medium">{{ consumed }} / {{ total }} g</p>
    </div>
</template>

<style scoped>
    .p-progressbar {
        background-color: var(--color-ghost);
    }
</style>