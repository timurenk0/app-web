<script setup lang="ts">
import { auth, logOut } from '@l/auth-client';
import Button from "primevue/button";
import UserInfo from '@c/user/UserInfo.vue';
import ThemeToggle from '@c/user/ThemeToggle.vue';

const user = await auth();


const signOut = async () => { await logOut(); window.location.reload() }
</script>

<template>
    <section class="flex flex-col items-center gap-4">
        <UserInfo :username="user.name" :email="user.email" :image="user.image" />
        <ThemeToggle />
        <Button fluid severity="danger" v-on:click="signOut">Logout</Button>
    </section>
</template>