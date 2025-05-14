import { ChartResponse, ChartResponseConverted } from "@/types/Chart.type";
import { AxiosResponse } from "axios";
import { Chart, ChartDataset, ChartType } from "chart.js";
import { useState } from "react";
import toast from "react-hot-toast";

export const useChart = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const buildTitlePlugin = (title: string) => ({
    display: true,
    text: title,
    font: { size: 16 },
    padding: 10,
  });

  const generateLabels = (chart: Chart<ChartType>) => {
    const datasets = chart.data.datasets as ChartDataset<ChartType>[];
    return datasets[0].data.map((data, i) => ({
      text: `${chart.data.labels?.[i]} ${data}`,
      hidden: !chart.getDataVisibility(i),
      fillStyle: Array.isArray(datasets[0].backgroundColor)
        ? datasets[0].backgroundColor[i]
        : "#000",
      index: i,
    }));
  };

  const showToastError = (message: string) => {
    toast.error(message);
  };

  /**
   * Make a request, setting loader and displaying toast error, if there's any.
   *
   * @param name Chart name to be toast displayed if error
   * @param requestFn Chart request function
   * @returns Promisse of the function param
   */
  const fetchChart = async (name: string, requestFn: () => any) => {
    setIsLoading(true);

    return requestFn()
      .catch((error: any) => {
        showToastError(`Erro ao buscar dados para ${name}`);
        setHasError(true);
        throw error;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { isLoading, hasError, fetchChart, buildTitlePlugin, generateLabels };
};
