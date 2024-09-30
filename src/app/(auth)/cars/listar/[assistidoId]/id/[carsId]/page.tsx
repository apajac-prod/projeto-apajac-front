"use client";

import { getCarsDetailsById } from "@/api/endpoints";
import Loader from "@/common/loader/loader";
import FormTitle from "@/components/titles/form/form";
import Button from "@/components/ui/button";
import {
  CARS_CHILDHOOD,
  CARS_CHILDHOOD_INDEX,
  CARS_CHILDHOOD_TITLE,
} from "@/constants/cars_childhood";
import { getCarsAnwserByPoints } from "@/functions/getCarsAnwserByPoints";
import { getCarsResult } from "@/functions/getCarsResult";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import * as icon from "react-flaticons";

type Params = {
  assistidoId: string;
  carsId: string;
};

type Props = {
  params: Params;
};

type CarsData = {
  nomeAssistido: string;
  data: string;
  pontuacao: number;
  detalhes: {
    pergunta: number;
    resposta: number;
    observacoes: string;
  }[];
};

const ConsultarCarsPage = ({ params: { assistidoId, carsId } }: Props) => {
  const router = useRouter();
  const [carsData, setCarsData] = useState<CarsData | undefined>(undefined);
  useEffect(() => {
    getCarsDetailsById(carsId)
      .then((response) => {
        setCarsData(response.data);
      })
      .catch(() => router.push(`/cars/listar/${assistidoId}`));
  }, []);

  if (carsData === undefined)
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
        title={`Assistido: ${carsData.nomeAssistido}`}
        className="m-auto mt-4"
      />

      <div className="mx-auto w-fit mt-12 mb-6 p-4 outline outline-4 rounded-sm text-lg font-semibold text-center">
        <p>{`Data de realização: ${dayjs(carsData.data).format(
          "DD/MM/YYYY"
        )}`}</p>
        <p>{`Pontuação total: ${carsData.pontuacao}`}</p>
        <p>{`Resultado: ${getCarsResult(carsData.pontuacao)}`}</p>
      </div>

      {carsData.detalhes.map((questao) => (
        <div key={questao.pergunta} className="mt-8">
          <h4 className="mb-2 font-semibold text-center capitalize">
            {`${questao.pergunta}. ${
              CARS_CHILDHOOD_TITLE[questao.pergunta - 1]
            }`}
          </h4>
          <div className="bg-white px-6 py-2 rounded-md m-auto text-center leading-10 w-[90%] max-w-[600px]">
            <p className="font-semibold">
              {
                CARS_CHILDHOOD[CARS_CHILDHOOD_INDEX[questao.pergunta - 1]][
                  getCarsAnwserByPoints(questao.resposta)!
                ].title
              }
            </p>
            <p>
              {
                CARS_CHILDHOOD[CARS_CHILDHOOD_INDEX[questao.pergunta - 1]][
                  getCarsAnwserByPoints(questao.resposta)!
                ].descricao
              }
            </p>
            <p>{`Pontuação: ${questao.resposta}`}</p>

            {questao.observacoes && (
              <div className="w-[90%] resize-none bg-gray-200 rounded-sm text-center mx-auto p-1">
                <p className="mb-4">Observações</p>
                <p className="">{questao.observacoes}</p>
              </div>
            )}
          </div>
        </div>
      ))}

      <Button
        text="Voltar ao histórico Cars"
        className="block mx-auto my-12"
        onClick={() => router.push(`/cars/listar/${assistidoId}`)}
      />
    </div>
  );
};

export default ConsultarCarsPage;
