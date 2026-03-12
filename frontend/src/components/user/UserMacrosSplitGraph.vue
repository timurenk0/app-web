<script setup lang="ts">
import type { ChartData, ChartOptions } from "chart.js";
import Chart from "primevue/chart";
import Card from "primevue/card";
import Select from "primevue/select";
import { useQuery } from "@tanstack/vue-query";
import type { UserFoodEntry } from "@l/types";
import { computed, ref, type ComputedRef } from "vue";


const { data, isLoading } = useQuery<UserFoodEntry[]>({
    queryKey: ["user-foods"],
    queryFn: async() => {
        const res = await fetch("http://localhost:3000/api/user-foods", {
            method: "GET",
            credentials: "include"
        });

        if (!res.ok) throw new Error("Failed to fetch user food entries");
        return res.json();
    },
});

const categories = ["calories", "fat", "protein", "carbs"] as const;
const selectedCategory = ref<typeof categories[number]>("calories");
    
const mealTypes = ["breakfast", "lunch", "dinner", "snacks"];
const actualData = computed(() => data.value ?? []);
const filterByMealType = (filter: typeof categories[number]) => {
    return mealTypes.map(mt => {
        const filtered = actualData.value.filter(d => d.mealType === mt);
        return filtered.reduce((acc, curr) => acc + (curr[filter] ?? 0), 0);
    })
}

const datasets: ComputedRef<Record<typeof categories[number], number[]>> = computed(() => ({
    "calories": filterByMealType("calories"),
    "carbs": filterByMealType("carbs"),
    "protein": filterByMealType("protein"),
    "fat": filterByMealType("fat"),
}))

console.log(datasets.value);
const chartData = computed((): ChartData => ({
    labels: ["breakfast", "lunch", "dinner", "snacks"],
    datasets: [
        {
            data: datasets.value[selectedCategory.value],
            backgroundColor: ["#9cd2e3", "#acecc4", "#eca87e", "#cd9ce3"],
            spacing: 0,
        }
    ]
}))
const chartOptions: ChartOptions = {
    maintainAspectRatio: false,
    aspectRatio: 1,
    elements: {
        arc: {
            borderWidth: 1,
        }
    }
};
</script>

<template>
    <Card class="w-full">
        <template #title>
            <div class="flex justify-between items-center mb-2">
                <h2 class="mb-2">Macros Split</h2>
                <Select v-model="selectedCategory" :options="Object.values(categories)" :default-value="categories[0]" placeholder="Select category"></Select>
            </div>
        </template>
        <template v-if="!isLoading" #content>
            <p v-if="isLoading">Loading macros data...</p>
            <Chart type="pie" :data="chartData" :options="chartOptions" class="h-[200px]" />
        </template>
    </Card>
</template>