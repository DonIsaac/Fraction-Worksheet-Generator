import type { Fraction } from "./fractions"

/**
 * Configuration settings set by the user and passed to question generators.
 *
 * @see Question
 * @see FractionGenerator
 */
export interface QuestionGenerationConfig {

    /**
     *
     * @default [Operation.Addition]
     */
    operations?: Operation[]

    /**
     * If false, neither the fractions in question or in the answer should
     * be negative
     *
     * @default false
     */
    negative?: boolean;

    /**
     * Range of number values that may appear in numerator/denominator.
     * @default [1,10]
     */
    range?: [min: number, max: number]

    /**
     * [min, max] number of fractions that may appear in each problem
     *
     * @default [2,2]
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
 */
export enum Operation {
    Addition = "add",
    Subtraction = "sub",
    Multiplication = "mult",
    Division = "div"
}

export type NumGenArgs = [range: [number, number]]
// export type FractionGenerator = (digitCount: number, sign?: boolean) => Fraction;
export type FractionGenerator = (
    config: Required<Pick<QuestionGenerationConfig, "negative" | "range" | "mixedFractions">>
) => Fraction
export type FractionGeneratorFactory<T extends any[] = NumGenArgs> = (
    gen: (...args: T) => number
) => FractionGenerator
export type Strategies = "default"
