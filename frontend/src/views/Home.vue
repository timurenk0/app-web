<script setup lang="ts">
import CaloriesChart from '@c/home/CaloriesChart.vue';
import NutrientsCharts from '@c/home/NutrientsCharts.vue';
import Calendar from '@c/home/calendar/Calendar.vue';
</script>

<template>
    <section class="flex flex-col align-center">
        <!-- Calories, Proteins, Fats and Carbs charts -->
        <!-- <NutrientsCharts />
        <CaloriesChart /> -->
        <Calendar />
    </section>
</template>