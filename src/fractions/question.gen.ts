import { WorksheetConfig, Question } from './types'
import { generators, generateFraction } from './fraction.gen'
import { randomInt } from './util'

export const generateQuestions: ((args: WorksheetConfig) => Question) =
    ({
        operations,
        negative = false,
        range = [1, 10],
        countRange = [2, 2]

    }) => {
        const operation = operations[randomInt(0, operations.length)]
        const left = generateFraction()
        return null
    }
