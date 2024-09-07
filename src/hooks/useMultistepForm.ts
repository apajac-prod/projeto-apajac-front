import { ReactElement, createContext, useState } from "react";

import _ from "lodash";

//Steps in order, to be used to generate the final object (below function getResultObject())
const STEPS = [
  "assistido",
  "mae",
  "pai",
  "responsavel",
  "composicaoFamiliar",
  "finalizar",
];

const _Copy = (x: any) => _.cloneDeep(x);

export function useMultistepForm(
  steps: ReactElement[],
  assistidoData: Array<any> | null
) {
  const [safeToLeave, setSafeToLeave] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [id, setId] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(true);
  const [fatherDataInformed, setFatherDataInformed] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [stepsData, setStepsData] = useState<any>(
    steps.map((_, index) => {
      return { cache: null, data: assistidoData ? assistidoData[index] : null };
    })
  );

  function canLeave() {
    return safeToLeave;
  }

  function setCanLeave(status: boolean) {
    setSafeToLeave(status);
  }

  function getId() {
    return id;
  }

  function getActiveStatus() {
    return isActive;
  }

  function setActiveStatus(status: boolean) {
    setIsActive(status);
  }

  function changeActiveStatus() {
    setIsActive((status) => !status);
  }
  function loadData(data: Array<any>) {
    data.map((step, index) => {
      setData(index, step);
      index == 2 && setFatherDataInformed(!(step.name === null)); // Se o nome do pai veio NULL da API, então nenhum dado do pai foi inserido e o switch do step estava desligado.
    });
  }

  function next() {
    setCurrentStepIndex((currentStep) => {
      if (currentStep >= steps.length - 1) return currentStep;
      return currentStep + 1;
    });
  }

  function back() {
    setCurrentStepIndex((currentStep) => {
      if (currentStep <= 0) return currentStep;
      return currentStep - 1;
    });
  }

  function goTo(index: number) {
    setCurrentStepIndex(index);
  }

  function setData(index: number, data: any) {
    setStepsData((currentValue: any) => {
      let newArray = currentValue;
      newArray[index].data = data;
      return newArray;
    });
    /* setStepsData((currentValue: any) => currentValue[index].data = data) */
  }

  function getData(index: number) {
    return stepsData[index].data;
  }

  function setCache(index: number, data: any) {
    setStepsData((currentValue: any) => {
      let newArray = currentValue;
      newArray[index].cache = data;
      return newArray;
    });
    /* setStepsData((currentValue: any) => currentValue[index].cache = data) */
  }

  function getCache(index: number) {
    return stepsData[index].cache;
  }

  function setCurrentStepData(data: any) {
    setData(currentStepIndex, data);
  }

  function setCurrentStepCache(data: any) {
    setCache(currentStepIndex, data);
  }

  function stepIsCompleted(index: number) {
    return getData(index) != null;
  }

  function isLastStep(index: number) {
    return index === steps.length - 1;
  }

  function getResultObject() {

    let result = _Copy(stepsData).map(
      (element: { data: any }, index: number) => {
        if (index == 0) {
          return { id: getId(), ...element.data };
        }
        return element.data;
      }
    );

    /* if (id){
            result[0] = {... result[0], id};
        } */

    return result;
  }
  return {
    isLoading,
    setIsLoading,
    canLeave,
    setCanLeave,
    setId,
    getId,
    getActiveStatus,
    setActiveStatus,
    changeActiveStatus,
    loadData,
    currentStepIndex,
    step: steps[currentStepIndex],
    getData,
    setData,
    setCache,
    getCache,
    getCurrentStepData: getData(currentStepIndex),
    setCurrentStepData,
    getCurrentStepCache: getCache(currentStepIndex),
    setCurrentStepCache,
    stepIsCompleted,
    currentStepIsCompleted: stepIsCompleted(currentStepIndex),
    getResultObject,
    steps,
    next,
    back,
    goTo,
    isFirstStep: currentStepIndex === 0,
    isLastStep,
    currentStepisLastStep: isLastStep(currentStepIndex),
    fatherDataInformed,
  };
}

export const MultistepFormContext = createContext<
  ReturnType<typeof useMultistepForm> | undefined
>(undefined);
