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
  const {
    step,
    setPontosByStep,
    isSelectedOption,
    getIndexByStep,
    setObservacoesByStep,
    observacoes,
  } = useCarsChildhoodProvider();

  const indexProp = getIndexByStep(step);

  function handleSelectInput(index: number, pontos: number) {
    if (isSelectedOption(step, index)) {
      setPontosByStep(step, undefined);
      return;
    }
    setPontosByStep(step, pontos);
  }

  function handleObservacoesBlur(observacoesValue: string) {
    if (!observacoesValue) return;
    setObservacoesByStep(step, observacoesValue);
  }

  return (
    <div className={className}>
      <SubTitle
        text={CARS_CHILDHOOD_TITLE[step]}
        className="m-auto mt-6 capitalize"
      />
      <div className="flex gap-4 flex-col justify-center items-center my-6">
        {CARS_CHILDHOOD[indexProp].map((input, index) => (
          <div
            key={`${index}-${input.pontos}`}
            className="flex justify-center items-center gap-16"
          >
            <p className="text-xl font-semibold w-3">{index + 1}</p>
            <p className="w-5 text-center">{input.pontos}</p>
            <CarsInput
              className={`${
                isSelectedOption(step, index)
                  ? "text-white bg-blue-800"
                  : "bg-white text-black"
              }`}
              title={input.title}
              descricao={input.descricao}
              onClick={() => handleSelectInput(index, input.pontos)}
            />
          </div>
        ))}
      </div>

      <div className="w-[660px] m-auto flex justify-end">
        <textarea
          id={`observacoes-${step}`}
          value={observacoes[step] ?? ""}
          placeholder="Digite aqui observações sobre esta resposta. (OPCIONAL)"
          className="placeholder:text-center resize-none w-96 h-24 mr-16 mb-16 rounded-sm p-1"
          onChange={(e) => handleObservacoesBlur(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
}
