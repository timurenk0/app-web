<script setup lang="ts">
import { Doughnut } from 'vue-chartjs';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    ArcElement
} from "chart.js"
import { ref } from 'vue';

ChartJS.register(Title, Tooltip, ArcElement)


let chartView = ref("consumed");

const toggleChartView = () => {
    chartView.value === "consumed" ? chartView.value = "left" : chartView.value = "consumed";
}

const { totalCalories, consumed } = defineProps<{
    totalCalories: number,
    consumed: number;
}>();
const data = [consumed, totalCalories-consumed]


const chartData = {
    labels: ["Consumed", "Remaining"],
    datasets: [{
        data,
        backgroundColor: ["#27a433", "#e5e5e5"],
        borderWidth: 0,
        spacing: 8,
        borderRadius: [10, 10],
    }],
}
const chartOptions = {
    rotation: -90,
    circumference: 180,
    cutout: "90%",
}
</script>

<template>
    <div class="relative flex justify-center h-[200px]" v-on:click="toggleChartView">
        <Doughnut :options="chartOptions" :data="chartData" />
        <div class="absolute pt-6 inset-0 flex flex-col items-center justify-center">
            <p class="text-text text-4xl font-semibold">{{ chartView === "consumed" ? consumed : totalCalories-consumed}}<span class="text-xs">/{{ totalCalories }}</span></p>
            <p class="text-ghost-text">{{ chartView === "consumed" ? "Consumed" : "Remaining" }}</p>
        </div>
        <!-- <p class="absolute left-1 top-57">0</p>
        <p class="absolute right-1 top-57">{{ totalCalories }}</p> -->
    </div>
</template>