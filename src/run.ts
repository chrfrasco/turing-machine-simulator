import { ACCEPT_STATE, REJECT_STATE, RIGHT, LEFT, NULL } from "./constants";

export function run({
  state,
  position = 0,
  tape,
  transitionFn
}: {
  state: symbol;
  position?: number;
  tape: Tape;
  transitionFn: TransitionFunction;
}): boolean {
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

  return run({
    state: nextState,
    position: nextPosition,
    tape: nextTape,
    transitionFn
  });
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
