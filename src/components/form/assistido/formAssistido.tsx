"use client";

import { ReactElement, useEffect, useState } from "react";

import { useRouter } from "next/navigation";
("next/navigation");

import styles from "./formAssistido.module.css";

import FormTitle from "@/components/titles/form/form";
import * as icon from "react-flaticons";

//FormHeader Index components
import {
  MultistepFormHeader,
  StepHeader,
} from "@/components/multistep_form/multistep_form";
import { STEPS } from "@/constants/stepsCadastroAssistido.array";

//Custom hooks
import {
  MultistepFormContext,
  useMultistepForm,
} from "@/hooks/useMultistepForm";

// Steps
import StepAssistido from "./steps/assistido/stepAssistido";
import { StepPai, StepMae } from "./steps/pais/stepPais";
import StepResponsavel from "./steps/responsavel/stepResponsavel";
import StepComposicaoFamiliar from "./steps/composicao_familiar/stepComposicaoFamiliar";
import StepFinalizar from "./steps/finalizar/stepFinalizar";

import { getAssistidoById, updateAssistidoStatus } from "@/api/endpoints";
import Loader from "@/common/loader/loader";
import { apiToAssistido } from "@/api/middleware/formAssistido";

/* const [assistidoPromise, setAssistidoPromise] */

type Props = {
  editId?: string | null;
};

function FormAssistido({ editId = null }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const multistepController = useMultistepForm(
    [
      <StepAssistido key={0} />,
      <StepMae key={1} />,
      <StepPai key={2} />,
      <StepResponsavel key={3} />,
      <StepComposicaoFamiliar key={4} />,
      <StepFinalizar key={5} />,
    ],
    null
  );

  useEffect(() => {
    if (editId) {
      setIsLoading(true);
      getAssistidoById(editId)
        .then(({ data }) => {
          console.log("data da requisição:", data);
          multistepController.loadData(apiToAssistido(data));
          multistepController.setId(data.id);
          multistepController.setActiveStatus(data.statusAssistido);
        })
        .catch(() => {
          window.onbeforeunload = () => null; // Removes the exit confirmation
          setTimeout(() => router.push("/menu"), 3000);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  function changeStatusAssistido() {
    const activeStatus = multistepController.getActiveStatus();
    if (
      activeStatus &&
      !confirm(
        "Deseja realmente desativar este assistido?\nAlterações não salvas poderão ser perdidas."
      )
    )
      return;
    editId &&
      updateAssistidoStatus(editId, !activeStatus).then(() => {
        if (multistepController.getActiveStatus()) {
          window.onbeforeunload = () => null; // Removes the exit confirmation
          window.location.reload();
        }
        multistepController.changeActiveStatus();
      });
  }

  useEffect(() => {
    if (multistepController.getActiveStatus()) {
      window.onbeforeunload = () => true;
    } else {
      window.onbeforeunload = () => null;
    }
  }, [multistepController.getActiveStatus()]);

  return (
    <div className={styles.container}>
      <FormTitle
        className={styles.title}
        title={editId ? "Alterar Assistido" : "Cadastrar Assistido"}
        Icon={icon.User}
      />
      <div className={styles.steps}>
        <MultistepFormHeader className={styles.multistep_form}>
          {STEPS.map(
            (stepLabel, index): ReactElement => (
              <StepHeader
                key={stepLabel}
                label={stepLabel}
                completed={
                  index <= STEPS.length - 1 &&
                  multistepController.stepIsCompleted(index)
                }
                currentStep={multistepController.currentStepIndex === index}
                lastStep={multistepController.isLastStep(index)}
              />
            )
          )}
        </MultistepFormHeader>

        <p className={styles.required_message}>* Campos obrigatórios</p>

        {editId && isLoading ? (
          <Loader className={styles.loader} />
        ) : (
          <>
            <MultistepFormContext.Provider value={multistepController}>
              {multistepController.step}
            </MultistepFormContext.Provider>

            {editId && (
              <button
                className={`${styles.statusBtn} ${
                  multistepController.isLoading && "disable_button"
                } ${
                  multistepController.getActiveStatus()
                    ? "button_deactivate"
                    : "button_activate"
                }`}
                disabled={multistepController.isLoading}
                type="button"
                onClick={() => changeStatusAssistido()}
              >
                {multistepController.getActiveStatus()
                  ? "Desativar assistido"
                  : "Ativar assistido"}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
export default FormAssistido;
