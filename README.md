# turing-machine-simulator

Stateless, functional turing machine simulator.

API subject to massive changes.

## Usage

You will need to define a definition object to construct a Turing Machine. The TM exposes `accepts` and `rejects` methods, which return true or false on string inputs.

Here's an example for the language consisting of strings that contain the substring `11` over the alphabet `{ 0, 1 }`:

```javascript
const { TuringMachine, newTransitionFunction } = require("./");
const { NULL, REJECT_STATE, LEFT, RIGHT } = require("./constants");

const states = {
  q1: Symbol("q1"),
  q2: Symbol("q2"),
  q3: Symbol("q3"),
};

const transitionTable = {
  [states.q1]: {
    0: [ states.q1, RIGHT ],
    1: [ states.q2, RIGHT ],
    [NULL]: [ REJECT_STATE, RIGHT ],
  },
  [states.q2]: {
    0: [ states.q1, RIGHT ],
    1: [ states.q3, RIGHT ],
    [NULL]: [ REJECT_STATE, RIGHT ],
  },
  [states.q3]: {
    0: [ states.q1, RIGHT ],
    1: [ states.q3, RIGHT ],
    [NULL]: [ REJECT_STATE, RIGHT ],
  },
};

const defn = {
  transitionFn: makeTransitionFn(transitionTable),
  startState: states.q1,
  acceptState: states.q3,
  states,
};

const tm = TuringMachine(defn);
tm.accepts("11") // true
```

There are a few more examples in `index.test.js`.
