const { TuringMachine, makeTransitionFn } = require("./");
const { REJECT_STATE, RIGHT, LEFT, NULL } = require("./constants");
const { not } = require("./utils");

test("{ s | s in {0, 1}*, '11' in s }", () => {
  const states = {
    q1: Symbol("q1"),
    q2: Symbol("q2"),
    q3: Symbol("q3"),
  };

  const transitionTable = {
    [states.q1]: {
      0: { nextState: states.q1, direction: LEFT },
      1: { nextState: states.q2, direction: LEFT },
      [NULL]: { nextState: REJECT_STATE, direction: LEFT },
    },
    [states.q2]: {
      0: { nextState: states.q1, direction: LEFT },
      1: { nextState: states.q3, direction: LEFT },
      [NULL]: { nextState: REJECT_STATE, direction: LEFT },
    },
    [states.q3]: {
      0: { nextState: states.q1, direction: LEFT },
      1: { nextState: states.q3, direction: LEFT },
      [NULL]: { nextState: REJECT_STATE, direction: LEFT },
    },
  };

  const defn = {
    transitionFn: makeTransitionFn(transitionTable),
    startState: states.q1,
    acceptState: states.q3,
    states,
  };

  const tm = TuringMachine(defn);

  const tests = [
    { input: "", output: false },
    { input: "00", output: false },
    { input: "11", output: true },
    { input: "011", output: true },
    { input: "0101", output: false },
  ];

  tests.forEach(test => {
    expect(tm.accepts(test.input)).toBe(test.output);
    expect(tm.accepts(test.input)).toBe(not(tm.rejects)(test.input));
  });
});


test("{ 0^n1^m | n > m }", () => {
  const states = {
    q1: Symbol("q1"),
    q2: Symbol("q2"),
    q3: Symbol("q3"),
  };

  const transitionTable = {
    [states.q1]: {
      0: { nextState: states.q1, direction: LEFT },
      1: { nextState: states.q2, direction: LEFT },
      [NULL]: { nextState: REJECT_STATE, direction: LEFT },
    },
    [states.q2]: {
      0: { nextState: states.q1, direction: LEFT },
      1: { nextState: states.q3, direction: LEFT },
      [NULL]: { nextState: REJECT_STATE, direction: LEFT },
    },
    [states.q3]: {
      0: { nextState: states.q1, direction: LEFT },
      1: { nextState: states.q3, direction: LEFT },
      [NULL]: { nextState: REJECT_STATE, direction: LEFT },
    },
  };

  const defn = {
    transitionFn: makeTransitionFn(transitionTable),
    startState: states.q1,
    acceptState: states.q3,
    states,
  };

  const tm = TuringMachine(defn);

  const tests = [
    { input: "", output: false },
  ];

  tests.forEach(test => {
    expect(tm.accepts(test.input)).toBe(test.output);
    expect(tm.accepts(test.input)).toBe(not(tm.rejects)(test.input));
  });
});

