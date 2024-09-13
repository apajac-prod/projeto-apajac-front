"use client";

import FormIndice from "@/components/form_indice/form_indice";
import FormTitle from "@/components/titles/form/form";

import * as icon from "react-flaticons";
import Steps from "./steps";
import Button from "@/components/ui/button";
import { useCarsChildhoodProvider } from "@/contexts/carsChildhoodContext";
import {
  CARS_CHILDHOOD_INDEX,
  CARS_CHILDHOOD_TITLE,
} from "@/constants/cars_childhood";
import ResultadoCarsAdulto from "./resultado";
import { carsToApi } from "@/api/middleware/cars";

type Props = {
  assistidoId: string;
};

const CarsAdulto = ({ assistidoId }: Props) => {
  const {
    nextStep,
    previousStep,
    isFirstStep,
    isResultStep,
    goToStep,
    isCompleted,
    isSelected,
    goToResultStep,
    getResult,
    getResultPontos,
    getObservacoes,
  } = useCarsChildhoodProvider();

  return (
    <div>
      <FormTitle
        title={"CARS - Childhood Autism Rating Scale"}
        Icon={icon.Document}
        className="m-auto mt-6"
      />

      <nav className="px-6">
        <div className="m-auto mt-6 mb-6 flex justify-center items-center flex-wrap gap-2 max-w-[1100px]">
          {CARS_CHILDHOOD_TITLE.map((title, index) => (
            <FormIndice
              key={title}
              className="h-[70PX] w-2/12"
              text={title}
              onClick={() => goToStep(index)}
              completed={isCompleted(index)}
              selected={isSelected(index)}
            />
          ))}
          <FormIndice
            className="w-32 h-[70PX]"
            text="Resultado"
            completed={false}
            selected={isSelected(CARS_CHILDHOOD_INDEX.length)}
            onClick={() => goToResultStep()}
          />
        </div>
      </nav>

      {isResultStep() ? (
        <ResultadoCarsAdulto className="min-h-[300px] mt-16" />
      ) : (
        <Steps className="min-h-[625px] mt-16" />
      )}
      <div className="flex justify-center mb-12 w-96 m-auto">
        {!isFirstStep() && (
          <Button
            text="Voltar"
            type="button"
            onClick={() => previousStep()}
            className="mr-auto"
          />
        )}

        {isResultStep() ? (
          <Button
            text={"Finalizar e salvar"}
            disabled={getResultPontos() === undefined}
            type="submit"
            onClick={() =>
              console.log(
                carsToApi(
                  assistidoId,
                  getResultPontos(),
                  getResult(),
                  getObservacoes()
                )
              )
            }
            className="ml-auto"
          />
        ) : (
          <Button
            text={"Avançar"}
            type="submit"
            onClick={() => nextStep()}
            className="ml-auto"
          />
        )}
      </div>
    </div>
  );
};
export default CarsAdulto;
