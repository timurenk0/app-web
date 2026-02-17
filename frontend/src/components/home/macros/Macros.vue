<script setup lang="ts">
import DoughnutChart from './doughnut/DoughnutChart.vue';
import BarChart from './bar/BarChart.vue';


const totalCalories = 2200;
const consumed = 1543;

const macros = {
    Protein: {color: "#DB7070", consumed: 100, total: 150},
    Fat: {color: "#6296E0", consumed: 30, total: 65},
    Carbs: {color: "#D89964", consumed: 166, total: 244},
};
</script>

<template>
    <section class="card">
        <p class="card-title">Calories</p>
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
    </section>
</template>