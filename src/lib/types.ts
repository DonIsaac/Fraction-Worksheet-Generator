import type { Fraction } from "./fractions"

/**
 * Configuration settings set by the user and passed to question generators.
 *
 * @see Question
 * @see FractionGenerator
 */
export interface WorksheetConfig {

    /**
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
     * [min, max] values that may appear in numerator/denominator
     *
     * @default [1,10]
     */
    range?: [number, number]

    /**
     * [min, max] number of fractions that may appear in each problem
     *
     * @default [2,2]
     */
    countRange?: [number, number]

    /**
     * @default "default"
     */
    strategy?: Strategies

    /**
     * @default false
     */
    mixedFractions?: boolean

}

export enum Operation {
    Addition = "add",
    Subtraction = "sub",
    Multiplication = "mult",
    Division = "div"
}

export type NumGenArgs = [range: [number, number]]
// export type FractionGenerator = (digitCount: number, sign?: boolean) => Fraction;
export type FractionGenerator = (
    config: Required<Pick<WorksheetConfig, "negative" | "range" | "mixedFractions">>
) => Fraction
export type FractionGeneratorFactory<T extends any[] = NumGenArgs> = (
    gen: (...args: T) => number
) => FractionGenerator
export type Strategies = "default"
