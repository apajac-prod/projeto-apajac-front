"use client";

import * as icon from "react-flaticons";
import FormTitle from "@/components/titles/form/form";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, BarElement, Chart, ChartDataset } from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, BarElement);

const chartTitlePlugin = (title: string) => ({
  display: true,
  text: title,
  font: { size: 16 },
  padding: 10,
});

const MOCK_RELATORIOS = {
  SEXO: {
    data: {
      labels: ["Masculino", "Feminino", "Não definidos"],
      datasets: [
        {
          data: [30, 50, 120],
          backgroundColor: ["#36A2EB", "#FF6384", "#DDD"],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: chartTitlePlugin("Distribuição por Sexo"),
        legend: {
          labels: {
            generateLabels: (chart: Chart<"doughnut">) => {
              const datasets = chart.data.datasets as ChartDataset<"doughnut">[];
              return datasets[0].data.map((data, i) => ({
                text: `${chart.data.labels?.[i]} ${data}`,
                hidden: !chart.getDataVisibility(i),
                fillStyle: Array.isArray(datasets[0].backgroundColor) ? datasets[0].backgroundColor[i] : "#000",
                index: i,
              }));
            },
          },
        },
      },
    },
  },
  IDADE_INGRESSO: {
    data: {
      labels: [
        "0 a 4 anos",
        "5 a 9 anos",
        "10 a 14 anos",
        "15 a 19 anos",
        "20 a 24 anos",
        "25 a 29 anos",
        "30 a 34 anos",
        "35 a 39 anos",
        "40 anos ou mais",
      ],
      datasets: [
        {
          data: [0, 50, 120, 80, 100, 60, 40, 20, 10],
          backgroundColor: "#FF5733",
          categoryPercentage: 0.8,
          barPercentage: 0.9,
          minBarLength: 2
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: chartTitlePlugin("Distribuição por Idade de Ingresso"),
        legend: {
          display: false,
        }
      },
    },
  },
};

const Relatorios = () => {
  return (
    <>
      <FormTitle
        className="m-auto my-8"
        title={"Relatórios e estatísticas"}
        Icon={icon.Stats}
      />
    <div className="flex justify-center items-center gap-8 mx-4 w-full max-w-[calc(100%-32px)] max-md:flex-wrap">
      {/* Gráfico Doughnut */}
      <div className="max-md:w-full max-md:h-64 w-1/2 h-96">
        <Doughnut data={MOCK_RELATORIOS.SEXO.data} options={MOCK_RELATORIOS.SEXO.options} />
      </div>

      {/* Gráfico de Barras */}
      <div className="max-md:w-full max-md:h-64 w-1/2 h-96">
        <Bar data={MOCK_RELATORIOS.IDADE_INGRESSO.data} options={MOCK_RELATORIOS.IDADE_INGRESSO.options} />
      </div>
    </div>
    </>
  );
};

export default Relatorios;
