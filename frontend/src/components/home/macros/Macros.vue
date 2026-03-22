<script setup lang="ts">
import DoughnutChart from './calories/DoughnutChart.vue';
import BarChart from './macros/BarChart.vue';
import Card from "primevue/card";
import { useQuery } from '@tanstack/vue-query';
import type { UserStats } from '@l/types';
import { computed, toRef } from 'vue';
import DoughnutChartLg from './calories/DoughnutChartLg.vue';
import MDoughnutChart from './macros/MDoughnutChart.vue';


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

const totalCalories = computed(() => data.value?.totalCalories ?? 0);
const consumed = computed(() => data.value?.consumedCalories ?? 0);
const macros = computed(() => ({
    Protein: {color: "#DB7070", consumed: data.value?.consumedProtein ?? 0, total: data.value?.totalProtein ?? 0},
    Fat: {color: "#6296E0", consumed: data.value?.consumedFat ?? 0, total: data.value?.totalFat ?? 0},
    Carbs: {color: "#D89964", consumed: data.value?.consumedCarbs ?? 0, total: data.value?.totalCarbs ?? 0},
}));


</script>

<template>
    <section class="w-full lg:hidden">
        <Card>
            <template #title>
                <p class="damion text-4xl">Macros</p>
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
    </section>
    <section class="hidden lg:block">
        <Card class="w-full">
            <template #title>
                <p class="damion text-4xl">Macros</p>
            </template>
            <template v-if="!isLoading" #content>
                <DoughnutChartLg :totalCalories="totalCalories" :consumed="consumed" />
            </template>
        </Card>
        <div class="w-full flex justify-between mt-4 gap-4">
            <Card
                v-for="[k, v] in Object.entries(macros)"
                :key="k"
                class="w-full"
            >
            <template #content>
                <MDoughnutChart
                    :title="k"
                    :color="v.color"
                    :consumed="v.consumed"
                    :total="v.total"
                />
            </template>
            </Card>
        </div>
    </section>
</template>