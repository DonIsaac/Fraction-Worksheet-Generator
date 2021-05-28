import { Operation } from "./types"

/**
 * Finds the greatest common divisor between two numbers
 *
 * @param a
 * @param b
 *
 * @see {@link https://en.wikipedia.org/wiki/Euclidean_algorithm Euclid's Algorithm}
 */
export const gcd = (a: number, b: number): number =>
    b <= 0
        ? a
        : gcd(b, a % b)

/**
 * Finds the least common multiple (LCM) for two numbers.
 *
 * @param a
 * @param b
 *
 * @see {@link https://artofproblemsolving.com/wiki/index.php/Least_common_multiple}
 */
export const lcm = (a: number, b: number): number => a * b / gcd(a, b)

/**
 * Multiplies a decimal by 10 until it is an integer
 *
 * ```ts
 * floatToInt(1.5) // => [15, 10]
 * floatToInt(7) // => [7, 1]
 * floatToInt(3.14) // => [314, 100]
 * ```
 * @param num
 * @param scale Used for recursive calls. Do not use this.
 */
export const floatToInt = (num: number, scale = 1): [number, number] =>
    Number.isInteger(num) && (num < Number.MAX_VALUE / 100)
        ? [num, scale]
        : floatToInt(num * 10, scale * 10)

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


/**
 * Calls a function a certain number of times
 * @param n the number of iterations
 */
export const times = (n: number) => <T>(fn: (i: number) => T): T[] => (
    n = Math.max(n, 0),
    Array(n).fill(n).map((_, i) => fn(i))
)

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
    switch (op) {
        case Operation.Addition: return "+"
        case Operation.Subtraction: return "-"
        case Operation.Multiplication: return "\u00d7"
        case Operation.Division: return "\u00f7"
    }
}

/**
 * Zips two arrays into one array where each element is a pair of values from the
 * first and the second arrays. Only supposed to be called on arrays of equal length.
 *
 * @param a first array
 * @param b second array
 * @returns array of pairs of values from the two arrays
 */
export const zip = <A, B>(a: A[], b: B[]): [A, B][] => a.map((a, i) => [a, b[i]])
