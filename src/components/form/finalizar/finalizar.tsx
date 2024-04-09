import SubTitle from "../subTitle";
import styles from "./finalizar.module.css";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useContext } from "react";

import * as yup from "yup";
import { MultistepFormContext } from "@/hooks/useMultistepForm";
import { restoreInputValue } from "@/functions/restoreInputs";

import { Finalizar } from "@/types/formAcolhido.type";

const FormFinalizar = () => {
  const multistepController = useContext(MultistepFormContext);

  //Yup validation schema
  const finalizeSchema: yup.ObjectSchema<Finalizar> = yup.object({
    comments: yup
      .string()
      .trim()
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

  function registerAcolhido(data: any) {
    multistepController?.setCurrentStepData(data);
    console.log(multistepController?.getResultObject());
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
        onSubmit={handleSubmit((data) => registerAcolhido(data))}
        autoComplete="off"
      >
        <div className={`${styles.formRow} ${styles.formCommentsRow}`}>
          <textarea {...register("comments")} cols={60} rows={10} />
        </div>
        {errors.comments && (
          <p className={styles.error_message}>
            {String(errors.comments.message)}
          </p>
        )}

        <div className={styles.buttons}>
          <button
            className="submitBtn"
            onClick={handleSubmit((data) => registerAcolhido(data))}
          >
            Finalizar Cadastro
          </button>
          <button
            className="submitBtn"
            type="button"
            onClick={() => back(getValues())}
          >
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
};
export default FormFinalizar;
