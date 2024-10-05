import { MchatDataResponse } from "@/app/(auth)/mchat/listar/[assistidoId]/id/[mchatId]/page"
import { mchatFormDataToArray } from "./Utils"
import { mchatFormData } from "./Constants"

type Props = {
  mchatDataArray?: ReturnType<typeof mchatFormDataToArray>,
  mchatDataResponse?: MchatDataResponse
  handleAnwserChange?: (index: number, newValue: boolean) => void
}

export const MchatQuestions = ({ mchatDataArray, mchatDataResponse, handleAnwserChange }: Props) => {
  
  if (mchatDataArray) return (
    <main className="flex flex-col gap-6">
      {mchatDataArray.map((question) => (
        <div key={question.index} className="mx-auto flex gap-3 *:bg-white *:p-1 *:content-center *:align-middle *:rounded-md items-center max-w-[1000px] w-full">
          <p className="max-h-[1.5rem]">{question.index}</p>
          <p className="flex-1">{question.pergunta }</p>
          <button type="button" className={`max-h-[1.5rem] ${question.resposta && "!bg-blue-600 text-white"}`} onClick={() => handleAnwserChange && handleAnwserChange(question.index, true)}>Sim</button>
          <button type="button" className={`max-h-[1.5rem] ${question.resposta === false && "!bg-blue-600 text-white"}`} onClick={() => handleAnwserChange && handleAnwserChange(question.index, false)}>Não</button>
        </div>
      ))}
    </main>
  )

  if (mchatDataResponse) return (
    <main className="flex flex-col gap-6">
      {mchatDataResponse.detalhes.map((question) => (
        <div key={question.pergunta} className="mx-auto flex gap-3 *:bg-white *:p-1 *:content-center *:align-middle *:rounded-md items-center max-w-[1000px] w-full">
          <p className="max-h-[1.5rem]">{question.pergunta}</p>
          <p className="flex-1">{mchatFormData.get(question.pergunta)?.pergunta}</p>
          <button type="button" className={`max-h-[1.5rem] ${question.resposta && "!bg-blue-600 text-white"} cursor-not-allowed`} disabled>Sim</button>
          <button type="button" className={`max-h-[1.5rem] ${question.resposta === false && "!bg-blue-600 text-white"} cursor-not-allowed`} disabled>Não</button>
        </div>
      ))}
    </main>
  )
}