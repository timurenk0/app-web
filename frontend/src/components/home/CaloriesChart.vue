<script lang="ts">
    import { Pie } from 'vue-chartjs';
    import { Chart as ChartJS, Tooltip, ArcElement, Title } from "chart.js"

    ChartJS.register(Tooltip, ArcElement, Title);

    const totalCalories = 2200;
    let consumedCalories = 1800;
    const testDataset = [(totalCalories-consumedCalories), consumedCalories];

    export default {
        name: "CaloriesChart",
        components: { Pie },
        data() {
            return {
                chartConfig: {
                    labels: ["Left", "Consumed"],
                    datasets: [{
                        data: testDataset,
                        backgroundColor: ["#e5e5e5", "#2A2"],
                    }]
                },
                chartOptions: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: "Calorie Intake"
                        }
                    }
                }
            }
        }
    }
</script>

<template>
    <Pie
        :options="chartOptions"
        :data="chartConfig"
    />
</template>