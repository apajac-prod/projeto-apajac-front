"use client";

import FormTitle from "@/components/titles/form/form";
import { useCallback, useMemo, useState } from "react";
import * as icon from "react-flaticons";
import { mchatFormData } from "./Constants";
import Button from "@/components/ui/custom-button";
import { useRouter } from "next/navigation";
import {
  getMchatResultString,
  mchatFormDataToArray,
  prepareMchatData,
} from "./Utils";
import { createMchat } from "@/api/endpoints";
import { MchatQuestions } from "./mchatQuestions";

type Props = {
  assistidoId: string;
};

export const Mchat = ({ assistidoId }: Props) => {
  const router = useRouter();
  const [mchatData, setMchatData] = useState(mchatFormData);
  const questionArray = useMemo(
    () => mchatFormDataToArray(mchatData),
    [mchatData]
  );

  const isCompleted = useCallback(() => {
    return !questionArray.find((question) => question.resposta === undefined);
  }, [mchatData]);

  const handleAnwserChange = (questionIndex: number, anwser: boolean) => {
    setMchatData((actualMchatdata) => {
      actualMchatdata.set(questionIndex, {
        ...actualMchatdata.get(questionIndex)!,
        resposta: anwser,
      });
      return new Map(actualMchatdata);
    });
  };

  const handleSave = () => {
    const data = prepareMchatData(assistidoId, mchatData);
    createMchat(data).then(() => router.push("/menu"));
  };

  return (
    <div className="p-6">
      <FormTitle
        title={"Modified Checklist for Autism in Toddlers (M-CHAT)"}
        Icon={icon.Document}
        className="m-auto mt-6"
      />

      <header className="mx-auto rounded-md px-6 text-center flex p-6 bg-[#2E5994] text-lg text-white flex-col gap-4 my-6 max-w-[1000px]">
        <h1>
          {
            "Preencha este questionário sobre o comportamento usual da criança. \
        Responda a todas as questões. Se o comportamento descrito for raro \
        (ex. foi observado uma ou duas vezes), responda como se a criança não o apresente."
          }
        </h1>
        <p>{'Selecione "Sim" ou "Não" para cada pergunta.'}</p>
      </header>

      <MchatQuestions
        mchatDataArray={questionArray}
        handleAnwserChange={handleAnwserChange}
      />

      <div className="mt-6 max-w-[600px] px-2 py-6 bg-blue-900 m-auto flex flex-col justify-center items-center rounded-md">
        {!isCompleted() ? (
          <p className="text-lg text-white text-center">
            {"Responda todas as questões para obter um resultado."}
          </p>
        ) : (
          <>
            <p className="text-lg text-white uppercase mb-4">{"resultado"}</p>
            <p className="text-lg text-white text-center">
              {getMchatResultString(mchatData)}
            </p>
          </>
        )}
      </div>

      <nav className="mx-auto flex w-11/12 max-w-[600px] mb-16 mt-10">
        <Button
          text={"Voltar ao menu"}
          type="button"
          onClick={() => router.push("/menu")}
          className="mr-auto"
        />
        <Button
          text={"Finalizar e salvar"}
          type="button"
          disabled={!isCompleted()}
          onClick={handleSave}
          className="ml-auto"
        />
      </nav>
    </div>
  );
};
