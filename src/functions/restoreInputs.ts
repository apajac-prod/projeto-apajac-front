//Check if the input was already filled or set it to empty string
import { useMultistepForm } from "@/hooks/useMultistepForm";

//Check if the input was already filled or completed, otherwise set it to a empty string
export function restoreInputValue(property: string, multistepController: null | ReturnType<typeof useMultistepForm>) {
    if (multistepController?.getCurrentStepData && multistepController?.getCurrentStepData[property]) {
        return multistepController?.getCurrentStepData[property]
    }
    if (multistepController?.getCurrentStepCache && multistepController?.getCurrentStepCache[property]) {
        return multistepController?.getCurrentStepCache[property];
    }
    return "";
}