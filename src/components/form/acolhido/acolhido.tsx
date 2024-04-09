import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import SubTitle from "../subTitle";
import styles from "./acolhido.module.css";
import Link from "next/link";

import { useState, useContext, ChangeEvent } from "react";

import { MultistepFormContext } from "@/hooks/useMultistepForm";
import { restoreInputValue } from "@/functions/restoreInputs";
import { Acolhido } from "@/types/formAcolhido.type";

const BUSCA_CEP_LINK = "https://buscacepinter.correios.com.br/app/endereco/index.php";

const FEDERATION_UNITS = [
  "AC", // Acre
  "AL", // Alagoas
  "AP", // Amapá
  "AM", // Amazonas
  "BA", // Bahia
  "CE", // Ceará
  "DF", // Distrito Federal
  "ES", // Espírito Santo
  "GO", // Goiás
  "MA", // Maranhão
  "MT", // Mato Grosso
  "MS", // Mato Grosso do Sul
  "MG", // Minas Gerais
  "PA", // Pará
  "PB", // Paraíba
  "PR", // Paraná
  "PE", // Pernambuco
  "PI", // Piauí
  "RJ", // Rio de Janeiro
  "RN", // Rio Grande do Norte
  "RS", // Rio Grande do Sul
  "RO", // Rondônia
  "RR", // Roraima
  "SC", // Santa Catarina
  "SP", // São Paulo
  "SE", // Sergipe
  "TO", // Tocantins
];

