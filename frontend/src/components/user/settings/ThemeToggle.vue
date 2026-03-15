<script setup lang="ts">
import { useDarkMode } from "@l/useDarkMode";
import { Moon, Sun } from "lucide-vue-next";
import ToggleSwitch from "primevue/toggleswitch";
import Card from "primevue/card";

const { isDark, toggle } = useDarkMode();

</script>

<template>
    <Card class="w-full">
        <template #content>
            <div class="flex justify-between">
                <p>Switch to {{ isDark ? 'light' : 'dark' }} mode</p>
                <ToggleSwitch @change="toggle" v-model="isDark">
                    <template #handle="{ checked: isDark }">
                        <Sun v-if="!isDark" />
                        <Moon v-else />
                    </template>
                </ToggleSwitch>
            </div>
        </template>
    </Card>
</template>