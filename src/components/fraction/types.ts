
/**
 * The various display and input states a `FractionInput` component may be in.
 * Controls if the user can input answers and what solution info is displayed.
 *
 * The possible modes are:
 *
 * - `input`:
 *   User is actively working on the worksheet. User may insert their answer
 *   into the input fields.
 *
 * - `correct`:
 *   User finished working and got the answer right. Input is disabled, and
 *   visual feedback is displayed to tell them they got it right.
 *
 * - `incorrect`:
 *   User finished working and got the answer wrong. Input is disabled and
 *   visual feedback is displayed to tell them they got the question wrong.
 *
 * - `incomplete`:
 *   User didn't answer the question. Input is disabled, and the field is
 *   treated as if it were incorrect.
 *
 * @see FractionInput
 */
export type FractionInputMode = "input" | "correct" | "incorrect" | "incomplete"
export type FractionInputEventHandler = (field: "numerator" | "denominator", val: string) => void

/**
 * A Fraction numerator and denominator as taken right from the user via an
 * input field (e.g. FractionInput) before any processing or validation has
 * occurred.
 */
export type RawFractionInput = [numerator: string, denominator: string]
