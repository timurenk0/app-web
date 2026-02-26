<script setup lang="ts">
import { ArrowDown, ArrowUp, Plus, Apple } from "lucide-vue-next";
import Button from "primevue/button"
import Panel from "primevue/panel";
import { ref } from "vue";

const toggled = ref(false);

/**
 * Custom helper function to change the status of the Panel component and switch between two custom icons
 */
function toggle () {
    toggled.value = !toggled.value;
}

function addFood() {
    console.log("food added")
}

const { title } = defineProps<{
    title: string
}>();
</script>

<template>
    <Panel toggleable>
        <template #header>
            <div class="flex flex-col">
                <div class="flex items-center gap-2">
                    <Apple />
                    <span class="card-title text-xl">{{ title }}</span>
                </div>

                <div class="w-full">
                    <hr class="text-ghost my-1">
                    <p class="text-ghost-text text-sm">2pcs (210kcal)</p>
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
            <Button v-on:click="addFood" variant="text">
                <Plus />
            </Button>
        </template>
    
        <template #default>
            <div class="mt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores molestias beatae consequuntur fugiat, iusto aperiam quas, dignissimos amet officia debitis exercitationem! Repellendus numquam dolore blanditiis soluta voluptate sed, est nobis?
            </div>
        </template>
    </Panel>
</template>