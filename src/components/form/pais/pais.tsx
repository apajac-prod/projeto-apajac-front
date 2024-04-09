import { useFieldArray, useForm } from "react-hook-form";

import * as icon from "react-flaticons";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import SubTitle from "../subTitle";
import styles from "./pais.module.css";
import { ChangeEvent, useContext, useEffect } from "react";

import { useState } from "react";
import { MultistepFormContext } from "@/hooks/useMultistepForm";
import { restoreInputValue } from "@/functions/restoreInputs";

import { Pais } from "@/types/formAcolhido.type";

const OCUPATION = ["desempregado", "do_lar", "desconhecido", "outro"];
const EMPLOYMENT_RELATIONSHIP = ["clt", "autonomo", "outro"];
const MAX_PHONE_NUMBERS = 5; //Max phone inputs that can be added

type Props = {
  who: "mother" | "father";
};
const FormPais = ({ who }: Props) => {
  const multistepController = useContext(MultistepFormContext);
  const [showEmploymentRelationshipDesc, setShowEmploymentRelationshipDesc] =
    useState(false);
  const [showWorkFields, setShowWorkFields] = useState(false);

  //Yup validation schema
  const paisSchema: yup.ObjectSchema<Pais> = yup.object({
    name: yup
      .string()
      .trim()
      .required("Obrigatório inserir o nome")
      .typeError("Verifique se inseriu corretamente o nome"),

    phones: yup.array(
      yup.object({
        value: yup
          .string()
          .trim()
          .required("Obrigatório inserir o telefone")
          .typeError("Verifique se inseriu corretamente o telefone"),
      })
    ),
    ocupation: yup
      .string()
      .trim()
      .required("Obrigatório selecionar uma opção")
      .oneOf(OCUPATION, "Selecione uma opção válida")
      .typeError("Verifique se selecionou uma opção correta"),

    placeOfWork: yup
      .string()
      .trim()
      .transform((_, val) => (val === "" ? null : val))
      .nullable()
      .typeError("Verifique se inseriu corretamente o local de trabalho"),

    salary: yup
      .number()
      .transform((_, val) => (val === Number(val) ? val : null))
      .nullable()
      .typeError("Verifique se inseriu corretamente o salário"),

    employmentRelationship: yup.string().when("ocupation", {
      is: (value: string) => value === "outro",
      then: () =>
        yup
          .string()
          .trim()
          .required("Obrigatório selecionar uma opção")
          .oneOf(EMPLOYMENT_RELATIONSHIP, "Selecione uma opção válida"),
    }),

    employmentRelationshipDesc: yup.string().when("employmentRelationship", {
      is: (value: string) => value === "outro",
      then: () =>
        yup
          .string()
          .trim()
          .required("Obrigatório descrever o vínculo empregatício"),
    }),
  });

  // Setting the form
  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: restoreInputValue("name", multistepController || null),
      phones: restoreInputValue("phones", multistepController || null),
      ocupation: restoreInputValue("ocupation", multistepController || null),
      placeOfWork: restoreInputValue(
        "placeOfWork",
        multistepController || null
      ),
      salary: restoreInputValue("salary", multistepController || null),
      employmentRelationship: restoreInputValue(
        "employmentRelationship",
        multistepController || null
      ),
      employmentRelationshipDesc: restoreInputValue(
        "employmentRelationshipDesc",
        multistepController || null
      ),
    },
    mode: "onBlur",
    resolver: yupResolver(paisSchema),
  });

  //Setting fieldArray to be used inside the form
  const { fields, append, remove } = useFieldArray({
    control,
    name: "phones", // unique name for your Field Array
  });

  useEffect(() => {
    append({ value: "" }, { shouldFocus: false });
  }, []);

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

  function handleEmploymentRelationshipChange(
    e: ChangeEvent<HTMLSelectElement>
  ) {
    if (e.target.value === "outro") {
      setShowEmploymentRelationshipDesc(true);
    } else {
      setShowEmploymentRelationshipDesc(false);
    }
  }

  function handleOcupationChange(e: ChangeEvent<HTMLSelectElement>) {
    if (e.target.value === "outro") {
      setShowWorkFields(true);
    } else {
      setShowWorkFields(false);
    }
  }

  function addPhoneInput() {
    append({ value: "" });
  }

  function removePhoneInput(index: number) {
    remove(index);
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit((data) => next(data))} autoComplete="off">
        <SubTitle
          text={who === "mother" ? "Dados da mãe" : "Dados do pai"}
          className={styles.sub_title}
        />

        <div className={`${styles.formRow} ${styles.input_big}`}>
          <label htmlFor="name" className={styles.required}>
            Nome
          </label>
          <input type="text" {...register("name")} />
        </div>
        {errors.name && (
          <p className={styles.error_message}>{String(errors.name.message)}</p>
        )}

        {fields.map((field, index) => (
          <div key={field.id}>
            <div className={`${styles.formRow} ${styles.input_small}`}>
              <label
                htmlFor={`phones.${index}.value` as const}
                className={styles.required}
              >
                Telefone{index > 0 && ` ${index + 1}`}
              </label>
              <input
                type="text"
                {...register(`phones.${index}.value` as const)}
              />

              {index > 0 && (
                <icon.PhoneCross
                  style={{ cursor: "pointer" }}
                  color="red"
                  onClick={() => removePhoneInput(index)}
                />
              )}

              {index === fields.length - 1 && index < MAX_PHONE_NUMBERS - 1 && (
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

        <div className={styles.formRow}>
          <label htmlFor="ocupation" className={styles.required}>
            Ocupação
          </label>
          <select
            defaultValue={""}
            {...register("ocupation", {
              onChange: (e) => handleOcupationChange(e),
            })}
          >
            <option value="" hidden>
              Selecione
            </option>
            <option value="do_lar">Do lar</option>
            <option value="desempregado">Desempregado</option>
            <option value="desconhecido">Desconhecido</option>
            <option value="outro">Outro</option>
          </select>
        </div>
        {errors.ocupation && (
          <p className={styles.error_message}>
            {String(errors.ocupation.message)}
          </p>
        )}
        {showWorkFields && (
          <>
            <div className={styles.formRow}>
              <label htmlFor="placeOfWork">Local de trabalho</label>
              <input type="text" {...register("placeOfWork")} />
            </div>
            {errors.placeOfWork && (
              <p className={styles.error_message}>
                {String(errors.placeOfWork.message)}
              </p>
            )}

            <div className={`${styles.formRow} ${styles.input_small}`}>
              <label htmlFor="salary">Salario</label>
              <input type="text" {...register("salary")} />
            </div>
            {errors.salary && (
              <p className={styles.error_message}>
                {String(errors.salary.message)}
              </p>
            )}

            <div className={styles.formRow}>
              <label
                htmlFor="employmentRelationship"
                className={styles.required}
              >
                Vínculo empregatício
              </label>
              <select
                defaultValue={""}
                {...register("employmentRelationship", {
                  onChange: (e) => handleEmploymentRelationshipChange(e),
                })}
              >
                <option value="" hidden>
                  Selecione
                </option>
                <option value="clt">CLT</option>
                <option value="autonomo">Autônoma</option>
                <option value="outro">Outro</option>
              </select>
              {showEmploymentRelationshipDesc && (
                <>
                  <div
                    className={`${styles.employmentRelationshipDesc} ${styles.input_small}`}
                  >
                    <label
                      htmlFor="employmentRelationshipDesc"
                      className={styles.required}
                    >
                      Qual?
                    </label>
                    <input
                      type="text"
                      {...register("employmentRelationshipDesc")}
                    />
                  </div>
                </>
              )}
            </div>
            {errors.employmentRelationshipDesc &&
              showEmploymentRelationshipDesc && (
                <p className={styles.error_message}>
                  {String(errors.employmentRelationshipDesc.message)}
                </p>
              )}
            {errors.employmentRelationship && (
              <p className={styles.error_message}>
                {String(errors.employmentRelationship.message)}
              </p>
            )}
          </>
        )}

        <div className={styles.buttons}>
          <button
            className="submitBtn"
            type="submit"
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

export const FormPai = () => {
  return <FormPais who="father" />;
};

export const FormMae = () => {
  return <FormPais who="mother" />;
};
