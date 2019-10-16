import { run } from "./run";
import { TransitionFunction, Tape } from "./make_transition_fn";

type Definition = {
  states: { [key: string]: symbol };
  transitionFn: TransitionFunction;
  startState: symbol;
};

export class TuringMachine {
  constructor(private readonly definition: Definition) {}

  accepts(tape: string | Tape): boolean {
    if (typeof tape === 'string') {
      tape = Array.from(tape);
    }

    return run({
      tape,
      state: this.definition.startState,
      transitionFn: this.definition.transitionFn,
    });
  }

  rejects(tape: string | Tape): boolean {
    return !this.accepts(tape);
  }
}
