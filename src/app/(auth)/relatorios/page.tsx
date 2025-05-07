"use client";

import * as icon from "react-flaticons";
import FormTitle from "@/components/titles/form/form";
import { usePDF } from "react-to-pdf";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { DistributionBySex } from "./charts/DistributionBySex";
import { ActiveAndInactives } from "./charts/ActiveAndInactives";
import { AgeRange } from "./charts/AgeRange";
import { BirthdaysOfMonth } from "./charts/BirthdaysOfMonth";
import { RegistersByMonth } from "./charts/RegistersByMonth";
import { ByNeighborhood } from "./charts/ByNeighborhood";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  BarElement
);

const Relatorios = () => {
  const { toPDF, targetRef } = usePDF({ filename: "relatorios_apajac.pdf" });
  return (
    <>
      <div className="flex gap-8 justify-end items-center mr-6 mt-6 md:mr-10 print:hidden">
        <icon.Print
          className="w-5 h-5 md:w-6 md:h-8 cursor-pointer"
          onClick={() => window.print()}
        />
        <icon.Download
          className="w-5 h-5 md:w-6 md:h-6 cursor-pointer"
          onClick={() => toPDF()}
        />
      </div>
      <div ref={targetRef} className="pt-6">
        <FormTitle
          className="m-auto"
          title={"Relatórios e estatísticas"}
          Icon={icon.Stats}
        />

        <div className="flex justify-center items-center gap-8 mx-4 w-full max-w-[calc(100%-32px)] max-md:flex-wrap my-12 print:sm:gap-32 print:flex-wrap">
          <DistributionBySex />
          <ActiveAndInactives />
        </div>
        <hr className="max-md:hidden w-1/2 m-auto" />
        <div className="w-full flex justify-center items-center">
          <div className="flex p-4 justify-center items-center gap-8 mx-4 w-[90%] max-md:flex-wrap my-12 print:sm:gap-32 print:flex-wrap">
            <AgeRange />
            <RegistersByMonth />
          </div>
        </div>
        <BirthdaysOfMonth />
        <ByNeighborhood />
      </div>
    </>
  );
};

export default Relatorios;
