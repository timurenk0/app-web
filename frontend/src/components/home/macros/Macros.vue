<script setup lang="ts">
import DoughnutChart from './doughnut/DoughnutChart.vue';
import BarChart from './bar/BarChart.vue';


const macros = {
    Protein: {color: "#DB7070", consumed: 100, total: 150},
    Fat: {color: "#6296E0", consumed: 30, total: 65},
    Carbs: {color: "#D89964", consumed: 166, total: 244},
};
</script>

<template>
    <section class="bg-white w-full rounded-lg">
        <DoughnutChart  />
        <div class="w-full flex gap-2 justify-between px-2 pb-4">
            <BarChart v-for="[k, v] in Object.entries(macros)"
                :key="k"
                :title="k"
                :color="v.color"
                :consumed="v.consumed"
                :total="v.total"
                 />
        </div>
    </section>
</template>