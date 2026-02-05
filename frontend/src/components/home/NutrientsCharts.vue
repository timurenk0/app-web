<script lang="ts">
    import { Bar } from 'vue-chartjs';
    import { Chart as ChartJS, Title, Tooltip, BarElement, CategoryScale, LinearScale } from "chart.js"

    ChartJS.register(Title, Tooltip, BarElement, CategoryScale, LinearScale);

    const testDataset = [170, 60, 250];

    export default {
        name: "NutrientsChart",
        components: { Bar },
        data() {
            return {
                chartData: {
                    labels: ["Proteins", "Fats", "Carbs"],
                    datasets: [{
                        data: testDataset,
                        backgroundColor: [ "#8b54c7", "#a36a23", "#00f" ],
                        barThickness: 30,
                    }] 
                },
                chartOptions: {
                    responsive: true
                }
            }
        }
    }

</script>

<template>
    <Bar
        id="barchart"
        :options="chartOptions"
        :data="chartData"
     />
</template>