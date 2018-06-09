export function setNth<T>(arr: T[], idx: number, val: T): T[] {
  const arrCopy = [...arr];
  arrCopy[idx] = val;
  return arrCopy;
}

export function not<T>(fn: (...args: any[]) => boolean) {
  return (...args: any[]) => !fn(...args);
}
