import { setNth } from "./utils";
import { RIGHT, NULL } from "./constants";

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
