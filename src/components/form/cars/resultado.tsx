import { useCallback } from "react";
import SubTitle from "../assistido/subTitle";
import { useCarsChildhoodProvider } from "@/contexts/carsChildhoodContext";

type Props = {
  className?: string;
};
export default function ResultadoCarsAdulto({ className }: Props) {
  const { getResultPontos } = useCarsChildhoodProvider();

  const getResultText = useCallback((pontos: number | undefined) => {
    if (pontos === undefined)
      return "Responda todas as questões para ter o resultado final.";
    if (pontos <= 30) return "Sem autismo";
    if (pontos <= 36) return "Autismo leve-moderado";
    return "Autismo grave";
  }, []);

  return (
    <div className={className}>
      <SubTitle text="Resultado" className="m-auto mt-6 capitalize mb-12" />
      <div className="flex gap-4 flex-col justify-center items-center my-6">
        {getResultPontos() != undefined ? (
          <>
            <p className="font-semibold">Pontuação: {getResultPontos()}</p>
            <p className="px-2 py-4 bg-white rounded-md">
              {getResultText(getResultPontos())}
            </p>
          </>
        ) : (
          <p>Complete todos os passos da avaliação para obter um resultado.</p>
        )}
      </div>
    </div>
  );
}
