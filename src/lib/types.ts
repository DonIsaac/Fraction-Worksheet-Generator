import type { Fraction } from "./fractions"

/**
 * Configuration settings set by the user and passed to question generators.
 *
 * @see Question
 * @see FractionGenerator
 */
export interface QuestionGenerationConfig {

    /**
     * Possible operations that questions may use.
     *
     * @default [Operation.Addition]
     */
    operations: Operation[]

    /**
     * If false, neither the fractions in question or in the answer should
     * be negative
     *
     * @default false
     */
    negative?: boolean;

    /**
     * Range of number values that may appear in numerator/denominator.
     *
     * @default [1,10]
     */
    range?: [min: number, max: number]

    /**
     * [min, max] number of fractions that may appear in each problem
     *
     * @default [2,3]
     */
    countRange?: [min: number, max: number]

    /**
     * Question generation strategy.
     *
     * @default "default"
     */
    strategy?: Strategies

    /**
     * Whether questions will include mixed fractions. If `false`, all
     * fraction numerators will be less than or equal to their denominators.
     *
     * @default false
     */
    mixedFractions?: boolean

}

/**
 * Available operations in questions.
 *
 * @see Question
 */
export enum Operation {
    Addition = "add",
    Subtraction = "sub",
    Multiplication = "mult",
    Division = "div"
}

export type NumGenArgs = [range: [number, number]]

/**
 * A function that creates a random fraction.
 */
export type FractionGenerator = (
    config: Required<Pick<QuestionGenerationConfig, "negative" | "range" | "mixedFractions">>
) => Fraction

/**
 * Factory function for fraction generators.
 *
 * @see FractionGenerator
 */
export type FractionGeneratorFactory<T extends any[] = NumGenArgs> = (
    gen: (...args: T) => number
) => FractionGenerator
export type Strategies = "default"

/** Lets `T` be nullish. */
export type Nullable<T> = T | null | undefined
