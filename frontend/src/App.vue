<script setup lang="ts">
import Footer from '@c/layout/Footer.vue';
import Toast from "primevue/toast";
import Layout from "@c/layout/Layout.vue";
import { computed, Suspense } from 'vue';
import { useRoute } from 'vue-router';
import { useDarkMode } from '@l/useDarkMode';

const route = useRoute();

const hideFooter = computed(() => !route.meta.hideFooter);
useDarkMode();
</script>

<template>
  <Toast />
  <Layout>
    <Footer v-if="hideFooter" />
    <Suspense>
      <template #default>
        <router-view />
      </template>
      <template #fallback>
        <h1>Loading page...</h1>
      </template>
    </Suspense>
  </Layout>
</template>
