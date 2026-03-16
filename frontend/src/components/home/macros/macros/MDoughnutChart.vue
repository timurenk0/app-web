<script setup lang="ts">
import Chart from "primevue/chart";
import { computed } from "vue";


const { title, color, consumed, total } = defineProps<{
    title: string,
    color: string,
    consumed: number,
    total: number
}>();
const data = computed(() => ([consumed, total-consumed]));

const ghostTextColor = getComputedStyle(document.documentElement);


const chartData = computed(() => ({
    labels: ["Consumed", "Remaining"],
    datasets: [{
        data: consumed > total ? [total, 0] : data.value,
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
    <section class="w-full">
        <p class="text-center mb-2 font-semibold text-2xl">
            {{ consumed }} / {{ total }}
        </p>
        <div class="relative flex justify-center h-[100px] aspect-auto">
            <Chart type="doughnut" :options="chartOptions" :data="chartData" />
            <p class="absolute top-10">{{ title }}</p>
        </div>
    </section>
</template>