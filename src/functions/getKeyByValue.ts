export const getKeyByValue = <T extends { [key: string]: string }>(
  enumObj: T,
  value: string
): keyof T => {
  return Object.keys(enumObj).find((key) => enumObj[key] === value) as keyof T;
};
