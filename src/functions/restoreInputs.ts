//Check if the input was already filled or set it to empty string
import { useMultistepForm } from "@/hooks/useMultistepForm";
import { isDayjs } from "dayjs";

//Check if the input was already filled or completed, otherwise set it to a empty string
export function restoreInputValue(property: string, multistepController: null | ReturnType<typeof useMultistepForm>) {
    if (multistepController?.getCurrentStepData && multistepController?.getCurrentStepData[property]) {
        if (isDayjs(multistepController?.getCurrentStepData[property])) return multistepController?.getCurrentStepData[property].format("DD/MM/YYYY")
            return multistepController?.getCurrentStepData[property]
    }
    if (multistepController?.getCurrentStepCache && multistepController?.getCurrentStepCache[property]) {
        if (isDayjs(multistepController?.getCurrentStepCache[property])) return multistepController?.getCurrentStepCache[property].format("DD/MM/YYYY")
        return multistepController?.getCurrentStepCache[property];
    }
    return "";
}