function FormAcolhido() {
  const [anyInstitutionRegister, setAnyInstitutionRegister] = useState(false);
  const multistepController = useContext(MultistepFormContext);

  //Yup validation schema
  const acolhidoSchema: yup.ObjectSchema<Acolhido> = yup.object({
    name: yup
      .string()
      .trim()
      .required("Obrigatório inserir o nome do acolhido")
      .typeError("Insira o nome do acolhido"),

    birthdate: yup
      .date()
      .max(new Date(), "Insira uma data válida")
      .required("Obrigatório inserir a data de nascimento")
      .typeError("Insira a data de nascimento"),

    educationLevel: yup
      .string()
      .trim()
      .required("Obrigatório inserir a escolaridade")
      .typeError("Insira o nível de escolaridade"),

    school: yup
      .string()
      .trim()
      .transform((_, val) => (val === "" ? null : val))
      .nullable()
      .typeError("Verifique se inseriu corretamente o nome da escola"),

    schoolPhone: yup
      .string()
      .trim()
      .transform((_, val) => (val === "" ? null : val))
      .nullable()
      .typeError("Verifique se inseriu corretamente o telefone da escola"),

    anyInstitutionRegister: yup
      .string()
      .trim()
      .required("Obrigatório selecionar uma opção")
      .oneOf(["yes", "no"], "Selecione uma opção válida"),

    whichInstitution: yup.string().when("anyInstitutionRegister", {
      is: (value: string) => value === "yes",
      then: () =>
        yup.string().trim().required("Obrigatório inserir a instituição"),
    }),

    forwardedTo: yup
      .string()
      .trim()
      .required("Obrigatório indicar o encaminhamento"),

    whoRecommended: yup
      .string()
      .trim()
      .transform((_, val) => (val === "" ? null : val))
      .nullable(),

    informationProvidedBy: yup
      .string()
      .trim()
      .required("Obrigatório indicar quem forneceu as informações"),

    //Address
    postalCode: yup
      .string()
      .trim()
      .required(
        "Obrigatório inserir o CEP. Caso não saiba, clique em 'Não sabe o CEP?'"
      ),

    address: yup.string().trim().required("Obrigatório inserir o endereço"),

    district: yup.string().trim().required("Obrigatório inserir o bairro"),

    city: yup.string().trim().required("Obrigatório inserir a cidade"),

    fu: yup
      .string()
      .trim()
      .required("Obrigatório selecionar a unidade da federação")
      .oneOf(FEDERATION_UNITS, "Obrigatório selecionar a unidade da federação"),
  });

  // Setting the form
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: restoreInputValue("name", multistepController || null),
      birthdate: restoreInputValue("birthdate", multistepController || null),
      educationLevel: restoreInputValue(
        "educationLevel",
        multistepController || null
      ),
      school: restoreInputValue("school", multistepController || null),
      schoolPhone: restoreInputValue(
        "schoolPhone",
        multistepController || null
      ),
      anyInstitutionRegister: restoreInputValue(
        "anyInstitutionRegister",
        multistepController || null
      ),
      whichInstitution: restoreInputValue(
        "whichInstitution",
        multistepController || null
      ),
      forwardedTo: restoreInputValue(
        "forwardedTo",
        multistepController || null
      ),
      whoRecommended: restoreInputValue(
        "whoRecommended",
        multistepController || null
      ),
      informationProvidedBy: restoreInputValue(
        "informationProvidedBy",
        multistepController || null
      ),
      postalCode: restoreInputValue("postalCode", multistepController || null),
      address: restoreInputValue("address", multistepController || null),
      district: restoreInputValue("district", multistepController || null),
      city: restoreInputValue("city", multistepController || null),
      fu: restoreInputValue("fu", multistepController || null),
    },
    mode: "onBlur",
    resolver: yupResolver(acolhidoSchema),
  });

  function next(data: any) {
    console.log("Next", data);
    multistepController?.setCurrentStepData(data);
    multistepController!.next();
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

  function handleInstitutionChange(e: ChangeEvent<HTMLSelectElement>) {
    if (e.target.value === "yes") {
      setAnyInstitutionRegister(true);
    } else if (e.target.value === "no") {
      setAnyInstitutionRegister(false);
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit((data) => next(data))} autoComplete="off">
        <SubTitle text="Dados do acolhido" className={styles.sub_title} />

        <div className={`${styles.formRow} ${styles.input_big}`}>
          <label htmlFor="name" className={styles.required}>
            Nome
          </label>
          <input type="text" {...register("name")} />
        </div>
        {errors.name && (
          <p className={styles.error_message}>{String(errors.name.message)}</p>
        )}

        <div className={`${styles.formRow} ${styles.input_small}`}>
          <label htmlFor="birthdate" className={styles.required}>
            Data de nascimento
          </label>
          <input type="date" {...register("birthdate")} />
        </div>
        {errors.birthdate && (
          <p className={styles.error_message}>
            {String(errors.birthdate.message)}
          </p>
        )}

        <div className={styles.formRow}>
          <label htmlFor="educationLevel" className={styles.required}>
            Escolaridade
          </label>
          <input type="text" {...register("educationLevel")} />
        </div>
        {errors.educationLevel && (
          <p className={styles.error_message}>
            {String(errors.educationLevel.message)}
          </p>
        )}

        <div className={styles.formRow}>
          <label htmlFor="school">Escola</label>
          <input type="text" {...register("school")} />
        </div>
        {errors.school && (
          <p className={styles.error_message}>
            {String(errors.school.message)}
          </p>
        )}

        <div className={`${styles.formRow} ${styles.input_small}`}>
          <label htmlFor="schoolPhone">Tel. da escola</label>
          <input type="text" {...register("schoolPhone")} />
        </div>
        {errors.schoolPhone && (
          <p className={styles.error_message}>
            {String(errors.schoolPhone.message)}
          </p>
        )}

        <div className={styles.formRow}>
          <label htmlFor="anyInstitutionRegister" className={styles.required}>
            Possui cadastro em alguma instituição
          </label>
          <select
            defaultValue={""}
            {...register("anyInstitutionRegister", {
              onChange: (e) => handleInstitutionChange(e),
            })}
          >
            <option value="" hidden>
              Selecione
            </option>
            <option value="yes">Sim</option>
            <option value="no">Não</option>
          </select>
        </div>
        {errors.anyInstitutionRegister && (
          <p className={styles.error_message}>
            {String(errors.anyInstitutionRegister.message)}
          </p>
        )}

        {anyInstitutionRegister && (
          <>
            <div className={styles.formRow}>
              <label htmlFor="whichInstitution" className={styles.required}>
                Qual instituição?
              </label>
              <input type="text" {...register("whichInstitution")} />
            </div>
            {errors.whichInstitution && (
              <p className={styles.error_message}>
                {String(errors.whichInstitution.message)}
              </p>
            )}
          </>
        )}

        <div className={styles.formRow}>
          <label htmlFor="forwardedTo" className={styles.required}>
            Encaminhado para
          </label>
          <input type="text" {...register("forwardedTo")} />
        </div>
        {errors.forwardedTo && (
          <p className={styles.error_message}>
            {String(errors.forwardedTo.message)}
          </p>
        )}

        <div className={styles.formRow}>
          <label htmlFor="whoRecommended">Quem indicou a APAJAC?</label>
          <input type="text" {...register("whoRecommended")} />
        </div>
        {errors.whoRecommended && (
          <p className={styles.error_message}>
            {String(errors.whoRecommended.message)}
          </p>
        )}

        <div className={styles.formRow}>
          <label htmlFor="informationProvidedBy" className={styles.required}>
            Informações fornecidas por
          </label>
          <input type="text" {...register("informationProvidedBy")} />
        </div>
        {errors.informationProvidedBy && (
          <p className={styles.error_message}>
            {String(errors.informationProvidedBy.message)}
          </p>
        )}

        <SubTitle text="Endereço" className={styles.sub_title} />

        <div className={`${styles.formRow} ${styles.input_small}`}>
          <label htmlFor="postalCode" className={styles.required}>
            CEP
          </label>
          <input type="text" {...register("postalCode")} />
          <Link
            tabIndex={-1}
            href={BUSCA_CEP_LINK}
            target="_blank"
          >
            Não sabe o CEP?
          </Link>
        </div>
        {errors.postalCode && (
          <p className={styles.error_message}>
            {String(errors.postalCode.message)}
          </p>
        )}

        <div className={`${styles.formRow} ${styles.input_big}`}>
          <label htmlFor="address" className={styles.required}>
            Endereço
          </label>
          <input type="text" {...register("address")} />
        </div>
        {errors.address && (
          <p className={styles.error_message}>
            {String(errors.address.message)}
          </p>
        )}

        <div className={styles.formRow}>
          <label htmlFor="district" className={styles.required}>
            Bairro
          </label>
          <input type="text" {...register("district")} />
        </div>
        {errors.district && (
          <p className={styles.error_message}>
            {String(errors.district.message)}
          </p>
        )}

        <div className={styles.formRow}>
          <label htmlFor="city" className={styles.required}>
            Cidade
          </label>
          <input type="text" {...register("city")} />
        </div>
        {errors.city && (
          <p className={styles.error_message}>{String(errors.city.message)}</p>
        )}

        <div className={styles.formRow}>
          <label htmlFor="fu" className={styles.required}>
            UF
          </label>
          <select defaultValue={""} {...register("fu")}>
            <option value="" hidden>
              Selecione
            </option>
            {FEDERATION_UNITS.map((fu) => (
              <option key={fu} value={fu}>
                {fu}
              </option>
            ))}
          </select>
        </div>
        {errors.fu && (
          <p className={styles.error_message}>{String(errors.fu.message)}</p>
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
}
export default FormAcolhido;
