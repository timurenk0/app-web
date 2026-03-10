<script setup lang="ts">
import Card from "primevue/card";
import IntakeCategory from "./IntakeCategory.vue";
import { useQuery } from "@tanstack/vue-query";
import type { UserFoodEntry } from "@l/types";
import { computed, toRef } from "vue";

const cats = ["Breakfast", "Lunch", "Dinner", "Snacks"];


const props = defineProps<{
    date: string
}>();
const date = toRef(props, "date");

const { data, isLoading } = useQuery<UserFoodEntry[]>({
    queryKey: ["user-foods", date],
    queryFn: async () => {
        const res = await fetch(`http://localhost:3000/api/user-foods?date=${date.value}`, {
            method: "GET",
            credentials: "include"
        });

        if (!res.ok) {
            throw new Error("Failed to fetch user food entries");
        }

        return res.json();
    }
});

const food = computed(() => data.value ?? []);
</script>

<template>
    <Card class="w-full">
        <template #content>
            <span v-if="isLoading">Loading your daily intake...</span>
            <IntakeCategory
                v-for="cat in cats"
                :title="cat"
                :foods="food.filter(f=>f.mealType === cat.toLowerCase())"
            />
        </template>
    </Card>
</template>