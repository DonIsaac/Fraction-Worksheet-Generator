/* eslint-disable max-len */
import { randomInt } from "../../lib"
import { Operation } from "./types"
import {
    generateQuestion,
    Question,
    solveQuestion,
    symbolFor
} from "./Question"
import Fraction from "./fraction"

describe("solveQuestion(question, opts)", () => {
    describe.each([
        // Single fraction
        [new Fraction(1, 2, true), new Fraction(1, 2, true)],
        // Addition
        [{ left: new Fraction(1, 2), right: new Fraction(1, 2), operation: Operation.Addition }, new Fraction(1, 1)],
        // Subtraction
        [{ left: new Fraction(3, 5), right: new Fraction(1, 9), operation: Operation.Subtraction }, new Fraction(22, 45)],
        // Multiplication
        [{ left: new Fraction(4, 3), right: new Fraction(4, 2), operation: Operation.Multiplication }, new Fraction(8, 3)],
        // Division
        [{ left: new Fraction(9, 10), right: new Fraction(3, 5), operation: Operation.Division }, new Fraction(3, 2)],
    ] as [Question, Fraction][])
    ("solveQuestion(%s)", (q, f) => {
        let actual: Fraction

        beforeAll(() => {
            actual = solveQuestion(q)
        })

        it(`== ${f}`, () => {
            expect(actual).toEqual(f)
        })
    })
})

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

describe("symbolFor(op)", () => {
    describe.each([
        Operation.Addition,
        Operation.Subtraction,
        Operation.Multiplication,
        Operation.Division,
    ])("symbolFor(%s)", input => {
        let actual: string

        beforeAll(() => {
            actual = symbolFor(input)
        })

        it("Returns a string", () => {
            expect(typeof actual).toEqual("string")
        })

        it("Is a single character long", () => {
            expect(actual).toHaveLength(1)
        })

        it("Is valid UTF", () => {
            expect(actual.charCodeAt(0)).toBeLessThanOrEqual(0xffff)
        })
    })
})
const reduceQuestion = (question: Question, acc: Fraction[]): Fraction[] =>
    question instanceof Fraction
        ? [...acc, question]
        : reduceQuestion(question.right, [...acc, question.left])
