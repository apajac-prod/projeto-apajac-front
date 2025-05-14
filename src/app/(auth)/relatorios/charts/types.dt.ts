import { ChartData, ChartOptions } from "chart.js";

export type BarChartData = {
  data: ChartData<"bar">;
  options: ChartOptions<"bar">;
};

export type DoughnutChartData = {
  data: ChartData<"doughnut">;
  options: ChartOptions<"doughnut">;
};
