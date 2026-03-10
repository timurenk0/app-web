<script setup lang="ts">
const now = new Date();

const dates = Array.from ({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(now.getDate() - (6-i));
    return d.getDate()
});
console.log(dates)
</script>

<template>
    <section class="flex items-center justify-between w-screen bg-white px-5 py-2">
        <div v-for="n in dates" :key="n" :class="['calendar-day', n===now.getDate()&&'bg-main/50']">
            {{ n }}
        </div>
    </section>
</template>