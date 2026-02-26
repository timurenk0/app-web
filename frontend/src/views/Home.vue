<script setup lang="ts">
import Calendar from '@c/home/calendar/Calendar.vue';
import Intake from '@c/home/intake/Intake.vue';
import Macros from '@c/home/macros/Macros.vue';

const login = () => {
    window.location.href = "http://localhost:3000/api/auth/signin/google";
}
</script>

<template>
    <section class="flex flex-col align-center px-6 gap-4">
        <button @click="login">Click me</button>
        <Calendar />
        <Macros />
        <Intake />
    </section>
</template>