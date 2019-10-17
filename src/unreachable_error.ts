export class UnreachableError extends Error {
  constructor(x: never) {
    super(`unhandled case: ${JSON.stringify(x)}`)
  }
}
