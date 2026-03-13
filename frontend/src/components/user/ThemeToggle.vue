<script setup lang="ts">
import { useDarkMode } from "@l/useDarkMode";
import { Moon, Sun } from "lucide-vue-next";
import ToggleSwitch from "primevue/toggleswitch";

const { isDark, toggle } = useDarkMode();

</script>

<template>
    <ToggleSwitch @change="toggle" v-model="isDark">
        <template #handle="{ checked: isDark }">
            <Sun v-if="!isDark" />
            <Moon v-else />
        </template>
    </ToggleSwitch>
</template>