import SubTitle from "../subTitle";
import styles from "./responsavel.module.css";

import * as icon from "react-flaticons";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { ChangeEvent, useContext, useEffect, useState } from "react";

import * as yup from "yup";
import { MultistepFormContext } from "@/hooks/useMultistepForm";
import { restoreInputValue } from "@/functions/restoreInputs";

import { Responsavel } from "@/types/formAcolhido.type";

const MAX_PHONE_NUMBERS = 5; //Max phone inputs that can be added

const FormResponsavel = () => {
  const [showResponsibleWho, setShowResponsibleWho] = useState(false);
  const multistepController = useContext(MultistepFormContext);

  //Yup validation schema
  const responsibleSchema: yup.ObjectSchema<Responsavel> = yup.object({
    responsible: yup
      .string()
      .trim()
      .required("Obrigatório selecionar o responsável")
      .oneOf(["pai", "mae", "outro"], "Selecione uma opção válida")
      .typeError("Selecione uma opção válida"),

    responsibleWho: yup.string().when("responsible", {
      is: (value: string) => value === "outro",
      then: () =>
        yup
          .string()
          .trim()
          .required("Obrigatório inserir o responsável")
          .typeError("Verifique se inseriu o responsável corretamente"),
    }),

    phones: yup.array(
      yup.object({
        value: yup
          .string()
          .trim()
          .required("Obrigatório inserir o telefone")
          .typeError("Verifique se inseriu corretamente o telefone"),
      })
    ),
  });

  const {
    register,
    handleSubmit,
    control,
    setFocus,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      responsible: restoreInputValue(
        "responsible",
        multistepController || null
      ),
      responsibleWho: restoreInputValue(
        "responsibleWho",
        multistepController || null
      ),
      phones: restoreInputValue("phones", multistepController || null),
    },
    mode: "onBlur",
    resolver: yupResolver(responsibleSchema),
  });

  //Setting fieldArray to be used inside the form
  const { fields, append, remove, replace } = useFieldArray({
    name: "phones", // unique name for your Field Array
    control,
  });

  function handleResponsibleChange(e: ChangeEvent<HTMLSelectElement>) {
    if (e.target.value === "outro") {
      setShowResponsibleWho(true);
    } else {
      setShowResponsibleWho(false);
    }
  }

  useEffect(() => {
    if (fields && fields.length <= 0)
      append({ value: "" }, { shouldFocus: false });
    if (showResponsibleWho) setFocus("responsibleWho");
    else replace([]);
  }, [showResponsibleWho]);

  function addPhoneInput() {
    append({ value: "" });
  }

  function removePhoneInput(index: number) {
    remove(index);
  }

  function next(data: any) {
    multistepController?.setCurrentStepData(data);
    multistepController?.next();
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
      <SubTitle text="Dados do responsável" />
      <form onSubmit={handleSubmit((data) => next(data))} autoComplete="off">
        <div className={`${styles.formRow} ${styles.input}`}>
          <label htmlFor="responsible" className={styles.required}>
            Responsável
          </label>
          <select
            defaultValue={""}
            {...register("responsible", {
              onChange: (e) => handleResponsibleChange(e),
            })}
          >
            <option value="" hidden>
              Selecione
            </option>
            <option value="mae">Mãe</option>
            <option value="pai">Pai</option>
            <option value="outro">Outro</option>
          </select>
        </div>
        {errors.responsible && (
          <p className={styles.error_message}>
            {String(errors.responsible.message)}
          </p>
        )}

        {showResponsibleWho && (
          <>
            <div className={`${styles.formRow} ${styles.input}`}>
              <label htmlFor="responsibleWho" className={styles.required}>
                Qual?
              </label>
              <input type="text" {...register("responsibleWho")} />
            </div>
            {errors.responsibleWho && (
              <p className={styles.error_message}>
                {String(errors.responsibleWho.message)}
              </p>
            )}

            {fields.map((field, index) => (
              <div key={field.id}>
                <div className={`${styles.formRow} ${styles.input_small}`}>
                  <label
                    htmlFor={`phones.${index}.value`}
                    className={styles.required}
                  >
                    Telefone{index > 0 && ` ${index + 1}`}
                  </label>
                  <input type="text" {...register(`phones.${index}.value`)} />

                  {index > 0 && (
                    <icon.PhoneCross
                      style={{ cursor: "pointer" }}
                      color="red"
                      onClick={() => removePhoneInput(index)}
                    />
                  )}

                  {index === fields.length - 1 &&
                    index < MAX_PHONE_NUMBERS - 1 && (
                      <icon.Add
                        style={{ cursor: "pointer" }}
                        color="green"
                        onClick={() => addPhoneInput()}
                      />
                    )}
                </div>
                {errors.phones && errors.phones[index] && (
                  <p className={styles.error_message}>
                    {String(errors.phones![index]?.value?.message)}
                  </p>
                )}
              </div>
            ))}
          </>
        )}

        <div className={styles.buttons}>
          <button
            className="submitBtn"
            onClick={handleSubmit((data) => next(data))}
          >
            Avançar
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
export default FormResponsavel;
