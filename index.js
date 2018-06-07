const { memoize, setNth, not } = require("./utils");
const { REJECT_STATE, RIGHT, LEFT, NULL } = require("./constants");

/**
 * @param {any} definition
 * @returns {boolean}
 */
function run({ tape, states, transitionFn, startState, acceptState }) {
  if (typeof tape === "string") {
    tape = Array.from(tape);
  }

  function tick({ state, position, tape }) {
    if (state === acceptState) {
      return true;
    }

    if (state === REJECT_STATE) {
      return false;
    }

    const symbol = readSymbol(position, tape);
    const { nextState, direction, nextTape } = transitionFn({
      symbol,
      state,
      position,
      tape,
    });
    const nextPosition = move(position, direction);

    return tick({ state: nextState, position: nextPosition, tape: nextTape });
  }

  return tick({ state: startState, position: 0, tape });
}

/**
 * @param {number} position
 * @param {Array<string|Symbol>} tape
 * @returns {number}
 */
function readSymbol(position, tape) {
  if (position >= tape.length) {
    return NULL;
  }

  return tape[position];
}

/**
 * @param {number}
 * @param {LEFT|RIGHT} direction
 * @returns {number}
 */
function move(position, direction) {
  switch (direction) {
    case LEFT:
      return position + 1;
    case RIGHT:
      return Math.max(position - 1, 0);
    default:
      throw new TypeError(`unrecognized direction ${direction}`);
  }
}

const TuringMachine = defn => {
  const accepts = memoize(tape => run({ tape, ...defn }));
  const rejects = not(accepts);

  return { accepts, rejects };
};

const makeTransitionFn = transitionTable => ({
  symbol,
  state,
  position,
  tape,
}) => {
  const out = transitionTable[state][symbol];
  const { nextState, direction, replacementSymbol = NULL } = out;
  const nextTape = setNth(tape, position, replacementSymbol);

  return { nextState, direction, nextTape };
};

module.exports = {
  TuringMachine,
  makeTransitionFn,
};

