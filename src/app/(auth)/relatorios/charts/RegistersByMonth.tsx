"use client";

import {
  getRegistersByMonthOptions,
  getRegistersByMonth,
} from "@/api/endpoints";
import { useChart } from "@/hooks/useChart";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { ChartLoader } from "../ChartLoader";
import { BarChartData } from "./types.dt";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import * as icon from "react-flaticons";

export const RegistersByMonth = () => {
  const { isLoading, hasError, fetchChart, buildTitlePlugin } = useChart();
  const [isLoadingOptions, setIsLoadingOptions] = useState(true);

  const [chart, setChart] = useState<BarChartData | null>(null);
  const [options, setOptions] = useState<number[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<number>(0);

  const title = "Cadastro de assistidos por mês";

  const fetchData = () => {
    getRegistersByMonth(selectedMonth).then((chart) => {
      const chartData = {
        data: {
          labels: chart.labels,
          datasets: [
            {
              data: chart.data,
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
  };

  const fetchOptions = () => {
    getRegistersByMonthOptions()
      .then((options) => {
        setOptions(options);
        setSelectedMonth(options[options.length - 1]);
      })
      .finally(() => {
        setIsLoadingOptions(false);
      });
  };

  useEffect(() => {
    if (!isLoadingOptions) {
      fetchData();
    }
  }, [selectedMonth]);

  useEffect(() => {
    fetchOptions();
    fetchData();
  }, []);

  const displayLoader = isLoadingOptions || isLoading || hasError || !chart;

  return (
    <div className="max-md:w-full w-[80%] m-auto">
      {displayLoader ? (
        <ChartLoader chartName={title} error={hasError} />
      ) : (
        <div>
          <YearSelect
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            options={options}
          />
          <div>
            <Bar data={chart?.data} options={chart?.options} />
          </div>
        </div>
      )}
    </div>
  );
};

type YearSelectProps = {
  selectedMonth: number;
  setSelectedMonth: (month: number) => void;
  options: number[];
};
const YearSelect = ({
  selectedMonth,
  setSelectedMonth,
  options,
}: YearSelectProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <div className="flex items-center justify-center gap-1 px-1 outline outline-1 rounded-md mr-1">
          <span>{selectedMonth}</span>
          <icon.AngleSmallDown />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Selecione o mês</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options.map((month) => (
          <DropdownMenuItem key={month} onClick={() => setSelectedMonth(month)}>
            {month}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
