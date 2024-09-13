export function carsToApi(
  assistidoId: string,
  pontuacaoTotal: number | undefined,
  cars: Array<number | undefined>,
  observacoes: Array<string | undefined>
) {
  const carsApi = cars.map((value, index) => {
    return {
      pergunta: index + 1,
      resposta: value,
      observacoes: observacoes[index] ?? null,
    };
  });

  return {
    id: assistidoId,
    pontuacao: pontuacaoTotal,
    cars: carsApi,
  };
}
