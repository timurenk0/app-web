<script setup lang="ts">
import Calendar from '@c/home/calendar/Calendar.vue';
import Intake from '@c/home/intake/Intake.vue';
import Macros from '@c/home/macros/Macros.vue';
import { ref } from 'vue';

const date = ref<string>(new Date().toISOString().slice(0, 10));
function handleDate(day: string) {
    date.value = day;
}
</script>

<template>
    <section class="flex flex-col items-center gap-4 lg:grid lg:grid-cols-2 lg:items-start">
        <Calendar @date-selected="handleDate" class="col-span-2 mb-4" />
        <Macros :date="date" />
        <Intake :date="date" />
    </section>
</template>