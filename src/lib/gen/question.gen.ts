import { WorksheetConfig, Question, FractionGenerator, Operation } from "../types"
import { generators } from "./fraction.gen"
import { randomInt } from "../util"
import type { Fraction } from "../fractions"

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
    gen: FractionGenerator
    count: number
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

//     if (countRange[0] < 1) {
//         throw new RangeError("Cannot have fewer than two fractions per question")
//     } else if (countRange[1] < countRange[0]) {
//         throw new RangeError("Range max must be greater than the range min")
//     }

//     /** Number of fractions in the question */
//     const count = randomInt(...countRange)
//     // const count = 2
//     /** The fraction generator function for the given strategy */
//     const gen = generators[strategy]
//     /** Fraction accumulator */
//     const fractions: Fraction[] = []

//     for(let i = 0; i < count; i++) {
//         fractions.push(gen({
//             negative: negative && Math.random() < 0.5,
//             mixedFractions,
//             range
//         }))
//     }

//     const operation = operations[randomInt(0, operations.length)]
// }
