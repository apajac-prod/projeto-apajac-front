"use client";

import { getMchatByAssistidoId } from "@/api/endpoints";
import Loader from "@/common/loader/loader";
import { peaToString } from "@/components/form/mchat/Utils";
import FormTitle from "@/components/titles/form/form";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import * as icon from "react-flaticons";

type Props = {
  params: Params;
};

type Params = {
  assistidoId: string;
};

type Mchat = {
  nomeAssistido: string;
  mchat: {
    id: number;
    data: string;
    pea: boolean;
  }[];
};

const ListarMchatPage = ({ params: { assistidoId } }: Props) => {
  const router = useRouter();
  const [mchat, setMchat] = useState<Mchat | undefined>(undefined);

  useEffect(() => {
    getMchatByAssistidoId(assistidoId).then((response) =>
      setMchat(response.data)
    );
  }, []);

  if (mchat === undefined)
    return (
      <div className="w-fit m-auto mt-48">
        <Loader style={{ margin: "40px 0 25px" }} />
      </div>
    );

  return (
    <div>
      <FormTitle
        title={"Consultar MCAHT"}
        Icon={icon.Document}
        className="m-auto mt-6"
      />

      <FormTitle
        title={`Assistido: ${mchat.nomeAssistido}`}
        className="m-auto mt-4"
      />

      <h2 className="text-center mt-12 text-xl">
        Histórico de MCHAT realizado
      </h2>

      {mchat.mchat.length <= 0 ? (
        <p className="mt-4 text-center">
          Este assistido ainda não realizou nenhuma avaliação MCHAT
        </p>
      ) : (
        mchat.mchat.map((avaliacao) => (
          <div
            key={avaliacao.id}
            className="bg-white rounded-md h-28 w-[95%] max-w-[500px] mx-auto mt-2 mb-4 flex items-center p-4 justify-between cursor-pointer"
            onClick={() =>
              router.push(`/mchat/listar/${assistidoId}/id/${avaliacao.id}`)
            }
          >
            <div className="text-center font-semibold leading-6">
              <p>MCHAT realizado em</p>
              <p>{dayjs(avaliacao.data).format("DD/MM/YYYY")}</p>
            </div>
            <div className="bg-[#2E5994] text-white h-[90%] font-semibold w-fit p-2 flex flex-col items-center justify-between rounded-md">
              <p>Resultado</p>
              <p className="text-center">{peaToString(avaliacao.pea)}</p>
            </div>
          </div>
        ))
      )}

      <Button
        text="Voltar ao menu"
        className="block mx-auto mt-12"
        onClick={() => router.push("/menu")}
      />
    </div>
  );
};

export default ListarMchatPage;
