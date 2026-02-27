<script setup lang="ts">
import Calendar from '@c/home/calendar/Calendar.vue';
import Intake from '@c/home/intake/Intake.vue';
import Macros from '@c/home/macros/Macros.vue';

import { authClient } from "@l/auth-client";
const { data } = await authClient.getSession();
console.log(data);
</script>

<template>
    <section class="flex flex-col align-center px-6 gap-4">
        <Calendar />
        <Macros />
        <Intake />
    </section>
</template>