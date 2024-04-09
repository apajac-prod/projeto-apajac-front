import { MouseEventHandler, ReactElement } from "react";
import { STEPS } from "@/data/stepsCadastroAcolhido.array";

//Multistep component
import formStyles from "./form.module.css";

type MultistepProps = {
  children: ReactElement[];
  className?: string;
};

export const MultistepFormHeader = ({
  children,
  className,
}: MultistepProps) => {
  let containerStyle = formStyles.container;

  if (className) {
    containerStyle += ` ${className}`;
  }

  return <div className={containerStyle}>{children.map((step) => step)}</div>;
};

//Steps components
import stepStyles from "./step.module.css";

type StepHeader = {
  index?: number;
  onClick?: MouseEventHandler;
  completed: boolean;
  lastStep: boolean;
  currentStep: boolean;
  label: (typeof STEPS)[number];
};

export const StepHeader = ({
  label,
  onClick,
  completed,
  currentStep,
  lastStep,
}: StepHeader) => {
  let backgroundDivStyle = stepStyles.backgroundDiv;
  let connectionStyle = stepStyles.connection;

  if (completed) {
    backgroundDivStyle += ` ${stepStyles.completed}`;
    connectionStyle += ` ${stepStyles.completed}`;
  }

  if (onClick) backgroundDivStyle += ` ${stepStyles.clickable}`;

  if (currentStep) {
    backgroundDivStyle += ` ${stepStyles.currentStep}`;
  }
  return (
    <div className={stepStyles.container}>
      <div className={backgroundDivStyle} onClick={onClick}>
        <p className={stepStyles.name}>{label}</p>
      </div>
      {!lastStep && <div className={connectionStyle}></div>}
    </div>
  );
};

/* export const AcolhidoHeader = ({
  onClick,
  completed,
  currentStep,
  lastStep,
}: StepHeader) => (
  <StepHeaderGeneric
    label={"Acolhido"}
    onClick={onClick}
    completed={completed}
    currentStep={currentStep}
    lastStep={lastStep}
  />
);

export const MaeHeader = ({
  onClick,
  completed,
  currentStep,
  lastStep,
}: StepHeader) => (
  <StepHeaderGeneric
    label={"Mãe"}
    onClick={onClick}
    completed={completed}
    currentStep={currentStep}
    lastStep={lastStep}
  />
);

export const PaiHeader = ({
  onClick,
  completed,
  currentStep,
  lastStep,
}: StepHeader) => (
  <StepHeaderGeneric
    label={"Pai"}
    onClick={onClick}
    completed={completed}
    currentStep={currentStep}
    lastStep={lastStep}
  />
);

export const ResponsavelHeader = ({
  onClick,
  completed,
  currentStep,
  lastStep,
}: StepHeader) => (
  <StepHeaderGeneric
    label={"Responsável"}
    onClick={onClick}
    completed={completed}
    currentStep={currentStep}
    lastStep={lastStep}
  />
);

export const ComposicaoFamiliarHeader = ({
  onClick,
  completed,
  currentStep,
  lastStep,
}: StepHeader) => (
  <StepHeaderGeneric
    label={"Composição Familiar"}
    onClick={onClick}
    completed={completed}
    currentStep={currentStep}
    lastStep={lastStep}
  />
);

export const FinalizarHeader = ({
  onClick,
  completed,
  currentStep,
  lastStep,
}: StepHeader) => (
  <StepHeaderGeneric
    label={"Finalizar"}
    onClick={onClick}
    completed={completed}
    currentStep={currentStep}
    lastStep={lastStep}
  />
);
 */
