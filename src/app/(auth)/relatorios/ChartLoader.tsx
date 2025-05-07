import Loader from "@/common/loader/loader";
import * as icon from "react-flaticons";

export const ChartLoader = ({
  chartName,
  error,
}: {
  chartName: string;
  error: boolean;
}) => (
  <div className="w-full h-full flex flex-col justify-center items-center gap-4">
    {error ? (
      <>
        <icon.EngineWarning className="text-red-500" />
        <p>Erro ao carregar &quot;{chartName}&quot;</p>
      </>
    ) : (
      <>
        <Loader />
        <p>Carregando {chartName} ...</p>
      </>
    )}
  </div>
);
