import { Fraction, Nullable } from "../../lib"
import { FractionInputMode, RawFractionInput } from "./types"

const VALID_INT_REGEX = /^-?[0-9]+$/
const VALID_POSITIVE_INT_REGEX = /^[0-9]+$/

/**
 * User numerator/denominator input check. Both must be ints, denominator must
 * be strictly positive.
 *
 * @private exported for testing
 *
 * @param n numerator value from input field.
 * @param d denominator value from input field.
 *
 * @returns an error message if invalid and a falsy value if valid
 */
export const invalidFrac = (n: string, d: string): string | false =>
    (!n.length
        && "Answer is incomplete") ||
    (!d.length
        && "Answer is incomplete") ||
    (!VALID_INT_REGEX.test(n)
        && "Numerator must be a whole number") ||
    (!VALID_POSITIVE_INT_REGEX.test(d)
        && "Denominator must be a strictly positive whole number") ||
    ((d as unknown) == 0 // Better than 'd === "0"' cuz "000" is still 0.
        && "Denominator cannot be zero")

export const userInputToFraction = (
    numerator: string,
    denominator: string
): Fraction | string => (
    invalidFrac(numerator, denominator) ||
    new Fraction(Number.parseInt(numerator), Number.parseInt(denominator))
)


type GetDisplayModeArgs = {
    isDone: boolean
    isCorrect: boolean
    userSolution: Nullable<Fraction> | RawFractionInput
}

/**
 * Computes the appropriate FractionInput display mode from a subset of
 * worksheet state.
 *
 * @param args
 */
export const getDisplayMode = (
    { isDone, isCorrect, userSolution }: GetDisplayModeArgs
): FractionInputMode  => {
    if (!isDone) {
        return "input"
    } else if (isCorrect) {
        return "correct"
    }

    if (userSolution instanceof Array) {
        const f = userInputToFraction(...userSolution)
        return f instanceof String ? "incomplete": "incorrect"
    } else {
        return userSolution ? "incorrect": "incomplete"
    }
}
