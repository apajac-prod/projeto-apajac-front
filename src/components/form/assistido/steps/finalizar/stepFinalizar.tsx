import { useRouter } from "next/navigation";

import SubTitle from "../../subTitle";
import styles from "./stepFinalizar.module.css";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useContext, useState } from "react";
import { flushSync } from "react-dom";

import * as yup from "yup";
import { MultistepFormContext } from "@/hooks/useMultistepForm";
import { restoreInputValue } from "@/functions/restoreInputs";

import { Finalizar } from "@/types/formAssistido.type";
import { createAssistido, updateAssistido } from "@/api/endpoints";

const StepFinalizar = () => {
  const router = useRouter();
  const multistepController = useContext(MultistepFormContext);
  // const [disableButtons, setDisableButtons] = useState<boolean>(false);

  //Yup validation schema
  const finalizeSchema: yup.ObjectSchema<Finalizar> = yup.object({
    comments: yup
      .string()
      .max(1000, "Quantidade máxima permitida de carácteres: 1000")
      .transform((_, val) => (val === "" ? null : val))
      .nullable()
      .typeError("Verifique se inseriu corretamente as informações"),
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      comments: restoreInputValue("comments", multistepController || null),
    },
    mode: "onBlur",
    resolver: yupResolver(finalizeSchema),
  });

  function registerAssistido(data: any) {
    flushSync(() => {
      multistepController?.setCurrentStepData(data);
    });

    // setDisableButtons(true);
    multistepController?.setIsLoading(true);
    if (multistepController?.getId()) {
      updateAssistido(multistepController?.getResultObject())
        .then(() => {
          window.onbeforeunload = () => null; // Removes the exit confirmation
          router.push("/menu");
        })
        .finally(() => {
          multistepController?.setIsLoading(false);
          //setDisableButtons(false);
        });
    } else {
      createAssistido(multistepController?.getResultObject())
        .then(() => {
          window.onbeforeunload = () => null; // Removes the exit confirmation
          router.push("/menu");
        })
        .finally(() => {
          multistepController?.setIsLoading(false);
          //setDisableButtons(false);
        });
    }
  }

  function back(data: any) {
    if (
      multistepController?.getCurrentStepData != null &&
      !(
        JSON.stringify(multistepController?.getCurrentStepData) ==
        JSON.stringify(data)
      )
    ) {
      handleSubmit((data) => {
        multistepController?.setCurrentStepData(data);
        multistepController?.back();
      })();
      return;
    }
    multistepController?.setCurrentStepCache(data);
    multistepController?.back();
  }
  return (
    <div className={styles.container}>
      <SubTitle text="Observações adicionais" />
      <SubTitle text="(Opcional)" />
      <form
        onSubmit={handleSubmit((data) => registerAssistido(data))}
        autoComplete="off"
      >
        <div className={`${styles.formRow} ${styles.formCommentsRow}`}>
          <textarea
            className={`${
              !multistepController?.getActiveStatus() && "disable_input"
            }`}
            tabIndex={!multistepController?.getActiveStatus() ? -1 : undefined}
            {...register("comments")}
            cols={60}
            rows={10}
          />
        </div>
        {errors.comments && (
          <p className={styles.error_message}>
            {String(errors.comments.message)}
          </p>
        )}

        <div className={styles.buttons}>
          <button
            className={`button_submit ${
              (multistepController?.isLoading ||
                !multistepController?.getActiveStatus()) &&
              styles.buttons_disabled
            }`}
            disabled={multistepController?.isLoading}
            onClick={handleSubmit((data) => registerAssistido(data))}
          >
            {multistepController?.getId
              ? "Finalizar alterações"
              : "Finalizar Cadastro"}
          </button>
          <button
            className={`button_submit ${
              multistepController?.isLoading && "disable_button"
            }`}
            type="button"
            disabled={multistepController?.isLoading}
            onClick={() => back(getValues())}
          >
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
};
export default StepFinalizar;
