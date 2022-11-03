export const moneyMask = (value: string) => {
  value = value.replace(".", "").replace(",", "").replace(/\D/g, "");

  const options = { minimumFractionDigits: 2 };
  const result = new Intl.NumberFormat("pt-BR", options).format(
    parseFloat(value) / 100
  );

  return "R$ " + result;
};
export const CELULAR = (value: string) => {
  if (!value) {
    return value;
  }

  const onlyNums = value.replace(/[^\d]/g, "");
  if (onlyNums.length <= 2) {
    return onlyNums;
  }

  if (onlyNums.length <= 7) {
    return `(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2, 7)}`;
  }

  return `(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2, 7)}-${onlyNums.slice(
    7,
    11
  )}`;
};
export const MOEDA = (value: any) => {
  if (!value) return value;

  const valor = Number(value);

  return valor.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
};
export const NUMBER_MONEY = (value: string) => {
  if (!value) {
    return value;
  }

  const onlyNums = value.replace(/[^\d]/g, "");

  if (onlyNums.length <= 2) {
    return onlyNums;
  }

  const lastNumber = onlyNums.length - 1;

  if (onlyNums.length === 3) {
    return `${onlyNums.slice(0, lastNumber)}.${onlyNums.slice(lastNumber)}`;
  }

  return `${onlyNums.slice(0, lastNumber - 1)}.${onlyNums.slice(
    lastNumber - 1,
    onlyNums.length
  )}`;
};
