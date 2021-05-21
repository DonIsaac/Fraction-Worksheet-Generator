import { WorksheetConfig, FractionGenerator, Operation } from "../types"
import type { Question } from "."
import { randomInt } from "../util"
import { Fraction, generators } from "../fractions"

export const generateQuestion: (args: WorksheetConfig) => Question =
    ({ // Arguments are unpacked/repacked to establish defaults
        operations = [Operation.Addition],
        strategy = "default",
        negative = false,
        range = [1, 10],
        countRange = [2, 3],
        mixedFractions = false
    }) => _genQuestion({
        operation: operations[randomInt(0, operations.length)],
        negative,
        range,
        count: randomInt(...countRange),
        gen: generators[strategy],
        mixedFractions
    })

type GenQuestionArgs = Required<Omit<WorksheetConfig, "strategy" | "countRange" | "operations">> & {
    /** The fraction factory to use */
    gen: FractionGenerator
    /** The number of fractions in the question */
    count: number
    /** Arithmetic operation for this question subsection */
    operation: Operation
}
const _genQuestion: (args: GenQuestionArgs) => Question = args => {
    const { operation, gen, negative, count, ...rest } = args
    const isNeg = negative && Math.random() < 0.5
    const left: Fraction = gen({ negative: isNeg, ...rest })

    return count <= 1
        ? left
        : {
            operation,
            left,
            right: _genQuestion({ ...args, count: count - 1 })
        } as Question
}
