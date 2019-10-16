import { setNth } from "./set_nth";

test("setNth", () => {
  const arr = [1, 2, 3];
  expect(setNth(arr, 0, -1)).toEqual([-1, 2, 3]);
  expect(arr).toEqual([1, 2, 3]);
});
