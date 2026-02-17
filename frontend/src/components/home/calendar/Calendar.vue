<script setup lang="ts">
const now = new Date();
const day = now.getDate();
</script>

<template>
    <section class="flex items-center justify-between w-screen bg-white px-5 py-2 my-4">
        <div v-for="n in 5" :key="n" :class="['calendar-day', n===3&&'bg-main/50']">
            {{ day+n-3 }}
        </div>
    </section>
</template>