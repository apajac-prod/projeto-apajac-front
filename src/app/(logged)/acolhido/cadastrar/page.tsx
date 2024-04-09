"use client";

import {
  useState,
  useContext,
  useEffect,
  createContext,
  ReactElement,
} from "react";

import styles from "./page.module.css";

import FormTitle from "@/components/titles/form/form";
import { formTitleIcons } from "@/components/titles/form/formTitleIcons";

//FormHeader Index components
import {
  MultistepFormHeader,
  StepHeader,
} from "@/components/multistep_form/multistep_form";
import { STEPS } from "@/data/stepsCadastroAcolhido.array";

//Custom hooks
import {
  MultistepFormContext,
  useMultistepForm,
} from "@/hooks/useMultistepForm";

// Steps
import FormAcolhido from "@/components/form/acolhido/acolhido";
import { FormPai, FormMae } from "@/components/form/pais/pais";
import FormResponsavel from "@/components/form/responsavel/responsavel";
import FormComposicaoFamiliar from "@/components/form/composicao_familiar/composicao_familiar";
import FormFinalizar from "@/components/form/finalizar/finalizar";

function cadastrarAcolhido() {
  const multistepController = useMultistepForm([
    <FormAcolhido />,
    <FormMae />,
    <FormPai />,
    <FormResponsavel />,
    <FormComposicaoFamiliar />,
    <FormFinalizar />,
  ]);

  return (
    <div className={styles.container}>
      <FormTitle
        className={styles.title}
        title="Cadastrar Acolhido"
        icon={formTitleIcons.person}
      />
      <div className={styles.steps}>
        <MultistepFormHeader className={styles.multistep_form}>
          {STEPS.map(
            (stepLabel, index): ReactElement => (
              <StepHeader
                key={stepLabel}
                label={stepLabel}
                completed={index <= STEPS.length-1 && multistepController.stepIsCompleted(index)}
                currentStep={multistepController.currentStepIndex === index}
                lastStep={multistepController.isLastStep(index)}
              />
            )
          )}
        </MultistepFormHeader>

        <p className={styles.required_message}>* Campos obrigatórios</p>

        <MultistepFormContext.Provider value={multistepController}>
          {multistepController.step}
        </MultistepFormContext.Provider>
      </div>
    </div>
  );
}
export default cadastrarAcolhido;
