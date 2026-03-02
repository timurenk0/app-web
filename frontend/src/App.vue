<script setup lang="ts">
import Footer from '@c/layout/Footer.vue';
import Toast from "primevue/toast";
import Layout from "@c/layout/Layout.vue";
</script>

<template>
  <Toast />
  <Layout>
    <router-view />
    <Footer />
  </Layout>
</template>

<style>
</style>
