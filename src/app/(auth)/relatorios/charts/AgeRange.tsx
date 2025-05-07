"use client";

import { getAgeRange } from "@/api/endpoints";
import { useChart } from "@/hooks/useChart";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { ChartLoader } from "../ChartLoader";
import { BarChartData } from "./types.dt";

export const AgeRange = () => {
  const { isLoading, hasError, fetchChart, buildTitlePlugin } = useChart();

  const [chart, setChart] = useState<BarChartData | null>(null);

  const title = "Distribuição por idade dos assistidos";

  const fixOrderThatBackendSendIncorretly = (chart: any) => {
    const lastLabel = chart.labels.pop();
    const lastData = chart.data.pop();
    chart.labels.splice(1, 0, lastLabel);
    chart.data.splice(1, 0, lastData);

    return chart;
  };

  useEffect(() => {
    fetchChart(title, getAgeRange).then((chart) => {
      const fixedChart = fixOrderThatBackendSendIncorretly(chart);
      const chartData = {
        data: {
          labels: fixedChart.labels,
          datasets: [
            {
              data: fixedChart.data,
              backgroundColor: "#36A2EB",
              categoryPercentage: 0.8,
              barPercentage: 0.9,
              minBarLength: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: buildTitlePlugin(title),
            legend: {
              display: false,
            },
          },
        },
      };
      setChart(chartData);
    });
  }, []);

  const displayLoader = isLoading || hasError || !chart;

  return (
    <div className="max-md:w-full w-[80%] m-auto">
      {displayLoader ? (
        <ChartLoader chartName={title} error={hasError} />
      ) : (
        <Bar data={chart?.data} options={chart?.options} />
      )}
    </div>
  );
};
