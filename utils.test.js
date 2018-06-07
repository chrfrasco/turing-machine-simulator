const { setNth, memoize } = require("./utils");

test("setNth", () => {
  const arr = [1, 2, 3];
  expect(setNth(arr, 0, -1)).toEqual([-1, 2, 3]);
  expect(arr).toEqual([1, 2, 3]);
})

test("memoize", () => {
  let calls = 0;
  const addWithMutate = memoize((a, b) => {
    calls++;
    return a + b;
  });
  
  expect(addWithMutate(1, 1)).toBe(2);
  expect(addWithMutate(1, 1)).toBe(2);
  expect(calls).toBe(1);
});

