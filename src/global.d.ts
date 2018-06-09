declare type TapeSymbol = string | symbol;
declare type Tape = Array<TapeSymbol>;

/** TURING MACHINE DEFINITION */

declare interface Definition {
  states: { [key: string]: symbol };
  transitionFn: TransitionFunction;
  startState: symbol;
}

/** TRANSITION TABLE */

declare interface TransitionTable {
  [key: string]: { [key: string]: TransitionPartial };
}

type Transition = [symbol, symbol, TapeSymbol];
type TransitionPartial = Transition | [symbol, symbol] | [symbol];

/** TRANSITION FUNCTION TYPES */

declare type TransitionFunction = (a: TransitionFnArgs) => TransitionFnResult;

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
