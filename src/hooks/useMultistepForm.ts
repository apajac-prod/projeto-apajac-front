import { ReactElement, createContext, useState } from "react";

//Steps in order, to be used to generate the final object (below function getResultObject())
const STEPS = [
    "acolhido",
    "mae",
    "pai",
    "responsavel",
    "composicaoFamiliar",
    "finalizar"
]

export function useMultistepForm(steps: ReactElement[]) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [stepsData, setStepsData] = useState<any>(
        steps.map(() => {
            return {cache: null, data: null}
        })
    )

    function next() {
        setCurrentStepIndex((currentStep) => {
            if (currentStep >= steps.length - 1) return currentStep;
            return currentStep + 1;
        })
    }

    function back() {
        setCurrentStepIndex((currentStep) => {
            if (currentStep <= 0) return currentStep;
            return currentStep - 1;
        })
    }

    function goTo(index: number) {
        setCurrentStepIndex(index);
    }

    function setData(index: number, data: any){
        setStepsData((currentValue: any) => {
            let newArray = currentValue;
            newArray[index].data = data;
            return currentValue;
        })
    }

    function getData(index: number){
        return stepsData[index].data;
    }

    function setCache(index: number, data: any){
        setStepsData((currentValue: any) => {
            let newArray = currentValue;
            newArray[index].cache = data;
            return currentValue;
        })
    }

    function getCache(index: number){
        return stepsData[index].cache;
    }

    function setCurrentStepData(data: any){
        setData(currentStepIndex, data);
    }

    function setCurrentStepCache(data: any){
        setCache(currentStepIndex, data);
    }

    function stepIsCompleted(index: number){
        return getData(index) != null;
    }

    function isLastStep(index: number){
        return index === steps.length - 1;
    }

    function getResultObject() {

        const dataArray: Array<any> = stepsData.map((element: {data: any}, index: number) => {
            if(STEPS[index] == "composicaoFamiliar"){
                return element.data.familyComposition;
            }
            return element.data;
        });

        const result = dataArray.reduce((acc:{[key:string]:object},curr, index)=> (acc[STEPS[index]]=curr,acc),{});

        return result;
    }
    return {
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
    }
}

export const MultistepFormContext = createContext<ReturnType<typeof useMultistepForm> | undefined>(undefined);