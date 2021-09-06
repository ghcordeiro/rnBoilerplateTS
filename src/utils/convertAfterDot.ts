export default (value: number, decimal?: number) => {
  if (decimal) {
    return value.toFixed(decimal);
  }
  return value;
};
