import SubTitle from "../../subTitle";
import styles from "./stepComposicaoFamiliar.module.css";

import * as icon from "react-flaticons";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import { useContext } from "react";
import { MultistepFormContext } from "@/hooks/useMultistepForm";
import { restoreInputValue } from "@/functions/restoreInputs";

import { ComposicaoFamiliar } from "@/types/formAcolhido.type";

const StepComposicaoFamiliar = () => {
  const multistepController = useContext(MultistepFormContext);

  //Yup validation schema
  const familyCompositionSchema: yup.ObjectSchema<ComposicaoFamiliar> =
    yup.object({
      familyComposition: yup.array(
        yup.object({
          name: yup
            .string()
            .required("Obrigatório inserir o nome do familiar")
            .transform((_, val: string) => val.toUpperCase())
            .trim()
            .min(3, "Nome precisa ter no mínimo 3 caracteres")
            .max(255, "Quantidade máxima permitida de carácteres: 255")
            .typeError("Insira o nome do familiar"),

          relationship: yup
            .string()
            .required("Obrigatório inserir o parentesco")
            .trim()
            .max(50, "Quantidade máxima permitida de carácteres: 50")
            .typeError("Verifique se inseriu corretamente o parentesco"),

          age: yup
            .string()
            .transform((_, val) => (val == "" ? null : String(val)))
            .test(
              "age_check",
              "Verifique se inseriu corretamente a idade",
              function (value) {
                if (value && (Number(value) >= 130 || Number(value) <= 0))
                  return false;
                return true;
              }
            )
            .nullable(),

          ocupation: yup
            .string()
            .trim()
            .max(50, "Quantidade máxima permitida de carácteres: 50")
            .transform((_, val) => (val === "" ? null : val))
            .nullable()
            .typeError("Verifique se inseriu corretamente a ocupação"),

          comments: yup
            .string()
            .trim()
            .max(1000, "Quantidade máxima permitida de carácteres: 1000")
            .transform((_, val) =>
              val && (val === "" || val.trim()) === "" ? null : val
            )
            .nullable()
            .typeError("Verifique se inseriu corretamente as observações"),
        })
      ),
    });

  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      familyComposition: restoreInputValue(
        "familyComposition",
        multistepController || null
      ),
    },
    mode: "onBlur",
    resolver: yupResolver(familyCompositionSchema),
  });

  //Setting fieldArray to be used inside the form
  const { fields, append, remove } = useFieldArray({
    name: "familyComposition", // unique name for your Field Array
    control,
  });

  function addFamily() {
    append({
      name: "",
      relationship: "",
      age: "",
      ocupation: "",
      comments: "",
    });
  }

  function removeFamily(index: number) {
    remove(index);
  }

  //Allow only numbers
  function handleAgeChange(event: React.ChangeEvent<HTMLInputElement>) {
    const insertedValue = event.target.value;
    const allowOnlyNumbersRgx = /^[0-9]*$/;

    //If not number, remove the inserted letter
    if (!allowOnlyNumbersRgx.test(insertedValue) && insertedValue != "")
      event.target.value = insertedValue.slice(0, -1);
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
      <SubTitle text="Composição Familiar" />
      <SubTitle text="(Opcional)" />

      <form onSubmit={handleSubmit((data) => next(data))} autoComplete="off">
        {fields.map((field, index) => (
          <div key={field.id} className={styles.family_container}>
            <FamilyTitle index={index + 1} className={styles.family_title} />
            <div className={`${styles.formRow} ${styles.input_big}`}>
              <label
                htmlFor={`familyComposition.${index}.name` as const}
                className={styles.required}
              >
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
                {...register(`familyComposition.${index}.name` as const)}
              />
            </div>
            {errors.familyComposition &&
              errors.familyComposition[index]?.name && (
                <p className={styles.error_message}>
                  {String(errors.familyComposition![index]?.name?.message)}
                </p>
              )}

            <div className={`${styles.formRow} ${styles.input}`}>
              <label
                htmlFor={`familyComposition.${index}.relationship` as const}
                className={styles.required}
              >
                Parentesco
              </label>
              <input
                className={`${
                  !multistepController?.getActiveStatus() && "disable_input"
                }`}
                tabIndex={
                  !multistepController?.getActiveStatus() ? -1 : undefined
                }
                {...register(
                  `familyComposition.${index}.relationship` as const
                )}
              />
            </div>
            {errors.familyComposition &&
              errors.familyComposition[index]?.relationship && (
                <p className={styles.error_message}>
                  {String(
                    errors.familyComposition![index]?.relationship?.message
                  )}
                </p>
              )}

            <div className={`${styles.formRow} ${styles.input_small}`}>
              <label htmlFor={`familyComposition.${index}.age` as const}>
                Idade
              </label>
              <input
                className={`${
                  !multistepController?.getActiveStatus() && "disable_input"
                }`}
                tabIndex={
                  !multistepController?.getActiveStatus() ? -1 : undefined
                }
                {...register(`familyComposition.${index}.age` as const, {
                  onChange: (e) => handleAgeChange(e),
                })}
              />
            </div>
            {errors.familyComposition &&
              errors.familyComposition[index]?.age && (
                <p className={styles.error_message}>
                  {String(errors.familyComposition![index]?.age?.message)}
                </p>
              )}

            <div className={`${styles.formRow} ${styles.input}`}>
              <label htmlFor={`familyComposition.${index}.ocupation` as const}>
                Ocupação
              </label>
              <input
                className={`${
                  !multistepController?.getActiveStatus() && "disable_input"
                }`}
                tabIndex={
                  !multistepController?.getActiveStatus() ? -1 : undefined
                }
                {...register(`familyComposition.${index}.ocupation` as const)}
              />
            </div>
            {errors.familyComposition &&
              errors.familyComposition[index]?.ocupation && (
                <p className={styles.error_message}>
                  {String(errors.familyComposition![index]?.ocupation)}
                </p>
              )}

            <div className={`${styles.formRow} ${styles.formCommentsRow}`}>
              <label htmlFor={`familyComposition.${index}.comments` as const}>
                Observações
              </label>
              <textarea
                className={`${
                  !multistepController?.getActiveStatus() && "disable_input"
                }`}
                tabIndex={
                  !multistepController?.getActiveStatus() ? -1 : undefined
                }
                {...register(`familyComposition.${index}.comments` as const)}
                cols={29}
                rows={5}
              />
            </div>
            {errors.familyComposition &&
              errors.familyComposition[index]?.comments && (
                <p className={styles.error_message}>
                  {String(errors.familyComposition![index]?.comments)}
                </p>
              )}

            {multistepController?.getActiveStatus() && (
              <button
                type="button"
                className={`${styles.remove_family} ${styles.family_btn}`}
                onClick={() => removeFamily(index)}
                tabIndex={-1}
              >
                Remover familiar
                <icon.RemoveUser />
              </button>
            )}
          </div>
        ))}

        {multistepController?.getActiveStatus() && (
          <button
            className={`${styles.add_family} ${styles.family_btn}`}
            onClick={() => addFamily()}
            type="button"
          >
            Adicionar familiar
            <icon.UserAdd />
          </button>
        )}

        <div className={styles.buttons}>
          <button
            className="submitBtn"
            onClick={handleSubmit((data) => next(data))}
            type="submit"
          >
            Avançar
          </button>
          <button
            className="submitBtn"
            onClick={() => back(getValues())}
            type="button"
          >
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
};
export default StepComposicaoFamiliar;

const FamilyTitle = ({
  index,
  className,
}: {
  index: number;
  className?: string;
}) => {
  const style: React.CSSProperties = { color: "#287bd1", fontSize: "1.2rem" };
  return (
    <h3 style={style} className={className ?? ""}>
      Familiar {index}
    </h3>
  );
};
