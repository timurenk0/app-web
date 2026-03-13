<script setup lang="ts">
import type { ChartOptions } from "chart.js";
import Chart from "primevue/chart";
import { ref } from "vue";


let chartView = ref("consumed");

const toggleChartView = () => {
    chartView.value === "consumed" ? chartView.value = "left" : chartView.value = "consumed";
}

const { totalCalories, consumed } = defineProps<{
    totalCalories: number,
    consumed: number;
}>();
const data = [consumed, totalCalories-consumed]

const ghostTextColor = getComputedStyle(document.documentElement);


const chartData = {
    labels: ["Consumed", "Remaining"],
    datasets: [{
        data: consumed > totalCalories ? [totalCalories, 0] : data,
        backgroundColor: [ghostTextColor.getPropertyValue("--color-accent"), ghostTextColor.getPropertyValue("--color-ghost")],
        borderWidth: 0,
        spacing: 8,
        borderRadius: [20, 20],
    }],
}
const chartOptions = {
    rotation: -112.5,
    circumference: 225,
    cutout: "90%",
    plugins: {
        legend: {
            display: false
        }
    }
}
</script>

<template>
    <div class="relative flex justify-center h-[200px] aspect-auto">
        <Chart type="doughnut" :options="chartOptions" :data="chartData" />
        <div class="absolute top-20 text-center cursor-pointer" v-on:click="toggleChartView">
            <p :class="`text-4xl font-semibold ${consumed > totalCalories && 'text-red-600/75'}`">{{ chartView === "consumed" ? consumed : totalCalories-consumed}}<span class="text-xs text-text">/{{ totalCalories }}</span></p>
            <p class="text-ghost-text">{{ chartView === "consumed" ? "Consumed" : "Remaining" }}</p>
        </div>
    </div>
</template>