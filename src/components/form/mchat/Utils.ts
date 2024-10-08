import { MchatFormData } from "./Constants";

export const mchatFormDataToArray = (mchatFormData: MchatFormData) => Array.from(mchatFormData, ([key, { pergunta, resposta }]) => {
  return {index: key, pergunta, resposta}
});

export const calculateMchatResultPea = (mchatFormData: MchatFormData) => {
  let resultPoints = 0;
  mchatFormData.forEach((step) => {
    if (step.resposta == step.gabarito) resultPoints += step.peso;
  });
  if(resultPoints >= 4) return true;
  return false;
}

export const getMchatResultString = (mchatFormData: MchatFormData) => {
  const pea = calculateMchatResultPea(mchatFormData);
  if(pea) return "É necessário buscar uma avaliação formal por técnicos de neurodesenvolvimento.";
  return "O resultado está dentro do esperado, não sendo necessária avaliação formal.";
}

export const prepareMchatData = (assistidoId: string, mchatFormData: MchatFormData) => {
  return {
    id: assistidoId,
    pea: calculateMchatResultPea(mchatFormData),
    mchat: mchatFormDataToArray(mchatFormData).map(step => ({pergunta: step.index, resposta: step.resposta}))
  }
}

export const peaToString = (pea: boolean) => {
  if (!!pea) return "Necessário buscar uma avaliação formal por técnicos de neurodesenvolvimento.";
  return "Não é necessário avaliação formal.";
}