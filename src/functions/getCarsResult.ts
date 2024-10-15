export const getCarsResult = (pontos: number | undefined) => {
  if (pontos === undefined)
    return "Responda todas as questões para ter o resultado final.";
  if (pontos <= 30) return "Sem autismo";
  if (pontos <= 36) return "Autismo leve-moderado";
  return "Autismo grave";
};
