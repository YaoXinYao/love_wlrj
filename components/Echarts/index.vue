<template>
  <div class="chart" ref="chartRef"></div>
</template>

<script setup lang="ts">
import { onMounted, type Ref, ref } from "vue";
import { type ECharts, type EChartsOption, init } from "echarts";

let chart: ECharts;
const chartRef: Ref<HTMLElement | null> = ref(null);
// 初始化图表
const initChart = () => {
  const option: EChartsOption = {
    title: {
      text: "个人成绩分析",
      // subtext: "Fake Data",
      left: "center",
    },
    legend: {
      top: "bottom",
      left: "center",
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        // dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    series: [
      {
        name: "模块占比",
        type: "pie",
        radius: [20, 140],
        center: ["50%", "50%"],
        roseType: "radius",
        itemStyle: {
          borderRadius: 5,
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

  window.onresize = function () {
    chart.resize();
  };
});
</script>

<style scoped>
.chart {
  width: 400px;
  height: 400px;
}
</style>
