<script setup lang="ts">
import CaloriesChart from '@c/home/CaloriesChart.vue';
import NutrientsCharts from '@c/home/NutrientsCharts.vue';

</script>

<template>
    <section class="flex flex-col align-center">
        <div class="py-4">
            <!-- Calories, Proteins, Fats and Carbs charts -->
            <NutrientsCharts />
            <CaloriesChart />
        </div>
    </section>
</template>