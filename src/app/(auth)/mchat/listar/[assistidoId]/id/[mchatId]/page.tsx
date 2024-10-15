"use client";

import { getMchatDetailsById } from "@/api/endpoints";
import Loader from "@/common/loader/loader";
import { mchatFormData } from "@/components/form/mchat/Constants";
import { MchatQuestions } from "@/components/form/mchat/mchatQuestions";
import { mchatFormDataToArray, peaToString } from "@/components/form/mchat/Utils";
import FormTitle from "@/components/titles/form/form";
import Button from "@/components/ui/button";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import * as icon from "react-flaticons";

type Params = {
  assistidoId: string;
  mchatId: string;
};

type Props = {
  params: Params;
};

export type MchatDataResponse = {
  nomeAssistido: string;
  data: string;
  pea: boolean;
  detalhes: {
    pergunta: number;
    resposta: boolean;
  }[];
};

const ConsultarMchatPage = ({ params: { assistidoId, mchatId } }: Props) => {
  const router = useRouter();
  const [mchatDataResponse, setMchatDataResponse] = useState<MchatDataResponse | undefined>(undefined);

  useEffect(() => {
    getMchatDetailsById(mchatId)
      .then((response) => {
        setMchatDataResponse(response.data);
      })
      .catch(() => router.push(`/mchat/listar/${assistidoId}`));
  }, []);

  if (mchatDataResponse === undefined)
    return (
      <div className="w-fit m-auto mt-48">
        <Loader style={{ margin: "40px 0 25px" }} />
      </div>
    );

  return (
    <div>
      <FormTitle
        title={"Consultar MCHAT"}
        Icon={icon.Document}
        className="m-auto mt-6"
      />

      <FormTitle
        title={`Assistido: ${mchatDataResponse.nomeAssistido}`}
        className="m-auto mt-4"
      />

      <div className="mx-auto w-fit mt-12 mb-6 p-4 outline outline-4 rounded-sm text-lg font-semibold text-center">
        <p>{`Data de realização: ${dayjs(mchatDataResponse.data).format(
          "DD/MM/YYYY"
        )}`}</p>
        <p>{`Resultado: ${peaToString(mchatDataResponse.pea)}`}</p>
      </div>

      <MchatQuestions mchatDataResponse={mchatDataResponse}/>

      <Button
        text="Voltar ao histórico Mchat"
        className="block mx-auto my-12"
        onClick={() => router.push(`/mchat/listar/${assistidoId}`)}
      />
    </div>
  );
};

export default ConsultarMchatPage;
