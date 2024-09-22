import SubTitle from "../assistido/subTitle";
import { useCarsChildhoodProvider } from "@/contexts/carsChildhoodContext";
import { getCarsResult } from "@/functions/getCarsResult";

type Props = {
  className?: string;
};
export default function ResultadoCarsAdulto({ className }: Props) {
  const { getResultPontos } = useCarsChildhoodProvider();

  return (
    <div className={className}>
      <SubTitle text="Resultado" className="m-auto mt-6 capitalize mb-12" />
      <div className="flex gap-4 flex-col justify-center items-center my-6">
        {getResultPontos() != undefined ? (
          <>
            <p className="font-semibold">Pontuação: {getResultPontos()}</p>
            <p className="px-2 py-4 bg-white rounded-md">
              {getCarsResult(getResultPontos())}
            </p>
          </>
        ) : (
          <p>Complete todos os passos da avaliação para obter um resultado.</p>
        )}
      </div>
    </div>
  );
}
