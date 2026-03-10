<script setup lang="ts">
import type { ChartData, ChartOptions } from "chart.js";
import Card from "primevue/card";
import Chart from "primevue/chart";
import UserWeightForm from "./UserWeightForm.vue";
import { useQuery } from "@tanstack/vue-query";
import { computed } from "vue";


const { data, isLoading } = useQuery<{ date: string, weight: number }[]>({
    queryKey: ["weights"],
    queryFn: async() => {
        const res = await fetch("http://localhost:3000/api/weights", {
            method: "GET",
            credentials: "include"
        });

        if (!res.ok) throw new Error("Failed to fetch weight entry records");
        return res.json();
    }
})

const documentStyle = getComputedStyle(document.documentElement);
const primaryColor = documentStyle.getPropertyValue("--color-primary");
const primaryGhostColor = documentStyle.getPropertyValue("--color-primary-ghost")

const today = new Date();
const last7Days = Array.from ({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() - (6-i)); 
    return d.getDate();
});

const chartData = computed((): ChartData => {
    const weights = data.value ?? [];

    return {
        labels: last7Days,
        datasets: [
            {
                label: "Weight",
                data: weights.map(w => w.weight),
                fill: true,
                borderColor: primaryColor,
                backgroundColor: primaryGhostColor,
                tension: 0
            },
            {
                label: "Goal",
                data: new Array(7).fill(88), 
                fill: false,
                borderColor: "#666",
                backgroundColor: "#99999944",
                borderDash: [4],
                tension: 0
            }
        ],
    }
});
const chartOptions: ChartOptions = {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    scales: {
        y: {
            min: 40,
            ticks: {
                stepSize: 5
            }
        },
        x: {
            title: {
                display: true,
                padding: 0,
                text: "Week Days"
            }
        }
    }
}

</script>

<template>
    <Card class="w-full">
        <template #title>
            <h2 class="mb-2">Weight Change Graph</h2>
        </template>
        <template #content>
            <span v-if="isLoading">Loading...</span>
            <Chart type="line" :data="chartData" :options="chartOptions" />
        </template>
        <template #footer>
            <UserWeightForm />
        </template>
    </Card>
</template>