import {
  CARS_CHILDHOOD,
  CARS_CHILDHOOD_TITLE,
} from "@/constants/cars_childhood";
import SubTitle from "../assistido/subTitle";
import CarsInput from "./cars_input";
import { useCarsChildhoodProvider } from "@/contexts/carsChildhoodContext";

type Props = {
  className?: string;
};
export default function Steps({ className }: Props) {
  const { step, setPontosByStep, isSelectedOption, getIndexByStep } =
    useCarsChildhoodProvider();

  const indexProp = getIndexByStep(step);

  function handleSelectInput(index: number, pontos: number) {
    if (isSelectedOption(step, index)) {
      setPontosByStep(step, undefined);
      return;
    }
    setPontosByStep(step, pontos);
  }

  return (
    <div className={className}>
      <SubTitle
        text={CARS_CHILDHOOD_TITLE[step]}
        className="m-auto mt-6 capitalize"
      />
      <div className="flex gap-4 flex-col justify-center items-center my-6">
        {CARS_CHILDHOOD[indexProp].map((input, index) => (
          <CarsInput
            key={`${index}-${input.pontos}`}
            className={`${
              isSelectedOption(step, index)
                ? "bg-blue-800 text-white"
                : "bg-white text-black"
            }`}
            title={input.title}
            descricao={input.descricao}
            onClick={() => handleSelectInput(index, input.pontos)}
          />
        ))}
      </div>
    </div>
  );
}
