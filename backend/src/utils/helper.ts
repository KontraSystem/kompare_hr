export const reduceObjectArray = (
  array: { id: string; value: number }[]
): number => {
  return array
    .map((item: { id: string; value: number }) => item.value)
    .reduce((prev: number, current: number) => prev + current, 0);
};
