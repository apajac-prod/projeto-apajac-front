"use client";

import { getCarsByAssistidoId } from "@/api/endpoints";
import Loader from "@/common/loader/loader";
import FormTitle from "@/components/titles/form/form";
import Button from "@/components/ui/custom-button";
import { getCarsResult } from "@/functions/getCarsResult";
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

type Cars = {
  nomeAssistido: string;
  cars: {
    id: number;
    data: string;
    pontuacao: number;
  }[];
};

const ListarCarsPage = ({ params: { assistidoId } }: Props) => {
  const router = useRouter();
  const [cars, setCars] = useState<Cars | undefined>(undefined);

  useEffect(() => {
    getCarsByAssistidoId(assistidoId).then((response) =>
      setCars(response.data)
    );
  }, []);

  if (cars === undefined)
    return (
      <div className="w-fit m-auto mt-48">
        <Loader style={{ margin: "40px 0 25px" }} />
      </div>
    );

  return (
    <div>
      <FormTitle
        title={"Consultar CARS - Childhood"}
        Icon={icon.Document}
        className="m-auto mt-6"
      />

      <FormTitle
        title={`Assistido: ${cars.nomeAssistido}`}
        className="m-auto mt-4"
      />

      <h2 className="text-center mt-12 text-xl">Histórico de CARS realizado</h2>

      {cars.cars.length <= 0 ? (
        <p className="mt-4 text-center">
          Este assistido ainda não realizou nenhuma avaliação CARS - Childhood
        </p>
      ) : (
        cars.cars.map((avaliacao) => (
          <div
            key={avaliacao.id}
            className="bg-white rounded-md h-28 w-[95%] max-w-[500px] mx-auto mt-2 mb-4 flex items-center p-4 justify-between cursor-pointer"
            onClick={() =>
              router.push(`/cars/listar/${assistidoId}/id/${avaliacao.id}`)
            }
          >
            <div className="text-center font-semibold leading-6">
              <p>CARS realizado em</p>
              <p>{dayjs(avaliacao.data).format("DD/MM/YYYY")}</p>
            </div>
            <div className="bg-[#2E5994] text-white h-[90%] font-semibold min-w-fit p-2 flex flex-col items-center justify-between rounded-md">
              <p>Pontuação {avaliacao.pontuacao}</p>
              <p>{getCarsResult(avaliacao.pontuacao)}</p>
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

export default ListarCarsPage;
