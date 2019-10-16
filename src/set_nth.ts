export function setNth<T>(arr: T[], idx: number, val: T): T[] {
  const arrCopy = [...arr];
  arrCopy[idx] = val;
  return arrCopy;
}
