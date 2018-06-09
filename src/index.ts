import { setNth, not } from "./utils";
import { ACCEPT_STATE, REJECT_STATE, RIGHT, LEFT, NULL } from "./constants";

export type TapeSymbol = string | symbol;
export type Tape = Array<TapeSymbol>;

interface Definition {
  states: { [key: string]: symbol };
  transitionFn: TransitionFunction;
  startState: symbol;
}

interface TickArgs {
  state: symbol;
  position: number;
  tape: Tape;
}

function run({
  tape,
  states,
  transitionFn,
  startState
}: Definition & { tape: Tape }) {
  function tick({ state, position, tape }: TickArgs): boolean {
    if (state === ACCEPT_STATE) {
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
      tape
    });
    const nextPosition = move(position, direction);

    return tick({ state: nextState, position: nextPosition, tape: nextTape });
  }

  return tick({ state: startState, position: 0, tape });
}

function readSymbol(position: number, tape: Tape): TapeSymbol {
  if (position >= tape.length) {
    return NULL;
  }

  return tape[position];
}

function move(position: number, direction: symbol): number {
  switch (direction) {
    case LEFT:
      return Math.max(position - 1, 0);
    case RIGHT:
      return position + 1;
    default:
      throw new TypeError(`unrecognized direction ${direction.toString()}`);
  }
}

export function TuringMachine(defn: Definition) {
  function accepts(tape: string | Tape): boolean {
    if (typeof tape === "string") {
      tape = Array.from(tape);
    }

    return run({ tape, ...defn });
  }

  const rejects = not(accepts);

  return { accepts, rejects };
}

interface TransitionFnArgs {
  symbol: TapeSymbol;
  state: symbol;
  position: number;
  tape: Tape;
}

interface TransitionFnResult {
  nextState: symbol;
  direction: symbol;
  nextTape: Tape;
}

type Transition = [symbol, symbol, TapeSymbol];
type TransitionPartial = Transition | [symbol, symbol] | [symbol];

interface TransitionTable {
  [key: string]: { [key: string]: TransitionPartial };
}

type TransitionFunction = (a: TransitionFnArgs) => TransitionFnResult;

export function makeTransitionFn(
  transitionTable: TransitionTable
): TransitionFunction {
  return ({ symbol, state, position, tape }) => {
    const out = transitionTable[state as any][symbol as any]; // typescript doesn't allow symbol indexing
    const [nextState, direction, replacementSymbol] = withDefaults(out);
    const nextTape = setNth(tape, position, replacementSymbol);

    return { nextState, direction, nextTape };
  };
}

function withDefaults(transition: TransitionPartial): Transition {
  switch (transition.length) {
    case 1:
      return [transition[0], RIGHT, NULL]
  
    case 2:
      return [transition[0], transition[1], NULL];

    case 3:
      return transition;
    
    default:
      throw TypeError();
  }
}
