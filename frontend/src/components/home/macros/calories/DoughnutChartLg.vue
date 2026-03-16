<script setup lang="ts">
import { Flame } from "lucide-vue-next";
import Chart from "primevue/chart";
import { computed, ref } from "vue";


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
        data: consumed > totalCalories ? [totalCalories, 0] : data.value,
        backgroundColor: [ghostTextColor.getPropertyValue("--color-accent"), ghostTextColor.getPropertyValue("--color-ghost")],
        borderWidth: 0,
        spacing: 0,
        borderRadius: [20, 20],
    }],
}));
const chartOptions = {
    cutout: "90%",
    plugins: {
        legend: {
            display: false
        }
    }
}
</script>

<template>
    <section class="grid grid-cols-2">
        <div class="flex flex-col items-center justify-center cursor-pointer" v-on:click="toggleChartView">
            <p :class="`text-8xl font-semibold ${consumed > totalCalories && 'text-red-600/75'}`">{{ chartView === "consumed" ? consumed : totalCalories-consumed}}<span class="text-2xl text-text">/{{ totalCalories }}</span></p>
            <p class="text-ghost-text text-xl">{{ chartView === "consumed" ? "Consumed" : "Remaining" }}</p>
        </div>
        <div class="relative flex justify-center h-[200px] aspect-auto">
            <Chart type="doughnut" :options="chartOptions" :data="chartData" />
            <Flame class="absolute top-18" :size="60" />
        </div>
    </section>
</template>