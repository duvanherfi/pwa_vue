<template>
  <div style="max-width: 500px">
    <canvas ref="myChart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  name: "BarChart",
  props: ["label", "chartData"],
  methods: {
    async loadChart() {
      await new Chart(this.$refs.myChart.getContext("2d"), {
        type: "bar",
        data: {
          labels: this.label,
          datasets: [
            {
              label: "Cantidades",
              backgroundColor: "rgb(103, 187, 210)",
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
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    },
  },
  mounted() {
    console.log(this.label);
    console.log(this.chartData);
    this.loadChart();
  },
};
</script>
