import {run} from './run'
import {setNth} from './set_nth'
import {NULL, Direction} from './constants'
import {UnreachableError} from './unreachable_error'

export type TapeSymbol = string | symbol
export type Tape = Array<TapeSymbol>

type Transition = [symbol, Direction, TapeSymbol]
type TransitionPartial = Transition | [symbol, Direction] | [symbol]

export type TransitionTable = {
  [key: string]: {[key: string]: TransitionPartial}
}

export type TransitionFunction = (a: TransitionFnArgs) => TransitionFnResult

type TransitionFnArgs = {
  symbol: TapeSymbol
  state: symbol
  position: number
  tape: Tape
}

type TransitionFnResult = {
  nextState: symbol
  direction: Direction
  nextTape: Tape
}

type Definition = {
  states: {[key: string]: symbol}
  transitionFn: TransitionFunction
  startState: symbol
}

export class TuringMachine {
  constructor(private readonly definition: Definition) {}

  static makeTransitionFn(table: TransitionTable): TransitionFunction {
    return ({symbol, state, position, tape}) => {
      const transition = table[state as any][symbol as any] // typescript doesn't allow symbol indexing
      const [
        nextState,
        direction,
        replacementSymbol,
      ] = TuringMachine.withTransitionDefaults(transition)
      const nextTape = setNth(tape, position, replacementSymbol)
      return {nextState, direction, nextTape}
    }
  }

  /**
   * Allows shorthand transition definitions
   */
  private static withTransitionDefaults(
    transition: TransitionPartial,
  ): Transition {
    switch (transition.length) {
      case 1:
        return [transition[0], Direction.RIGHT, NULL]

      case 2:
        return [transition[0], transition[1], NULL]

      case 3:
        return transition

      default:
        throw new UnreachableError(transition)
    }
  }

  accepts(tape: string | Tape): boolean {
    if (typeof tape === 'string') {
      tape = Array.from(tape)
    }

    return run({
      tape,
      state: this.definition.startState,
      transitionFn: this.definition.transitionFn,
    })
  }

  rejects(tape: string | Tape): boolean {
    return !this.accepts(tape)
  }
}
