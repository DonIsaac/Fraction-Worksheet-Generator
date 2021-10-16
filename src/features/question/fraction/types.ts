
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

/**
 * An event handler function for a fraction input component. Called each time
 * the input value changes.
 *
 * @param field Which part of the fraction was updated
 * @param val   The new value of `field`
 */
export type FractionInputEventHandler = (field: "numerator" | "denominator", val: string) => void

/**
 * A Fraction numerator and denominator as taken right from the user via an
 * input field (e.g. FractionInput) before any processing or validation has
 * occurred.
 */
export type RawFractionInput = [numerator: string, denominator: string]

export type FractionGeneratorOpts = {

    /**
     * If false, neither the fractions in question or in the answer should
     * be negative
     *
     */
    negative: boolean;

    /**
     * Range of number values that may appear in numerator/denominator.
     *
     */
    range: [min: number, max: number]

    /**
     * Whether questions will include mixed fractions. If `false`, all
     * fraction numerators will be less than or equal to their denominators.
     *
     */
    mixedFractions: boolean

    /**
     * Fraction generation strategy.
     *
     * @default "default"
     */
    strategy?: Strategies
}

/**
 * Factory function for fraction generators.
 *
 * @see FractionGenerator
 */
// export type FractionGeneratorFactory<T extends any[] = NumGenArgs> = (
//     gen: (...args: T) => number
// ) => FractionGenerator
export type Strategies = "default"
