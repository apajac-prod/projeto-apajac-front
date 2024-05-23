import SubTitle from "../../subTitle";
import styles from "./stepResponsavel.module.css";

import * as icon from "react-flaticons";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useContext, useEffect, useState } from "react";

import * as yup from "yup";
import { MultistepFormContext } from "@/hooks/useMultistepForm";
import { restoreInputValue } from "@/functions/restoreInputs";

import { unmaskPhone } from "@/functions/unmaskInputs";

import { Responsavel } from "@/types/formAssistido.type";
import InputMask from "@mona-health/react-input-mask";

const MAX_PHONE_NUMBERS = 5; //Max phone inputs that can be added

const StepResponsavel = () => {
  const [showResponsibleFields, setShowResponsibleFields] = useState<
    boolean | null
  >(null);
  const multistepController = useContext(MultistepFormContext);
  const [phoneMask, setPhoneMask] = useState(new Map());

  //Yup validation schema
  const responsibleSchema: yup.ObjectSchema<Responsavel> = yup.object({
    responsible: yup
      .string()
      .trim()
      .required("Obrigatório selecionar o responsável")
      .oneOf(["pai", "mae", "outro"], "Selecione uma opção válida")
      .typeError("Selecione uma opção válida"),

    responsibleName: yup
      .string()
      .when("responsible", {
        is: (value: string) => value === "outro",
        then: () =>
          yup
            .string()
            .required("Obrigatório inserir o nome do responsável")
            .transform((_, val: string) => val.toUpperCase())
            .trim()
            .min(3, "Nome precisa ter no mínimo 3 caracteres")
            .max(255, "Quantidade máxima permitida de carácteres: 255")
            .typeError(
              "Verifique se inseriu o nome do responsável corretamente"
            ),
      })
      .transform((_, val: string) => (val == "" ? null : val))
      .nullable(),

    phones: yup.array().when("responsible", {
      is: (value: string) => value === "outro",
      then: () =>
        yup.array(
          yup.object({
            value: yup
              .string()
              .transform((_, val) => {
                if (val == "") return null;
                return unmaskPhone(val);
              })
              .test(
                "phone_type_check",
                "Insira todos os dígitos do telefone",
                function (value) {
                  if (!!value) {
                    let schema;
                    if (value[3] == "9") {
                      schema = yup.string().min(11);
                    } else {
                      schema = yup.string().min(10);
                    }
                    return schema.isValidSync(value);
                  }
                  return true;
                }
              )
              .required("Obrigatório preencher todos telefones adicionados")
              .max(11, "Quantidade máxima permitida de carácteres: 11")
              .typeError("Verifique se inseriu corretamente o telefone"),
          })
        ),
    }),
  });

  const {
    register,
    handleSubmit,
    control,
    setFocus,
    getValues,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      responsible: restoreInputValue(
        "responsible",
        multistepController || null
      ),
      responsibleName: restoreInputValue(
        "responsibleName",
        multistepController || null
      ),
      phones: restoreInputValue("phones", multistepController || null),
    },
    mode: "onBlur",
    resolver: yupResolver(responsibleSchema),
  });

  //Setting fieldArray to be used inside the form
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "phones", // unique name for your Field Array
    rules: { minLength: 1 },
  });

  useEffect(() => {
    // Apply phone mask at every phone loaded as defaultValue

    let newPhoneMask = new Map();

    fields.forEach((field, index) => {
      console.log(field);
      if (field.value && unmaskPhone(field.value[3]) == "9") {
        const name = `phones.${index}.value`;
        newPhoneMask.set(name, "(99) 9 9999-9999");
        setValue<any>(name, field.value);
      }
    });

    if (newPhoneMask.size > 0) setPhoneMask(new Map(newPhoneMask));
  }, []);

  function handleResponsibleChange(value: string) {
    console.log("FIELDS -----", fields);
    replace([]);
    reset({ responsibleName: "" });

    if (value != "outro") {
      setShowResponsibleFields(false);
      return;
    }
    if (fields) {
      append({ value: "" }, { shouldFocus: false });
      setFocus("responsibleName");
      setShowResponsibleFields(true);
    }
  }

  function handlePhoneChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value: string = event.target.value;
    const name = event.target.name;
    console.log("event name", name);
    if (value[5] == "9") {
      setPhoneMask(
        (actualPhoneMask) =>
          new Map(actualPhoneMask.set(name, "(99) 9 9999-9999"))
      );
      setValue<any>(name, value);
      return;
    }
    setPhoneMask(
      (actualPhoneMask) => new Map(actualPhoneMask.set(name, "(99) 9999-9999"))
    );
    setValue<any>(name, value);
  }

  /*   useEffect(() => {
    if (showResponsibleWho) {
      setFocus("responsibleWho");
      if (fields && fields.length <= 0)
        append({ value: "" }, { shouldFocus: false });
    } else replace([]);
  }, [showResponsibleWho]); */

  useEffect(() => {
    setShowResponsibleFields((oldValue) => {
      return restoreInputValue("responsible", multistepController || null) ==
        "outro"
        ? true
        : false;
    });
  }, []);

  function addPhoneInput() {
    append({ value: "" });
  }

  function removePhoneInput(index: number) {
    remove(index);
  }

  function next(data: any) {
    multistepController?.setCurrentStepData(data);
    console.log(data);
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
            className={`${
              !multistepController?.getActiveStatus() && "disable_input"
            }`}
            tabIndex={!multistepController?.getActiveStatus() ? -1 : undefined}
            defaultValue={""}
            {...register("responsible", {
              onChange: (e) => handleResponsibleChange(e.target.value),
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

        {showResponsibleFields && (
          <>
            <div className={`${styles.formRow} ${styles.input}`}>
              <label htmlFor="responsibleName" className={styles.required}>
                Nome
              </label>
              <input
                className={`${
                  !multistepController?.getActiveStatus() && "disable_input"
                }`}
                tabIndex={
                  !multistepController?.getActiveStatus() ? -1 : undefined
                }
                type="text"
                style={{ textTransform: "uppercase" }}
                {...register("responsibleName")}
              />
            </div>
            {errors.responsibleName && (
              <p className={styles.error_message}>
                {String(errors.responsibleName.message)}
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
                  <InputMask
                    className={`${
                      !multistepController?.getActiveStatus() && "disable_input"
                    }`}
                    tabIndex={
                      !multistepController?.getActiveStatus() ? -1 : undefined
                    }
                    mask={
                      phoneMask.get(`phones.${index}.value`) ?? "(99) 9999-9999"
                    }
                    {...register(`phones.${index}.value` as const, {
                      onChange: (e) => handlePhoneChange(e),
                    })}
                  ></InputMask>

                  {index > 0 && multistepController?.getActiveStatus() && (
                    <icon.PhoneCross
                      style={{ cursor: "pointer" }}
                      color="red"
                      onClick={() => removePhoneInput(index)}
                    />
                  )}

                  {index === fields.length - 1 &&
                    index < MAX_PHONE_NUMBERS - 1 &&
                    multistepController?.getActiveStatus() && (
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
            className="button_submit"
            onClick={handleSubmit((data) => next(data))}
          >
            Avançar
          </button>
          <button
            className="button_submit"
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
export default StepResponsavel;
