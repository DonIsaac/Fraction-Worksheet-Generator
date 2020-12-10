import type { Fraction } from './fraction'

export interface WorksheetConfig {
    operations: Array<"add" | "sub" | "mult" | "div">

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

    strategy: Strategies

    /**
     * @default false
     */
    mixedFractions?: boolean

}

export type Question =
    | Fraction
    | {
        operation: "add" | "sub" | "mult" | "div"
        left: Question
        right: Question
    }
;;

export type FractionGenerator = (digitCount: number, sign?: boolean) => Fraction;
export type FractionGeneratorFactory = (gen: () => number) => FractionGenerator;
export type Strategies = "default"
