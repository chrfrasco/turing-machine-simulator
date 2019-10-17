import {Direction, ACCEPT_STATE, REJECT_STATE, NULL} from './constants'
import {Tape, TransitionFunction, TapeSymbol} from './turing_machine'
import {UnreachableError} from './unreachable_error'

export function run({
  state,
  position = 0,
  tape,
  transitionFn,
}: {
  state: symbol
  position?: number
  tape: Tape
  transitionFn: TransitionFunction
}): boolean {
  if (state === ACCEPT_STATE) {
    return true
  }

  if (state === REJECT_STATE) {
    return false
  }

  const symbol = readSymbol(position, tape)
  const {nextState, direction, nextTape} = transitionFn({
    symbol,
    state,
    position,
    tape,
  })
  const nextPosition = move(position, direction)

  return run({
    state: nextState,
    position: nextPosition,
    tape: nextTape,
    transitionFn,
  })
}

function readSymbol(position: number, tape: Tape): TapeSymbol {
  if (position >= tape.length) {
    return NULL
  }

  return tape[position]
}

function move(position: number, direction: Direction): number {
  switch (direction) {
    case Direction.LEFT:
      return Math.max(position - 1, 0)
    case Direction.RIGHT:
      return position + 1
    default:
      throw new UnreachableError(direction)
  }
}
