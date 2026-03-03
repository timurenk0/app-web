<script setup lang="ts">
import UserInfo from '../components/user/UserInfo.vue';
import UserWeight from '@c/user/UserWeight.vue';
</script>

<template>
    <section class="flex flex-col items-center gap-4">
        <UserInfo />
        <UserWeight />
    </section>
</template>