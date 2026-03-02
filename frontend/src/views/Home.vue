<script setup lang="ts">
import Calendar from '@c/home/calendar/Calendar.vue';
import Intake from '@c/home/intake/Intake.vue';
import Macros from '@c/home/macros/Macros.vue';
import { logOut } from '@l/auth-client';


const logout = async () => {
    try {
        const isLoggedOut = await logOut();    
        
        console.log(isLoggedOut)
        window.location.reload();
        return;
    } catch (error) {
        const msg = error instanceof Error ? error.message : "Unknown error";
        throw new Error(msg);
    }
}

</script>

<template>
    <section class="flex flex-col align-center px-6 gap-4">
        <Button v-on:click="logout">Log Out</Button>
        <Calendar />
        <Macros />
        <Intake />
    </section>
</template>