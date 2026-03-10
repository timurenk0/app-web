<script setup lang="ts">
import DoughnutChart from './doughnut/DoughnutChart.vue';
import BarChart from './bar/BarChart.vue';
import Card from "primevue/card";
import { useQuery } from '@tanstack/vue-query';
import type { UserStats } from '@l/types';
import { computed, toRef } from 'vue';


const props = defineProps<{
    date: string
}>();

const date = toRef(props, "date");

const { data, isLoading } = useQuery<UserStats>({
    queryKey: ["stats", date],
    queryFn: async () => {
        const res = await fetch(`http://localhost:3000/api/stats?date=${date.value}`, {
            method: "GET",
            credentials: "include"
        });

        if (!res.ok) throw new Error("Failed to fetch user stats");
        return res.json();
    }
});

const totalCalories = 2200;
const consumed = computed(() => data.value?.totalCalories ?? 0)
const macros = computed(() => ({
    Protein: {color: "#DB7070", consumed: data.value?.totalProtein ?? 0, total: 150},
    Fat: {color: "#6296E0", consumed: data.value?.totalFat ?? 0, total: 65},
    Carbs: {color: "#D89964", consumed: data.value?.totalCarbs ?? 0, total: 244},
}));


</script>

<template>
    <Card class="w-full">
        <template #title>
            <p class="card-title text-4xl">Macros</p>
        </template>
        <template v-if="!isLoading" #content>
            <DoughnutChart :totalCalories="totalCalories" :consumed="consumed" />
            <div class="w-full flex gap-6 justify-between">
                <BarChart v-for="[k, v] in Object.entries(macros)"
                    :key="k"
                    :title="k"
                    :color="v.color"
                    :consumed="v.consumed"
                    :total="v.total"
                />
            </div>
        </template>
    </Card>
</template>