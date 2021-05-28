import { generateQuestion } from "./question.gen"
import { randomInt } from "../util"
import { QuestionGenerationConfig, Operation } from "../types"
import { Question } from "./question"
import { Fraction } from "../fractions"

const SEED = "some string to use as a seed"
const TEST_ITERS = 16

describe.each(Array(TEST_ITERS).fill(1))
("generateQuestion()", () => {
    const gen = ([min, max]: [number, number]) => randomInt(min, max)

    beforeAll(() => {
        expect(typeof gen([1, 10])).toBe("number")
    })
    afterAll(() => {
        // Jest.spyOn(global.Math, "random").mockRestore()
    })
    afterEach(() => {
        // Gen.mockClear()
    })

    it("generates valid fractions with default parameters", () => {
        const question = generateQuestion({ operations: [Operation.Addition] })
        expect(reduceQuestion(question, []).length).toBeGreaterThanOrEqual(2)
        expect(reduceQuestion(question, []).length).toBeLessThanOrEqual(3)

    })
})

//
const reduceQuestion = (question: Question, acc: Fraction[]): Fraction[] =>
    question instanceof Fraction
        ? [...acc, question]
        : reduceQuestion(question.right, [...acc, question.left])
