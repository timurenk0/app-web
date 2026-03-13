<script setup lang="ts">
import { useDarkMode } from "@l/useDarkMode";
import { Moon, Sun } from "lucide-vue-next";

const { isDark, toggle } = useDarkMode();
</script>

<template>
    <button 
        type="button" 
        @click="toggle" 
        class="p-2 rounded-full
        text-gray-700 hover:text-gray-900
        dark:text-gray-300 dark:hover:text-gray-100
        hover:bg-gray-200 dark:hover:bg-gray-700
        transition-colors focus:outline-none focus:ring-2 focus:ring-main/50"
    >
        <Sun v-if="isDark" />
        <Moon v-else />
    </button>
</template>