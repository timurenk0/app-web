<script setup lang="ts">
import UserWeight from '@c/user/UserWeight.vue';
import { auth, logOut } from '@l/auth-client';
import Button from "primevue/button";
import { defineAsyncComponent } from 'vue';

const user = await auth();

const UserInfo = defineAsyncComponent(() => import("@c/user/UserInfo.vue"));

const signOut = async () => { await logOut(); window.location.reload() }
</script>

<template>
    <section class="flex flex-col items-center gap-4">
        <UserInfo :username="user.name" :email="user.email" />
        <UserWeight />
        <Button fluid severity="danger" v-on:click="signOut">Logout</Button>
    </section>
</template>