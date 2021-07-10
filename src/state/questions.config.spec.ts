import { AnyAction } from "@reduxjs/toolkit"
import { Operation, Question, QuestionGenerationConfig } from "../lib"
import questionConfigReducer, {
    addOperation, removeOperation, reset, setMixedFractions, setValueRange
} from "./questions.config"
const basicAddSub: QuestionGenerationConfig = {
    operations:     [Operation.Addition, Operation.Subtraction],
    negative:       false,
    range:          [1, 5],
    strategy:       "default",
    mixedFractions: false,
}
const multDivWithNegative: QuestionGenerationConfig = {
    operations:     [Operation.Multiplication, Operation.Division],
    negative:       true,
    range:          [1, 20],
    strategy:       "default",
    mixedFractions: true,
}
const testCases: QuestionGenerationConfig[] = [
    basicAddSub,
    multDivWithNegative,
]

// QuestionConfigReducer(undefined, reset())
describe.each(testCases)("When a reset() action is dispatched", testCase => {
    let state: QuestionGenerationConfig

    beforeEach(() => {
        state = questionConfigReducer(testCase, reset())
    })

    it("the only selected operation is addition", () => {
        expect(state.operations).toHaveLength(1)
        expect(state.operations[0]).toEqual(Operation.Addition)
    })

    it("negative numbers are not selected", () => {
        expect(state.negative).toBeFalsy()
    })

    it("number generation bounds are [1, 10]", () => {
        expect(state.range).toEqual([1, 10])
    })

    it("each question will only have two questions", () => {
        expect(state.countRange).toEqual([2, 3])
    })

    it("mixed fractions are not selected", () => {
        expect(state.mixedFractions).toBeFalsy()
    })
})

describe("Given that the current configuration is basicAddSub", () => {
    const state = basicAddSub
    let nextState: QuestionGenerationConfig

    const dispatch = (action: AnyAction) => questionConfigReducer(state, action)

    describe("when addOperation(Operation.Addition) is dispatched", () => {
        const { operations } = dispatch(addOperation(Operation.Addition))
        it("addition is not re-added to the list of desired operations", () => {
            expect(operations).toEqual(state.operations)
        })
    })

    describe("when addOperation(Operation.Multiplication) is dispatched", () => {
        const { operations } = dispatch(addOperation(Operation.Multiplication))
        it("adds multiplication to the list of desired operations", () => {
            expect(operations).toContain(Operation.Multiplication)
        })

        it("does not remove existing operations from the list", () => {
            expect(operations).toContain(Operation.Addition)
            expect(operations).toContain(Operation.Subtraction)
        })
    })

    describe("when removeOperation(Operation.Subtraction) is dispatched", () => {
        const { operations } = dispatch(removeOperation(Operation.Subtraction))

        it("removes subtraction from the list of desired operations", () => {
            expect(operations).not.toContain(Operation.Subtraction)
        })
        it("addition is left in the operations list", () => {
            expect(operations).toContain(Operation.Addition)
        })
    })

    describe("when removeOperation(Operation.Division) is dispatched", () => {
        const { operations } = dispatch(removeOperation(Operation.Division))
        it("the list of desired operations is unchanged", () => {
            expect(operations).toEqual(state.operations)
        })
    })

    describe("when setValueRange is dispatched", () => {
        const { range } = dispatch(setValueRange([5, 15]))

        it("changes the fraction value range setting", () => {
            expect(range).toEqual([5, 15])
        })
    })

    describe.each([true, false])("when setMixedFractions(%s) is dispatched", flag => {
        beforeEach(() => {
            nextState = dispatch(setMixedFractions(flag))
        })

        it("changes the mixed fractions flag", () => {
            expect(nextState.mixedFractions).toStrictEqual(flag)
        })
    })
})
