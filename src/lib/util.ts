import { Operation } from "./types"

/**
 * Generates a random integer between `min` (inclusive) and `max` (exclusive).
 *
 * @param min G
 * @param max
 *
 * @throws if `max` is not strictly greater than `min`
 * @returns the generated int
 */
export const randomInt = (min: number, max: number): number =>
    max > min
        ? Math.floor(Math.random() * (max - min)) + min
        : raise(new RangeError("Range max must be greater than the min"))

export const times = (n: number) => (fn: (i: number) => any) =>
    Array(n).fill(n).forEach((_, i) => fn(i))

/**
 * Throws an error.
 *
 * @param err The error to throw, or an error message (which is passed to a new Error)
 */
export const raise = (err: Error | string): never => {
    if (typeof err === "string") {
        err = new Error(err)
        // Don't include throws() in the stack trace
        Error.captureStackTrace(err, raise)
    }

    throw err
}

export const symbolFor = (op: Operation): string => {
    switch(op) {
        case Operation.Addition:       return "+"
        case Operation.Subtraction:    return "-"
        case Operation.Multiplication: return "\u00d7"
        case Operation.Division:       return "\u00f7"
    }
}
