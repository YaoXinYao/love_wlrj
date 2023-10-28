<template>
  <div class="chart" ref="chartRef"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, Ref, ref } from "vue";
import { ECharts, EChartsOption, init } from "echarts";

let chart: ECharts;
const chartRef: Ref<HTMLElement | null> = ref(null);
// 初始化图表
const initChart = () => {
  const option: EChartsOption = {
    legend: {
      top: "bottom",
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    series: [
      {
        name: "Nightingale Chart",
        type: "pie",
        radius: [50, 250],
        center: ["50%", "50%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 8,
        },
        data: [
          { value: 0, name: "考核" },
          { value: 0, name: "头脑风暴" },
          { value: 0, name: "讲课" },
          { value: 0, name: "博客" },
          { value: 0, name: "算法" },
          { value: 0, name: "项目" },
          { value: 0, name: "平时成绩" },
          { value: 0, name: "老带新" },
        ],
      },
    ],
  };
  chart.setOption(option);
};

onMounted(() => {
  chart = init(chartRef.value as HTMLElement);
  initChart();
});
</script>

<style scoped>
.chart {
  width: 370px;
  height: 400px;
}
</style>
