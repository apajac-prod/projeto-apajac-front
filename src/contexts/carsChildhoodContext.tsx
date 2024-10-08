"use client";

import { CARS_CHILDHOOD_INDEX } from "@/constants/cars_childhood";
import { createContext, useContext, useState } from "react";

type ChildhoodContextType = {
  step: number;
  pontos: Array<number | undefined>;
  observacoes: Array<string | undefined>;
  nextStep: () => void;
  previousStep: () => void;
  isResultStep: () => boolean;
  isFirstStep: () => boolean;
  setPontosByStep: (step: number, pontos: undefined | number) => void;
  setObservacoesByStep: (step: number, observacoes: undefined | string) => void;
  getIndexByStep: (step: number) => string;
  isSelectedOption: (step: number, index: number) => boolean;
  getStepByIndex: (index: string) => number | undefined;
  goToStep: (step: number) => void;
  isCompleted: (step: number) => boolean;
  isSelected: (step: number) => boolean;
  goToResultStep: () => void;
  getResult: () => (number | undefined)[];
  getResultPontos: () => number | undefined;
  getObservacoes: () => (string | undefined)[];
  getObservacoesByStep: (step: number) => string;
};

export const CarsChildhoodContext = createContext<
  ChildhoodContextType | undefined
>(undefined);

type Props = {
  children: React.ReactNode;
};

let initialValues: Array<undefined> = [];

CARS_CHILDHOOD_INDEX.forEach(() => {
  initialValues.push(undefined);
});

export function CarsChildhoodProvider({ children }: Props) {
  const [step, setStep] = useState<number>(0);
  const [pontos, setPontos] =
    useState<Array<number | undefined>>(initialValues);

  const [observacoes, setObservacoes] =
    useState<Array<string | undefined>>(initialValues);

  const maxStep = CARS_CHILDHOOD_INDEX.length - 1;

  function nextStep() {
    setStep((actualStep) => {
      if (actualStep > maxStep) return actualStep;
      return actualStep + 1;
    });
  }

  function previousStep() {
    setStep((actualStep) => {
      if (actualStep <= 0) return actualStep;
      return actualStep - 1;
    });
  }

  function isFirstStep() {
    return step === 0;
  }

  function isResultStep() {
    return step === maxStep + 1;
  }

  function setPontosByStep(step: number, pontos: number | undefined) {
    setPontos((actualPontos) => {
      let newPontos = [...actualPontos];
      newPontos[step] = pontos;
      return newPontos;
    });
  }

  function setObservacoesByStep(step: number, observacoes: string | undefined) {
    setObservacoes((actualObservacoes) => {
      let newObservacoes = [...actualObservacoes];
      newObservacoes[step] = observacoes;
      return newObservacoes;
    });
  }

  function isSelectedOption(step: number, index: number) {
    //Option/index 0: 0 pts
    //Option/index 1: 1.5 pts
    //Option/index 2: 2.5 pts
    //Option/index 3: 3.5 pts
    const INDEX_PTS = [0, 1.5, 2.5, 3.5]; // Define o peso (pontos) de cada opção

    if (pontos[step] === INDEX_PTS[index]) return true;

    return false;
  }

  function getIndexByStep(step: number) {
    return CARS_CHILDHOOD_INDEX[step];
  }

  function getStepByIndex(index: string) {
    return CARS_CHILDHOOD_INDEX.findIndex((carsIndex) => carsIndex == index);
  }

  function goToStep(step: number) {
    setStep(step);
  }

  function goToResultStep() {
    setStep(maxStep + 1);
  }

  function isCompleted(step: number) {
    return pontos[step] != undefined;
  }

  function isSelected(stepN: number) {
    return stepN == step;
  }

  function getResult() {
    return pontos;
  }

  function getObservacoes() {
    return observacoes;
  }

  function getObservacoesByStep(step: number) {
    return observacoes[step] ?? "";
  }

  function getResultPontos() {
    let resultPontos: number = 0;

    for (let i = 0; i < pontos.length; i++) {
      if (pontos[i] === undefined) return undefined;
      resultPontos += pontos[i]!;
    }
    return resultPontos;
  }

  return (
    <CarsChildhoodContext.Provider
      value={{
        step,
        nextStep,
        previousStep,
        isResultStep,
        isFirstStep,
        pontos,
        setPontosByStep,
        getIndexByStep,
        isSelectedOption,
        getStepByIndex,
        goToStep,
        isCompleted,
        isSelected,
        goToResultStep,
        getResultPontos,
        getResult,
        getObservacoes,
        setObservacoesByStep,
        getObservacoesByStep,
        observacoes,
      }}
    >
      {children}
    </CarsChildhoodContext.Provider>
  );
}

export const useCarsChildhoodProvider = () => {
  const carsChildhoodMultistep = useContext(CarsChildhoodContext);
  if (carsChildhoodMultistep === undefined)
    throw Error(
      "CarsChildhoodContext is undefined. Pass a value to the CarsChildhoodContext.Provider."
    );
  return carsChildhoodMultistep;
};
