<script setup lang="ts">
import { Doughnut } from 'vue-chartjs';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    ArcElement
} from "chart.js"

ChartJS.register(Title, Tooltip, ArcElement)

const totalCalories = 2200;
const consumed = 623;
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
    <div class="relative flex justify-center h-[200px]">
        <Doughnut :options="chartOptions" :data="chartData" />
        <div class="absolute pt-6 inset-0 flex flex-col items-center justify-center">
            <p class="text-text text-4xl font-semibold">{{ totalCalories-consumed }}</p>
            <p class="text-ghost-text">Remaining</p>
        </div>
        <!-- <p class="absolute left-1 top-57">0</p>
        <p class="absolute right-1 top-57">{{ totalCalories }}</p> -->
    </div>
</template>