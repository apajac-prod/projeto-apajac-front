"use client";

import { getDistributionBySex } from "@/api/endpoints";
import { useChart } from "@/hooks/useChart";
import { Chart } from "chart.js";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { ChartLoader } from "../ChartLoader";
import { DoughnutChartData } from "./types.dt";

export const DistributionBySex = () => {
  const { isLoading, hasError, fetchChart, buildTitlePlugin, generateLabels } =
    useChart();

  const [chart, setChart] = useState<DoughnutChartData | null>(null);

  const title = "Distribuição por sexo dos assistidos";
  const labels = ["Não definidos", "Masculino", "Feminino"];

  useEffect(() => {
    fetchChart(title, getDistributionBySex).then((chart) => {
      const chartData = {
        data: {
          labels: labels,
          datasets: [
            {
              data: chart.data,
              backgroundColor: ["#DDD", "#36A2EB", "#FF6384"],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: buildTitlePlugin(title),
            legend: {
              labels: {
                generateLabels: (chart: Chart<"doughnut">) =>
                  generateLabels(chart),
              },
            },
          },
        },
      };
      setChart(chartData);
    });
  }, []);

  const displayLoader = isLoading || hasError || !chart;

  return (
    <div className="max-md:w-full max-md:h-64 w-1/2 h-96">
      {displayLoader ? (
        <ChartLoader chartName={title} error={hasError} />
      ) : (
        <Doughnut data={chart?.data} options={chart?.options} />
      )}
    </div>
  );
};
