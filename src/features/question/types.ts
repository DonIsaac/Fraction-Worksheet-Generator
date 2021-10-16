import { FractionGeneratorOpts } from "./fraction"

/**
 * Configuration settings set by the user and passed to question generators.
 *
 * @see Question
 * @see FractionGeneratorOpts
 */
export interface QuestionGenerationConfig extends Partial<FractionGeneratorOpts> {

    /**
     * Possible operations that questions may use.
     *
     * @default [Operation.Addition]
     */
    operations: Operation[]

    /**
     * [min, max] number of fractions that may appear in each problem
     *
     * @default [2,3]
     */
    countRange?: [min: number, max: number]
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
