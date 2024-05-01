"use client";

import { ReactElement, useEffect, useState } from "react";

import { useRouter } from "next/navigation";
("next/navigation");

import styles from "./formAcolhido.module.css";

import FormTitle from "@/components/titles/form/form";
import * as icon from "react-flaticons";

//FormHeader Index components
import {
  MultistepFormHeader,
  StepHeader,
} from "@/components/multistep_form/multistep_form";
import { STEPS } from "@/constants/stepsCadastroAcolhido.array";

//Custom hooks
import {
  MultistepFormContext,
  useMultistepForm,
} from "@/hooks/useMultistepForm";

// Steps
import StepAcolhido from "./steps/acolhido/stepAcolhido";
import { StepPai, StepMae } from "./steps/pais/stepPais";
import StepResponsavel from "./steps/responsavel/stepResponsavel";
import StepComposicaoFamiliar from "./steps/composicao_familiar/stepComposicaoFamiliar";
import StepFinalizar from "./steps/finalizar/stepFinalizar";

import { getAcolhidoById, updateAcolhidoStatus } from "@/api/endpoints";
import Loader from "@/common/loader/loader";
import { apiToAcolhido } from "@/api/middleware/formAcolhido";

/* const [acolhidoPromise, setAcolhidoPromise] */

type Props = {
  editId?: string | null;
};

function FormAcolhido({ editId = null }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const multistepController = useMultistepForm(
    [
      <StepAcolhido key={0} />,
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
      getAcolhidoById(editId)
        .then(({ data }) => {
          console.log("data da requisição:", data);
          multistepController.loadData(apiToAcolhido(data));
          multistepController.setId(data.id);
          multistepController.setActiveStatus(data.statusAcolhido);
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

  function changeStatusAcolhido() {
    const activeStatus = multistepController.getActiveStatus();
    if (
      activeStatus &&
      !confirm(
        "Deseja realmente desativar este acolhido?\nAlterações não salvas poderão ser perdidas."
      )
    )
      return;
    editId &&
      updateAcolhidoStatus(editId, !activeStatus).then(() => {
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
        title={editId ? "Alterar Acolhido" : "Cadastrar Acolhido"}
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
                className={`submitBtn ${
                  multistepController.getActiveStatus()
                    ? styles.deactivate
                    : styles.activate
                }`}
                type="button"
                onClick={() => changeStatusAcolhido()}
              >
                {multistepController.getActiveStatus()
                  ? "Desativar acolhido"
                  : "Ativar acolhido"}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
export default FormAcolhido;
