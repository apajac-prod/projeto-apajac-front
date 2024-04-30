export function unmaskPhone(phone: string): string {
    return phone
      .replace("(", "")
      .replace(")", "")
      .replace("-", "")
      .replaceAll("_", "")
      .replaceAll(" ", "");
  }
  
export function unmaskCep(cep: string): string {
  if (cep != "") {
    return cep.replace("-", "").replaceAll("_", "");
  }
  return ""
}

export function unmaskMoney(money: string): string {
  if (money != "" && typeof money == "string" ) {
    return money.replace("R$", "").replace(" ", "").replace(",", ".");
  }
  return ""
}