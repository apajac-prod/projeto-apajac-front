import { useForm } from "react-hook-form";

import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputMask from "@mona-health/react-input-mask";

import SubTitle from "@/components/form/assistido/subTitle";
import styles from "./stepAssistido.module.css";
import Link from "next/link";

import { useState, useContext, ChangeEvent } from "react";

import { MultistepFormContext } from "@/hooks/useMultistepForm";
import { restoreInputValue } from "@/functions/restoreInputs";
import { Assistido } from "@/types/formAssistido.type";

import { unmaskCep, unmaskPhone } from "@/functions/unmaskInputs";

import FEDERATION_UNITS from "@/constants/federation_units.array";
import { getAddressByCep } from "@/api/endpoints";
import { SEXO } from "./enum";

const BUSCA_CEP_LINK =
  "https://buscacepinter.correios.com.br/app/endereco/index.php";

type CepError = {
  cod: number;
  message: string;
};

function StepAssistido() {
  const multistepController = useContext(MultistepFormContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [disableAddressInputs, setDisableAddressInputs] =
    useState<boolean>(false);
  const [cepError, setCepError] = useState<null | CepError>(null);
  const [phoneMask, setPhoneMask] = useState(
    restoreInputValue("schoolPhone", multistepController || null) &&
      unmaskPhone(
        restoreInputValue("schoolPhone", multistepController || null)
      )[3] == "9"
      ? "(99) 9 9999-9999"
      : "(99) 9999-9999"
  );
  //Yup validation schema
  const assistidoSchema: yup.ObjectSchema<Assistido> = yup.object({
    registerDate: yup
      .mixed<Dayjs>()
      .transform((_, val: string) => dayjs(val, "DD/MM/YYYY", true))
      .test("register_date_check", function (date) {
        if (!dayjs.isDayjs(date) || !date?.isValid())
          return this.createError({
            message: "A data inserida não é valida",
            path: "registerDate",
          });

        if (date?.isAfter(dayjs()))
          return this.createError({
            message:
              "A data de cadastro não pode ser uma data que ainda não chegou.",
            path: "registerDate",
          });

        return true;
      })
      .required("Obrigatório inserir a data de cadastro")
      .typeError("Insira uma data válida"),

    name: yup
      .string()
      .required("Obrigatório inserir o nome do assistido")
      .transform((_, val: string) => val.toUpperCase())
      .trim()
      .min(3, "Nome precisa ter no mínimo 3 caracteres")
      .max(255, "Quantidade máxima permitida de carácteres: 255")
      .typeError("Insira o nome do assistido"),

    birthdate: yup
      .mixed<Dayjs>()
      .transform((_, val: string) => dayjs(val, "DD/MM/YYYY", true))
      .test("birthdate_check", function (date) {
        if (!dayjs.isDayjs(date) || !date?.isValid())
          return this.createError({
            message: "A data inserida não é valida",
            path: "birthdate",
          });

        if (date.isAfter(dayjs()))
          return this.createError({
            message:
              "A data de nascimento não pode ser uma data que ainda não chegou.",
            path: "birthdate",
          });

        return true;
      })
      .required("Obrigatório inserir a data de nascimento")
      .typeError("Insira a data de nascimento em formato correto"),

    sex: yup
      .string()
      .required("Obrigatório selecionar um sexo")
      .typeError("Selecione o sexo"),
    educationLevel: yup
      .string()
      .trim()
      .max(50, "Quantidade máxima permitida de carácteres: 50")
      .required("Obrigatório inserir a escolaridade")
      .typeError("Insira o nível de escolaridade"),

    school: yup
      .string()
      .transform((_, val) => (val === "" ? null : val))
      .nullable()
      .test(
        "empty_validation",
        "Nome da escola precisa ter no mínimo 3 caracteres",
        function (value) {
          // Check if the inserted date its after now()
          if (value) {
            const schema = yup
              .string()
              .min(3, "Nome da escola precisa ter no mínimo 3 caracteres");
            return schema.isValidSync(value);
          }
          return true;
        }
      )
      .trim()
      .max(255, "Quantidade máxima permitida de carácteres: 255")
      .typeError("Verifique se inseriu corretamente o nome da escola"),

    schoolPhone: yup
      .string()
      .nullable()
      .transform((_, val) => {
        const unmaskedVal = unmaskPhone(val);

        if (unmaskedVal == "") return null;
        return unmaskedVal;
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

      .min(10, "Telefone precisa ter ao menos 10 dígitos")
      .max(11, "Quantidade máxima permitida de carácteres: 11")
      .typeError("Verifique se inseriu corretamente o telefone"),

    anyInstitutionRegister: yup
      .string()
      .trim()
      .required("Obrigatório selecionar uma opção")
      .oneOf(["yes", "no"], "Selecione uma opção válida"),

    whichInstitution: yup.string().when("anyInstitutionRegister", {
      is: (value: string) => value === "yes",
      then: () =>
        yup
          .string()
          .trim()
          .min(3, "Insituição precisa ter no mínimo 3 caracteres")
          .max(255, "Quantidade máxima permitida de carácteres: 255")
          .required("Obrigatório inserir a instituição"),
    }),

    forwardedTo: yup
      .string()
      .transform((_, val) => (val === "" ? null : val))
      .nullable()
      .trim()
      .test(
        "min-check",
        "Necessário inserir ao menos 3 caracteres",
        (input) => !input || (!!input && input.length >= 3)
      )
      .max(255, "Quantidade máxima permitida de carácteres: 255")
      .optional(),

    whoRecommended: yup
      .string()
      .trim()
      .max(50, "Quantidade máxima permitida de carácteres: 50")
      .optional(),

    informationProvidedBy: yup
      .string()
      .trim()
      .max(255, "Quantidade máxima permitida de carácteres: 255")
      .required("Obrigatório indicar quem forneceu as informações"),

    //Address
    postalCode: yup
      .string()
      .trim()
      .transform((_, val: string) => (val == "" ? null : unmaskCep(val)))
      .min(8, "CEP precisa ter 8 dígitos")
      .test("postalCode_validation", "", function () {
        if (!!cepError && cepError.cod == 406) return false;
        return true;
      })
      .nullable(),
    /* .required(
        "Obrigatório inserir o CEP. Caso não saiba, clique em 'Não sabe o CEP?'"
      ), */
    fu: yup
      .string()
      .trim()
      .required("Obrigatório selecionar a unidade da federação")
      .oneOf(
        FEDERATION_UNITS,
        "Só é possível cadastrar assistidos do Estado de São Paulo"
      ),

    city: yup
      .string()
      .trim()
      .min(2, "Cidade precisa ter ao menos 2 caracteres")
      .max(255, "Quantidade máxima permitida de carácteres: 255")
      .oneOf(["Jacareí"], "Só é possível cadastrar assistidos de Jacareí")
      .required("Obrigatório inserir a cidade"),

    district: yup
      .string()
      .trim()
      .min(2, "Bairro precisa ter ao menos 2 caracteres")
      .max(50, "Quantidade máxima permitida de carácteres: 50")
      .required("Obrigatório inserir o bairro"),

    address: yup
      .string()
      .trim()
      .min(2, "Endereço precisa ter ao menos 2 caracteres")
      .max(255, "Quantidade máxima permitida de carácteres: 255")
      .required("Obrigatório inserir o endereço"),

    addressNumber: yup
      .string()
      .transform((_, val) => (val === "" ? null : val))
      .max(10, "Número pode ter no máximo 10 caracteres")
      .required("Obrigatório inserir o número do endereço"),

    complement: yup
      .string()
      .min(2, "Complemento precisa ter ao menos 2 caracteres")
      .max(255, "Quantidade máxima permitida de carácteres: 255")
      .transform((_, val) => (val === "" ? null : val))
      .nullable()
      .trim(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    formState: { errors },
  } = useForm({
    defaultValues: {
      registerDate:
        restoreInputValue("registerDate", multistepController || null) != ""
          ? restoreInputValue("registerDate", multistepController || null)
          : dayjs().format("DD/MM/YYYY"),
      name: restoreInputValue("name", multistepController || null),
      birthdate: restoreInputValue("birthdate", multistepController || null),
      sex: restoreInputValue("sex", multistepController || null),
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
      fu: "SP",
      city: "Jacareí",
      district: restoreInputValue("district", multistepController || null),
      address: restoreInputValue("address", multistepController || null),
      addressNumber: restoreInputValue(
        "addressNumber",
        multistepController || null
      ),
      complement: restoreInputValue("complement", multistepController || null),
    },
    mode: "onBlur",
    resolver: yupResolver(assistidoSchema),
  });

  const [anyInstitutionRegister, setAnyInstitutionRegister] = useState(
    restoreInputValue("anyInstitutionRegister", multistepController || null) ==
      "yes"
      ? true
      : false
  );

  function handlePhoneChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    if (value[5] == "9") {
      setPhoneMask("(99) 9 9999-9999");
      setValue("schoolPhone", value);
      return;
    }
    setPhoneMask("(99) 9999-9999");
    setValue("schoolPhone", value);
  }

  function handleCepChange(event: React.ChangeEvent<HTMLInputElement>) {
    const cep = unmaskCep(event.target.value);
    if (cep.length == 8) {
      setIsLoading(true);
      setDisableAddressInputs(() => true);

      getAddressByCep(cep)
        .then((response) => {
          if ((response.status = 200)) {
            setValue("address", response.data.endereco, {
              shouldValidate: true,
            });
            setValue("district", response.data.bairro, {
              shouldValidate: true,
            });
            setFocus("addressNumber");
            setCepError(null);
          }
        })
        .catch((error) => {
          if (!error.status) {
            setCepError({
              cod: 0,
              message:
                "Não foi possível se conectar ao servidor para verificar o CEP.",
            });
          }

          setCepError({
            cod: error.status,
            message: error.message,
          });
        })
        .finally(() => {
          setDisableAddressInputs(() => false);
          setIsLoading(false);
        });
    }
  }
  //Allow only numbers
  function handleAddressNumberChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const insertedValue = event.target.value;
    const allowOnlyNumbersRgx = /^[0-9]*$/;

    //If not number, remove the inserted letter
    if (!allowOnlyNumbersRgx.test(insertedValue))
      event.target.value = insertedValue.slice(0, -1);
  }

  function next(data: any) {
    multistepController?.setCurrentStepData(data);
    multistepController!.next();
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
        <SubTitle text="Dados do assistido" className={styles.sub_title} />

        <div className={`${styles.formRow} ${styles.input_small}`}>
          <label htmlFor="registerDate" className={styles.required}>
            Data de cadastro
          </label>
          <InputMask
            mask="99/99/9999"
            className={`${
              !multistepController?.getActiveStatus() && "disable_input"
            }`}
            tabIndex={!multistepController?.getActiveStatus() ? -1 : undefined}
            {...register("registerDate")}
          >
            <input type="text" id="registerDate" />
          </InputMask>
        </div>
        {errors.registerDate && (
          <p className={styles.error_message}>
            {String(errors.registerDate.message)}
          </p>
        )}

        <div className={`${styles.formRow} ${styles.input_big}`}>
          <label htmlFor="name" className={styles.required}>
            Nome
          </label>
          <input
            className={`${
              !multistepController?.getActiveStatus() && "disable_input"
            }`}
            tabIndex={!multistepController?.getActiveStatus() ? -1 : undefined}
            type="text"
            id="name"
            style={{ textTransform: "uppercase" }}
            {...register("name")}
          />
        </div>
        {errors.name && (
          <p className={styles.error_message}>{String(errors.name.message)}</p>
        )}

        <div className={`${styles.formRow} ${styles.input_small}`}>
          <label htmlFor="birthdate" className={styles.required}>
            Data de nascimento
          </label>
          <InputMask
            mask="99/99/9999"
            className={`${
              !multistepController?.getActiveStatus() && "disable_input"
            }`}
            tabIndex={!multistepController?.getActiveStatus() ? -1 : undefined}
            {...register("birthdate")}
          >
            <input type="text" id="birthdate" />
          </InputMask>
        </div>
        {errors.birthdate && (
          <p className={styles.error_message}>
            {String(errors.birthdate.message)}
          </p>
        )}

        <div className={styles.formRow}>
          <label htmlFor="sex" className={styles.required}>
            Sexo
          </label>
          <select
            aria-label="select an option"
            className={`${
              !multistepController?.getActiveStatus() && "disable_input"
            }`}
            tabIndex={!multistepController?.getActiveStatus() ? -1 : undefined}
            defaultValue={""}
            {...register("sex")}
          >
            <option value={""} hidden>
              Selecione um sexo
            </option>
            <option value={SEXO.INDEFINIDO} hidden>
              Selecione um sexo
            </option>
            <option value={SEXO.MASCULINO}>Masculino</option>
            <option value={SEXO.FEMININO}>Feminino</option>
          </select>
        </div>
        {errors.sex && (
          <p className={styles.error_message}>
            {String(errors.sex.message)}
          </p>
        )}

        <div className={styles.formRow}>
          <label htmlFor="educationLevel" className={styles.required}>
            Escolaridade
          </label>
          <input
            className={`${
              !multistepController?.getActiveStatus() && "disable_input"
            }`}
            tabIndex={!multistepController?.getActiveStatus() ? -1 : undefined}
            type="text"
            id="educationLevel"
            {...register("educationLevel")}
          />
        </div>
        {errors.educationLevel && (
          <p className={styles.error_message}>
            {String(errors.educationLevel.message)}
          </p>
        )}

        <div className={styles.formRow}>
          <label htmlFor="school">Escola</label>
          <input
            className={`${
              !multistepController?.getActiveStatus() && "disable_input"
            }`}
            tabIndex={!multistepController?.getActiveStatus() ? -1 : undefined}
            type="text"
            id="school"
            {...register("school")}
          />
        </div>
        {errors.school && (
          <p className={styles.error_message}>
            {String(errors.school.message)}
          </p>
        )}

        <div className={`${styles.formRow} ${styles.input_small}`}>
          <label htmlFor="schoolPhone">Tel. da escola</label>

          <InputMask
            className={`${
              !multistepController?.getActiveStatus() && "disable_input"
            }`}
            tabIndex={!multistepController?.getActiveStatus() ? -1 : undefined}
            mask={phoneMask}
            {...register("schoolPhone", {
              onChange: (e) => handlePhoneChange(e),
            })}
          >
            <input type="text" id="schoolPhone" />
          </InputMask>
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
            aria-label="select an option"
            className={`${
              !multistepController?.getActiveStatus() && "disable_input"
            }`}
            tabIndex={!multistepController?.getActiveStatus() ? -1 : undefined}
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
              <input
                className={`${
                  !multistepController?.getActiveStatus() && "disable_input"
                }`}
                tabIndex={
                  !multistepController?.getActiveStatus() ? -1 : undefined
                }
                type="text"
                id="whichInstitution"
                {...register("whichInstitution")}
              />
            </div>
            {errors.whichInstitution && (
              <p className={styles.error_message}>
                {String(errors.whichInstitution.message)}
              </p>
            )}
          </>
        )}

        <div className={styles.formRow}>
          <label htmlFor="forwardedTo">Encaminhado para</label>
          <input
            className={`${
              !multistepController?.getActiveStatus() && "disable_input"
            }`}
            tabIndex={!multistepController?.getActiveStatus() ? -1 : undefined}
            type="text"
            id="forwardedTo"
            {...register("forwardedTo")}
          />
        </div>
        {errors.forwardedTo && (
          <p className={styles.error_message}>
            {String(errors.forwardedTo.message)}
          </p>
        )}

        <div className={styles.formRow}>
          <label htmlFor="whoRecommended">Quem indicou a APAJAC?</label>
          <input
            className={`${
              !multistepController?.getActiveStatus() && "disable_input"
            }`}
            tabIndex={!multistepController?.getActiveStatus() ? -1 : undefined}
            type="text"
            id="whoRecommended"
            {...register("whoRecommended")}
          />
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
          <input
            className={`${
              !multistepController?.getActiveStatus() && "disable_input"
            }`}
            tabIndex={!multistepController?.getActiveStatus() ? -1 : undefined}
            type="text"
            id="informationProvidedBy"
            {...register("informationProvidedBy")}
          />
        </div>
        {errors.informationProvidedBy && (
          <p className={styles.error_message}>
            {String(errors.informationProvidedBy.message)}
          </p>
        )}

        <SubTitle text="Endereço" className={styles.sub_title} />

        <div className={`${styles.formRow} ${styles.input_small}`}>
          <label htmlFor="postalCode">CEP</label>
          <InputMask
            className={`${
              !multistepController?.getActiveStatus() && "disable_input"
            }`}
            tabIndex={!multistepController?.getActiveStatus() ? -1 : undefined}
            mask="99999-999"
            {...register("postalCode", {
              onChange: (value) => handleCepChange(value),
            })}
          >
            <input type="text" id="postalCode" placeholder="_____-___" />
          </InputMask>

          <Link tabIndex={-1} href={BUSCA_CEP_LINK} target="_blank">
            Não sabe o CEP?
          </Link>
        </div>
        {isLoading && <div className={styles.loader}></div>}

        {errors.postalCode && (
          <p className={styles.error_message}>
            {String(errors.postalCode.message)}
          </p>
        )}

        {cepError && cepError.cod == 400 && (
          <p className={`${styles.error_message} ${styles.cep_error_message}`}>
            Não foi possível encontrar o CEP informado.
            <br />
            Mas você ainda pode preencher o endereço manualmente
          </p>
        )}

        {cepError && cepError.cod == 406 && (
          <p
            style={{ color: "red" }}
            className={`${styles.error_message} ${styles.cep_error_message}`}
          >
            O CEP informado não pertence a cidade de Jacareí.
          </p>
        )}

        {cepError && !cepError.cod && (
          <p className={`${styles.error_message} ${styles.cep_error_message}`}>
            Não foi possível se conectar ao servidor para verificar o CEP.
            <br />
            Mas você ainda pode preencher o endereço manualmente.
          </p>
        )}

        <div className={`${styles.formRow} ${styles.input_tiny}`}>
          <label htmlFor="fu" className={styles.required}>
            Estado
          </label>
          <input
            type="text"
            id="fu"
            {...(register("fu"), { disabled: true, value: "SP" })}
          />
        </div>
        {errors.fu && (
          <p className={styles.error_message}>{String(errors.fu.message)}</p>
        )}

        <div className={`${styles.formRow} ${styles.input_small}`}>
          <label htmlFor="city" className={styles.required}>
            Cidade
          </label>
          <input
            type="text"
            id="city"
            {...(register("city"), { disabled: true, value: "Jacareí" })}
          />
        </div>
        {errors.city && (
          <p className={styles.error_message}>{String(errors.city.message)}</p>
        )}

        <div className={styles.formRow}>
          <label htmlFor="district" className={styles.required}>
            Bairro
          </label>
          <input
            className={`${
              !multistepController?.getActiveStatus() && "disable_input"
            }`}
            tabIndex={!multistepController?.getActiveStatus() ? -1 : undefined}
            type="text"
            id="district"
            disabled={disableAddressInputs}
            {...register("district")}
          />
        </div>
        {errors.district && (
          <p className={styles.error_message}>
            {String(errors.district.message)}
          </p>
        )}

        <div className={`${styles.formRow} ${styles.input_big}`}>
          <label htmlFor="address" className={styles.required}>
            Endereço
          </label>
          <input
            className={`${
              !multistepController?.getActiveStatus() && "disable_input"
            }`}
            tabIndex={!multistepController?.getActiveStatus() ? -1 : undefined}
            type="text"
            id="address"
            disabled={disableAddressInputs}
            {...register("address")}
          />
        </div>
        {errors.address && (
          <p className={styles.error_message}>
            {String(errors.address.message)}
          </p>
        )}

        <div className={`${styles.formRow} ${styles.input_tiny}`}>
          <label htmlFor="addressNumber" className={styles.required}>
            Número
          </label>

          <input
            className={`${
              !multistepController?.getActiveStatus() && "disable_input"
            }`}
            tabIndex={!multistepController?.getActiveStatus() ? -1 : undefined}
            type="text"
            id="addressNumber"
            disabled={disableAddressInputs}
            {...register("addressNumber")}
          />
        </div>
        {errors.addressNumber && (
          <p className={styles.error_message}>
            {String(errors.addressNumber.message)}
          </p>
        )}

        <div className={`${styles.formRow} ${styles.input_big}`}>
          <label htmlFor="complement">Complemento</label>
          <input
            className={`${
              !multistepController?.getActiveStatus() && "disable_input"
            }`}
            tabIndex={!multistepController?.getActiveStatus() ? -1 : undefined}
            disabled={disableAddressInputs}
            type="text"
            id="complement"
            {...register("complement")}
          />
        </div>
        {errors.complement && (
          <p className={styles.error_message}>
            {String(errors.complement.message)}
          </p>
        )}

        <div className={styles.buttons}>
          <button
            className="button_submit"
            onClick={handleSubmit(
              (data) => next(data)
            )}
          >
            Avançar
          </button>
        </div>
      </form>
    </div>
  );
}
export default StepAssistido;
