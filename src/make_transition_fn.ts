import { setNth } from "./utils";
import { RIGHT, NULL } from "./constants";

export type TapeSymbol = string | symbol;
export type Tape = Array<TapeSymbol>;

type Transition = [symbol, symbol, TapeSymbol];
type TransitionPartial = Transition | [symbol, symbol] | [symbol];

export type TransitionTable = {
  [key: string]: { [key: string]: TransitionPartial };
};

export type TransitionFunction = (a: TransitionFnArgs) => TransitionFnResult;

type TransitionFnArgs = {
  symbol: TapeSymbol;
  state: symbol;
  position: number;
  tape: Tape;
};

type TransitionFnResult = {
  nextState: symbol;
  direction: symbol;
  nextTape: Tape;
};

export function makeTransitionFn(table: TransitionTable): TransitionFunction {
  return ({ symbol, state, position, tape }) => {
    const transition = table[state as any][symbol as any]; // typescript doesn't allow symbol indexing
    const [nextState, direction, replacementSymbol] = withTransitionDefaults(transition);
    const nextTape = setNth(tape, position, replacementSymbol);
    return { nextState, direction, nextTape };
  };
}

/**
 * Allows shorthand transition definitions
 */
function withTransitionDefaults(transition: TransitionPartial): Transition {
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
