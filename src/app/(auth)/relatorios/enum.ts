import { getKeyByValue } from "@/functions/getKeyByValue";

export enum ChartsNames {
  chartTotalPorSexo = "Distribuição por Sexo",
  chartTotalPorIdade = "Total por idade",
  chartFaixaEtaria = "Distribuição por idade",
  chartAtivosInativos = "Ativos e Inativos",
}

export enum MONTHS {
  Janeiro = 1,
  Fevereiro,
  Marco,
  Abril,
  Maio,
  Junho,
  Julho,
  Agosto,
  Setembro,
  Outubro,
  Novembro,
  Dezembro,
}

export enum MONTH_NAMES {
  Janeiro = "Janeiro",
  Fevereiro = "Fevereiro",
  Marco = "Março",
  Abril = "Abril",
  Maio = "Maio",
  Junho = "Junho",
  Julho = "Julho",
  Agosto = "Agosto",
  Setembro = "Setembro",
  Outubro = "Outubro",
  Novembro = "Novembro",
  Dezembro = "Dezembro",
}

export const getMonthNumberFromName = (
  nomeMes: MONTH_NAMES
): number | undefined => {
  const key = getKeyByValue(MONTH_NAMES, nomeMes);
  return MONTHS[key];
};

export const getMonthNameFromNumber = (
  monthNumber: number
): string | undefined => {
  const key = Object.keys(MONTHS).find(
    (k) => MONTHS[k as keyof typeof MONTHS] === monthNumber
  ) as keyof typeof MONTH_NAMES;

  return key ? MONTH_NAMES[key] : undefined;
};
