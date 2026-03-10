<script setup lang="ts">
import { ArrowDown, ArrowUp, ChevronRight } from "lucide-vue-next";
import Panel from "primevue/panel";
import { ref } from "vue";
import IntakeForm from "./IntakeForm.vue";

const toggled = ref(true);

/**
 * Custom helper function to change the status of the Panel component and switch between two custom icons
 */
function toggle () {
    toggled.value = !toggled.value;
}

const { title, foods } = defineProps<{
    title: string,
    foods: any[]
}>();

</script>

<template>
    <Panel toggleable collapsed class="my-2">
        <template #header>
            <div class="flex flex-col">
                <div class="flex items-center gap-2">
                    <span class="card-title text-xl">{{ title }}</span>
                </div>

                <div class="w-full">
                    <hr class="text-ghost my-1">
                    <p v-if="foods.length > 0" class="text-ghost-text text-sm">{{ foods.length }}pcs ({{ foods.reduce((a, b) => a.calories+b.calories)}} kcal)</p>
                </div>
            </div>
        </template>
        
        <!-- Custom collapse button with dynamic icon using custom toggle function -->
        <!-- CURRENT BUG: custom icon has smaller hitbox than original togglebutton of the Panel component. Can miss the icon switch if clicked out of the bounds of the icon -->
        <template #toggleicon>
            <div v-on:click="toggle" v-if="toggled">
                <ArrowDown />
            </div>
            <div v-on:click="toggle" v-else>
                <ArrowUp />
            </div>
        </template>

        <template #icons>
            <IntakeForm :type="title" />
        </template>
    
        <template #default>
            <div v-for="(f, i) in foods" :key="i" class="grid grid-cols-10 bg-main/10 rounded-md my-2 py-1">
                <div class="col-span-1">
                </div>
                <div class="col-span-8 font-semibold">
                    <p class="text-xs text-ghost-text">{{ f.brand }}</p>
                    <p>{{ f.product }}</p>
                    <p class="font-normal text-xs text-main mt-1 flex justify-between">{{ f.amount }} {{ f.uom }}</p>
                </div>
                <div class="my-auto">
                    <ChevronRight />
                </div>
            </div>
        </template>
    </Panel>
</template>