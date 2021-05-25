import { Fraction } from "../fractions"
import { Operation } from "../types"

/**
 * A practice problem for the user to solve. Questions are generated by the
 * desired generator function selected by the user.
 *
 * @see FractionGenerator
 */
export type Question =
    | Fraction
    | {
        operation: Operation
        left: Fraction
        right: Question
    }
    ;;

export interface SolveQuestionOpts {
    /** Whether or not to simplify the solution. Defaults to `false`. */
    simplify?: boolean
}
/**
 * Calculates the solution to a Question.
 *
 * @param q     the question to solve.
 * @param opts  options to tweak solution behavior
 *
 * @returns     the solution to the Question.
 */
export function solveQuestion(q: Question, opts: SolveQuestionOpts = {}): Fraction {
    const { simplify = false } = opts

    if (q instanceof Fraction) {
        return simplify ? q.simplify() : q
    }

    const { operation , left, right } = q

    switch (operation) {
        case Operation.Addition:
            return solveQuestion(left, opts).add(solveQuestion(right, opts))
        case Operation.Subtraction:
            return solveQuestion(left, opts).sub(solveQuestion(right, opts))
        case Operation.Multiplication:
            return solveQuestion(left, opts).mult(solveQuestion(right, opts))
        case Operation.Division:
            return solveQuestion(left, opts).div(solveQuestion(right, opts))
    }
}