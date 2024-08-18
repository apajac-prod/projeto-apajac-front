import { useFieldArray, useForm } from "react-hook-form";

import * as icon from "react-flaticons";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import SubTitle from "../../subTitle";
import styles from "./stepPais.module.css";
import { ChangeEvent, useContext, useEffect } from "react";

import { useState } from "react";
import { MultistepFormContext } from "@/hooks/useMultistepForm";
import { restoreInputValue } from "@/functions/restoreInputs";

import { unmaskPhone, unmaskMoney } from "@/functions/unmaskInputs";

import InputMask from "@mona-health/react-input-mask";

import { Pais } from "@/types/formAssistido.type";

const OCUPATION = ["desempregado", "do_lar", "desconhecido", "outro"];
const EMPLOYMENT_RELATIONSHIP = ["clt", "autonomo", "outro", "nao_informado"];
const MAX_PHONE_NUMBERS = 5; //Max phone inputs that can be added

type Props = {
  who: "mother" | "father";
};
const StepPais = ({ who }: Props) => {
  const multistepController = useContext(MultistepFormContext);
  const [showEmploymentRelationshipDesc, setShowEmploymentRelationshipDesc] =
    useState(
      multistepController?.fatherDataInformed &&
        (restoreInputValue(
          "employmentRelationship",
          multistepController || null
        ) === "outro"
          ? true
          : false)
    );
  const [showWorkFields, setShowWorkFields] = useState(
    restoreInputValue("ocupation", multistepController || null) == "outro"
      ? true
      : false
  );
  const [phoneMask, setPhoneMask] = useState(new Map());
  const [enableInputsSwitch, setEnableInputsSwitch] = useState(
    who != "father"
      ? true
      : restoreInputValue("name", multistepController || null)
      ? true
      : false
  );

  //Yup validation schema
  const paisSchema: yup.ObjectSchema<Pais> = yup.object({
    name: yup
      .string()
      .required("Obrigatório inserir o nome do assistido")
      .transform((_, val: string) => val.toUpperCase())
      .trim()
      .min(3, "Nome precisa ter no mínimo 3 caracteres")
      .max(255, "Quantidade máxima permitida de carácteres: 255")
      .typeError("Insira o nome do assistido"),

    phones: yup.array(
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
    ocupation: yup
      .string()
      .trim()
      .min(2, "Quantidade mínima necessária de caracteres: 2")
      .max(50, "Quantidade máxima permitida de carácteres: 50")
      .required("Obrigatório selecionar uma opção")
      .oneOf(OCUPATION, "Selecione uma opção válida")
      .typeError("Verifique se selecionou uma opção correta"),

    placeOfWork: yup
      .string()
      .min(2, "Quantidade mínima necessária de caracteres: 2")
      .max(255, "Quantidade máxima permitida de carácteres: 255")
      .transform((_, val) => (val === "" ? null : val))
      .nullable()
      .trim()
      .typeError("Verifique se inseriu corretamente o local de trabalho"),

    salary: yup
      .number()
      .transform((_, val) => {
        if (val == "") return null;
        return Number(unmaskMoney(val));
      }) // Cast input value to number or null if empty
      .min(0, "Não é possível inserir um valor negativo para salário")
      .nullable()
      .typeError("Verifique se inseriu corretamente o salário"),

    employmentRelationship: yup
      .string()
      .when("ocupation", {
        is: (value: string) => value === "outro",
        then: () =>
          yup
            .string()
            .trim()
            .required("Obrigatório selecionar uma opção")
            .oneOf(EMPLOYMENT_RELATIONSHIP, "Selecione uma opção válida"),
      })
      .transform((_, val) => (val === "" ? null : val))
      .nullable(),

    employmentRelationshipDesc: yup
      .string()
      .when("employmentRelationship", {
        is: (value: string) => value === "outro",
        then: () =>
          yup
            .string()
            .trim()
            .max(50, "Quantidade máxima permitida de carácteres: 50")
            .required("Obrigatório descrever o vínculo empregatício"),
      })
      .transform((_, val) => (val === "" ? null : val))
      .nullable(),
  });

  // Setting the form
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: restoreInputValue("name", multistepController || null),
      phones:
        restoreInputValue("phones", multistepController || null) != ""
          ? restoreInputValue("phones", multistepController || null)
          : [{ value: "" }],
      ocupation: restoreInputValue("ocupation", multistepController || null),
      placeOfWork: restoreInputValue(
        "placeOfWork",
        multistepController || null
      ),
      salary: maskMoney(
        restoreInputValue("salary", multistepController || null)
      ),
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
  const { fields, append, remove, prepend } = useFieldArray({
    control,
    name: "phones", // unique name for your Field Array
    rules: { minLength: 1 },
  });

  useEffect(() => {
    let newPhoneMask = new Map();

    fields.forEach((field, index) => {
      if (field.value && unmaskPhone(field.value)[3] == "9") {
        const unmaskedValue = unmaskPhone(field.value);
        const name = `phones.${index}.value`;
        newPhoneMask.set(name, "(99) 9 9999-9999");
        setValue<any>(name, unmaskedValue);
      }
    });

    if (newPhoneMask.size > 0) setPhoneMask(new Map(newPhoneMask));
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
      /* handleSubmit((data) => {
        multistepController?.setCurrentStepData(data);
        multistepController?.back();
      })(); */

      multistepController?.setCurrentStepData(data);
      multistepController?.back();
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

  function handlePhoneChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value: string = event.target.value;
    const name = event.target.name;
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

  function addPhoneInput() {
    append({ value: "" });
  }

  function removePhoneInput(index: number) {
    remove(index);
  }

  function maskMoney(unmaskedValue: string | null | undefined): string {
    //Prevents "." when there is no before number
    //Prevents null | undefined
    if (
      (typeof unmaskedValue == "string" || typeof unmaskedValue == "number") &&
      unmaskedValue != ""
    )
      return `R$ ${String(unmaskedValue).replace(".", ",")}`;
    return "";
  }

  function handleSalaryChange(e: React.ChangeEvent<HTMLInputElement>) {
    let unmaskedValue = unmaskMoney(e.target.value);

    //Prevents null | undefined
    if (typeof unmaskedValue != "string") return;

    const insertedValue = unmaskedValue.slice(-1);
    const allowOnlyNumbersRgx = /^[0-9]*$/;

    function preventInsertedLetter() {
      e.target.value = e.target.value.slice(0, -1); // Remove last letter
    }

    //Prevents "." when there is no before number
    if (unmaskedValue == ".") {
      preventInsertedLetter();
      return;
    }

    //Allow only: numbers, "." or ","
    if (!(allowOnlyNumbersRgx.test(insertedValue) || insertedValue == ".")) {
      preventInsertedLetter();
      return;
    }

    //Allow only one "." or ","
    if (insertedValue == "." && unmaskedValue.split(".").length > 2) {
      preventInsertedLetter();
      return;
    }

    //Allow only 2 decimal digits
    const [_, decimal] = unmaskedValue.split(".");
    if (decimal && decimal.length > 2) {
      preventInsertedLetter();
      return;
    }

    e.target.value = unmaskedValue == "" ? "" : maskMoney(unmaskedValue);
  }

  function handleSwitchChange(checked: boolean) {
    setEnableInputsSwitch(checked);
    if (!checked) {
      setValue<any>("ocupation", "");
      setShowWorkFields(false);
    }
  }

  function handlePreSubmit() {
    if (!enableInputsSwitch) {
      // Caso a opção 'Informar dados do pai?' esteja DESMARCADO
      const nullData = {
        name: null,
        employmentRelationship: null,
        employmentRelationshipDesc: null,
        ocupation: null,
        phones: [{ value: "" }],
        placeOfWork: null,
        salary: null,
      };

      next(nullData);
      return;
    }

    handleSubmit((data) => {
      next(data);
    })();
  }

  return (
    <div className={styles.container}>
      {who === "father" && (
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={enableInputsSwitch}
            onChange={(e) => handleSwitchChange(e.target.checked)}
            className="sr-only peer"
          />
          <span className="mr-3 text-base font-medium text-gray-900 dark:text-gray-300">
            Informar dados do pai?
          </span>
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
      )}
      <form autoComplete="off">
        <SubTitle
          text={who === "mother" ? "Dados da mãe" : "Dados do pai"}
          className={styles.sub_title}
        />

        <div className={`${styles.formRow} ${styles.input_big}`}>
          <label
            htmlFor="name"
            className={enableInputsSwitch ? styles.required : ""}
          >
            Nome
          </label>
          <input
            className={`${
              (!multistepController?.getActiveStatus() ||
                !enableInputsSwitch) &&
              "disable_input"
            }`}
            tabIndex={
              !multistepController?.getActiveStatus() || !enableInputsSwitch
                ? -1
                : undefined
            }
            type="text" id="name"
            style={{
              textTransform: "uppercase",
            }}
            {...register("name")}
          />
        </div>
        {errors.name && enableInputsSwitch && (
          <p className={styles.error_message}>{String(errors.name.message)}</p>
        )}

        {fields.map((field, index) => (
          <div key={field.id}>
            <div className={`${styles.formRow} ${styles.input_small}`}>
              <label
                htmlFor={`phones.${index}.value` as const}
                className={enableInputsSwitch ? styles.required : ""}
              >
                Telefone{index > 0 && ` ${index + 1}`}
              </label>

              <InputMask
                className={`${
                  (!multistepController?.getActiveStatus() ||
                    !enableInputsSwitch) &&
                  "disable_input"
                }`}
                tabIndex={
                  !multistepController?.getActiveStatus() || !enableInputsSwitch
                    ? -1
                    : undefined
                }
                mask={
                  phoneMask.get(`phones.${index}.value`) ?? "(99) 9999-9999"
                }
                {...register(`phones.${index}.value` as const, {
                  onChange: (e) => handlePhoneChange(e),
                })}
              >
                <input type="text" />
              </InputMask>

              {index > 0 &&
                multistepController?.getActiveStatus() &&
                enableInputsSwitch && (
                  <icon.PhoneCross
                    style={{ cursor: "pointer" }}
                    color="red"
                    onClick={() => removePhoneInput(index)}
                  />
                )}

              {index === fields.length - 1 &&
                index < MAX_PHONE_NUMBERS - 1 &&
                multistepController?.getActiveStatus() &&
                enableInputsSwitch && (
                  <icon.Add
                    style={{ cursor: "pointer" }}
                    color="green"
                    onClick={() => addPhoneInput()}
                  />
                )}
            </div>
            {errors.phones && errors.phones[index] && enableInputsSwitch && (
              <p className={styles.error_message}>
                {String(errors.phones![index]?.value?.message)}
              </p>
            )}
          </div>
        ))}

        <div className={styles.formRow}>
          <label
            htmlFor="ocupation"
            className={enableInputsSwitch ? styles.required : ""}
          >
            Ocupação
          </label>
          <select
            aria-label="select option"
            className={`${
              !multistepController?.getActiveStatus() ||
              (!enableInputsSwitch && "disable_input")
            }`}
            tabIndex={
              !multistepController?.getActiveStatus() || !enableInputsSwitch
                ? -1
                : undefined
            }
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
        {errors.ocupation && enableInputsSwitch && (
          <p className={styles.error_message}>
            {String(errors.ocupation.message)}
          </p>
        )}
        {showWorkFields && (
          <>
            <div className={styles.formRow}>
              <label htmlFor="placeOfWork">Local de trabalho</label>
              <input
                className={`${
                  !multistepController?.getActiveStatus() && "disable_input"
                }`}
                tabIndex={
                  !multistepController?.getActiveStatus() || !enableInputsSwitch
                    ? -1
                    : undefined
                }
                type="text"
                {...register("placeOfWork")}
              />
            </div>
            {errors.placeOfWork && enableInputsSwitch && (
              <p className={styles.error_message}>
                {String(errors.placeOfWork.message)}
              </p>
            )}

            <div className={`${styles.formRow} ${styles.input_small}`}>
              <label htmlFor="salary">Salário</label>
              <input
                className={`${
                  !multistepController?.getActiveStatus() && "disable_input"
                }`}
                tabIndex={
                  !multistepController?.getActiveStatus() || !enableInputsSwitch
                    ? -1
                    : undefined
                }
                type="text"
                placeholder="R$ 0,00"
                {...register("salary", {
                  onChange: (e) => handleSalaryChange(e),
                })}
              />
            </div>
            {errors.salary && enableInputsSwitch && (
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
                className={`${
                  !multistepController?.getActiveStatus() && "disable_input"
                }`}
                tabIndex={
                  !multistepController?.getActiveStatus() || !enableInputsSwitch
                    ? -1
                    : undefined
                }
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
                <option value="nao_informado">Não informado</option>
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
                      className={`${
                        !multistepController?.getActiveStatus() &&
                        "disable_input"
                      }`}
                      tabIndex={
                        !multistepController?.getActiveStatus() ||
                        !enableInputsSwitch
                          ? -1
                          : undefined
                      }
                      type="text"
                      {...register("employmentRelationshipDesc")}
                    />
                  </div>
                </>
              )}
            </div>
            {errors.employmentRelationshipDesc &&
              showEmploymentRelationshipDesc &&
              enableInputsSwitch && (
                <p className={styles.error_message}>
                  {String(errors.employmentRelationshipDesc.message)}
                </p>
              )}
            {errors.employmentRelationship && enableInputsSwitch && (
              <p className={styles.error_message}>
                {String(errors.employmentRelationship.message)}
              </p>
            )}
          </>
        )}

        <div className={styles.buttons}>
          <button
            className="button_submit"
            type="button"
            onClick={() => handlePreSubmit()}
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

export const StepPai = () => {
  return <StepPais who="father" />;
};

export const StepMae = () => {
  return <StepPais who="mother" />;
};
