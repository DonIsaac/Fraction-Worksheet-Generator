import { Fraction, Operation } from "../question"
import questionsReducer, {
    setDone,
    WorksheetState,
    clearQuestions,
    QuestionState,
    answerQuestion,
    setQuestions
} from "./worksheet.store"

const questions: QuestionState[] = [
    {
        question: {
            operation: Operation.Subtraction,
            left:      new Fraction(9, 4),
            right:     new Fraction(13, 9),
        },
        answer: ["", ""],
    },
    {
        question: {
            operation: Operation.Multiplication,
            left:      new Fraction(2, 1),
            right:     new Fraction(3, 18),
        },
        answer: ["4", "15f"],
    },
    {
        question: {
            operation: Operation.Addition,
            left:      new Fraction(7, 1),
            right:     new Fraction(2, 1),
        },
        answer: [
            "",
            "",
        ],
    },
    {
        question: {
            operation: Operation.Addition,
            left:      new Fraction(7),
            right:     new Fraction(-5, 2),
        },
        answer: [
            "1",
            "2",
        ],
    },
]

/** No questions, not done */
const empty: WorksheetState = { isDone: false, questions: [] }
const state: WorksheetState = { isDone: false, questions: questions.slice(0, 2) }
const stateDone: WorksheetState = { isDone: true, questions: questions.slice(2) }
const testCases: WorksheetState[] = [
    empty,
    state,
    stateDone,
]

describe.each(testCases)
("When a setDone() action is dispatched", state => {
    let res: WorksheetState

    beforeAll(() => {
        res = questionsReducer(state, setDone())
    })

    it("the worksheet is marked as done", () => {
        expect(res.isDone).toBeTruthy()
    })
})

describe.each(testCases)
("When a clearQuestions() action is dispatched", state => {
    let res: WorksheetState

    beforeAll(() => {
        res = questionsReducer(state, clearQuestions())
    })

    it("clears the questions list", () => {
        expect(res.questions).toHaveLength(0)
    })

    it("marks the worksheet as not done", () => {
        expect(res.isDone).toBeFalsy()
    })
})

describe("The answerQuestion() action creator", () => {
    const action = answerQuestion(1, "5", "2")

    it("creates an action storing an answer in the shape [numerator, denominator]", () => {
        expect(action.payload).toMatchObject({
            i:      1,
            answer: ["5", "2"],
        })
    })

    describe("when its action is dispatched", () => {

        const run = (state: WorksheetState) => questionsReducer(state, action)
        // const run = (state: WorksheetState) => questionsReducer(state, answerQuestion(1, "5", "2"))

        describe("when the worksheet is in progress", () => {
            const nextState = run(state)

            it("sets the user's answer to a question", () => {
                expect(nextState.questions[1].answer).toEqual(["5", "2"])
            })

            it("does not affect the worksheet completion status", () => {
                expect(nextState.isDone).toEqual(state.isDone)
            })
        })


        it("when the list of questions is empty, an error is thrown", () => {
            expect(() => run(empty)).toThrow()
        })

        it("when the worksheet is marked as complete, an error is thrown", () => {
            expect(() => run(stateDone)).toThrow()
        })

        it.each(testCases)("when the question number is out of bounds, and error is thrown", state => {
            expect(() => questionsReducer(
                state,
                answerQuestion(-1, "5", "2"))
            ).toThrow()
            expect(() => questionsReducer(
                state,
                answerQuestion(state.questions.length + 1, "5", "2"))
            ).toThrow()
        })

    })

})

describe("When an setQuestions() action is dispatched", () => {
    describe("when the worksheet is in progress", () => {
        const newQuestions = questions.slice(2, 4).map(q => q.question)
        // let nextState: WorksheetState
        let nextQuestions: QuestionState[]

        beforeEach(() => {
            nextQuestions = questionsReducer(
                state,
                setQuestions(newQuestions)
            ).questions
        })

        it("sets the worksheet's questions to the questions the action was dispatched with", () => {
            expect(nextQuestions).toHaveLength(newQuestions.length)
            for (let i = 0; i < nextQuestions.length; i++) {
                expect(nextQuestions[i].question).toEqual(newQuestions[i])
            }
        })

        it("after being set, the new questions have blank answers", () => {
            for (const question of nextQuestions) {
                expect(question.answer).toEqual(["", ""])
            }
        })
    })

    it("when the worksheet is complete, an error is thrown", () => {
        const qs = questions.map(q => q.question)
        expect(
            () => questionsReducer(stateDone, setQuestions(qs))
        ).toThrow()
    })
})
