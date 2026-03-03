<script setup lang="ts">
import type { ChartData, ChartOptions } from "chart.js";
import Card from "primevue/card";
import Chart from "primevue/chart";

const today = new Date().getDay();
const documentStyle = getComputedStyle(document.documentElement);
const primaryColor = documentStyle.getPropertyValue("--color-primary");

const chartData: ChartData = {
    labels: [today-6, today-5, today-4, today-3, today-2, today-1, today],
    datasets: [
        {
            label: "Weight",
            data: [67, 69, 72, 71, 70, 75, 80],
            fill: false,
            borderColor: primaryColor,
            backgroundColor: primaryColor,
            tension: 0
        },
    ],
};
const chartOptions: ChartOptions = {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
        legend: {
            display: true,
        }
    },
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
        <template #content>
            <Chart type="line" :data="chartData" :options="chartOptions" />
        </template>
        <template #footer>
            <p class="text-center mt-6">Weight Change Graph</p>
        </template>
    </Card>
</template>