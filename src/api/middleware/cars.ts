export function carsToApi(
  assistidoId: string,
  pontuacao: number | undefined,
  cars: Array<number | undefined>
) {
  const carsApi = cars.map((value, index) => {
    return {
      pergunta: index + 1,
      resposta: value,
    };
  });

  return {
    id: assistidoId,
    pontuacao: pontuacao,
    cars: carsApi,
  };
}
