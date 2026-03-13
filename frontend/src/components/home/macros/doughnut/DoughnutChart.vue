<script setup lang="ts">
<<<<<<< HEAD
import { Doughnut } from 'vue-chartjs';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    ArcElement
} from "chart.js"
import { computed, ref } from 'vue';

ChartJS.register(Title, Tooltip, ArcElement)
=======
import type { ChartOptions } from "chart.js";
import Chart from "primevue/chart";
import { ref } from "vue";
>>>>>>> eeb05cbbf90896b5892e4f2b3bf20af0bec70ef9


let chartView = ref("consumed");

const toggleChartView = () => {
    chartView.value === "consumed" ? chartView.value = "left" : chartView.value = "consumed";
}

const { totalCalories, consumed } = defineProps<{
    totalCalories: number,
    consumed: number;
}>();
const data = computed(() => ([consumed, totalCalories-consumed]));

const ghostTextColor = getComputedStyle(document.documentElement);


const chartData = computed(() => ({
    labels: ["Consumed", "Remaining"],
    datasets: [{
<<<<<<< HEAD
        data: consumed > totalCalories ? [totalCalories, 0] : data.value,
        backgroundColor: ["#27a433", "#e5e5e5"],
=======
        data: consumed > totalCalories ? [totalCalories, 0] : data,
        backgroundColor: [ghostTextColor.getPropertyValue("--color-accent"), ghostTextColor.getPropertyValue("--color-ghost")],
>>>>>>> eeb05cbbf90896b5892e4f2b3bf20af0bec70ef9
        borderWidth: 0,
        spacing: 8,
        borderRadius: [20, 20],
    }],
}));
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