import { run } from "./run";
import { not } from "./utils";

export function TuringMachine(defn: Definition) {
  function accepts(tape: string | Tape): boolean {
    if (typeof tape === "string") {
      tape = Array.from(tape);
    }

    return run({
      tape,
      state: defn.startState,
      transitionFn: defn.transitionFn
    });
  }

  const rejects = not(accepts);

  return { accepts, rejects };
}
