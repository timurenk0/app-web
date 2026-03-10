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
    <section class="flex flex-col items-center gap-4">
        <Calendar @date-selected="handleDate" />
        <Macros :date="date" />
        <Intake />
    </section>
</template>