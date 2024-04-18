<template>
  <div style="max-width: 500px">
    <canvas ref="myChart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  name: "PieChart",
  props: ["label", "chartData"],
  methods: {
    async loadChart() {
      await new Chart(this.$refs.myChart.getContext("2d"), {
        type: "pie",
        data: {
          labels: this.label,
          datasets: [
            {
              label: "Cantidades",
              data: this.chartData,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    },
  },
  mounted() {
    this.loadChart();
  },
};
</script>
