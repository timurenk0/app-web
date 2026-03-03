<script setup lang="ts">
import Footer from '@c/layout/Footer.vue';
import Toast from "primevue/toast";
import Layout from "@c/layout/Layout.vue";
import { Suspense } from 'vue';
</script>

<template>
  <Toast />
  <Layout>
    <Suspense>
      <template #default>
        <router-view />
      </template>
      <template #fallback>
        <h1>Loading page...</h1>
      </template>
    </Suspense>
    <Footer />
  </Layout>
</template>

<style>
</style>
