<script setup lang="ts">
import Card from "primevue/card";
import IntakeCategory from "./IntakeCategory.vue";

const cats = ["Breakfast", "Lunch", "Dinner", "Snacks"];

</script>

<template>
    <Card class="w-full">
        
        <template #content>
            <IntakeCategory
                v-for="cat in cats"
                :title="cat"
            />
        </template>
    </Card>
</template>