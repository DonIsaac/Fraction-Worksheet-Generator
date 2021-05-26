import { Fraction } from "../fractions"
import { Operation } from "../types"
import { Question, solveQuestion } from "./question"

describe("Question", () => {
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
})
