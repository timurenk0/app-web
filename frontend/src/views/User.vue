<script setup lang="ts">
import { auth, logOut } from '@l/auth-client';
import Button from "primevue/button";
import UserInfo from '@c/user/user-info/UserInfo.vue';
import ThemeToggle from '@c/user/settings/ThemeToggle.vue';
import AddProductForm from '@c/user/settings/AddProductForm.vue';

const user = await auth();

const signOut = async () => { await logOut(); window.location.reload() }
</script>

<template>
    <section class="flex flex-col items-center gap-4">
        <UserInfo :username="user.name" :email="user.email" :image="user.image" />
        <ThemeToggle />
        <AddProductForm v-if="user.role === 'admin'" />
        <Button fluid severity="danger" v-on:click="signOut">Logout</Button>
    </section>
</template>