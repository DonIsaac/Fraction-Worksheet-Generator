import { Fraction, Operation } from "../lib"
import questionsReducer, {
    setDone,
    WorksheetState,
    clearQuestions,
    QuestionState,
    answerQuestion,
    setQuestions
} from "./questions"

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
("setDone", state => {
    let res: WorksheetState

    beforeAll(() => {
        res = questionsReducer(state, setDone())
    })

    it("resulting isDone is always true", () => {
        expect(res.isDone).toBeTruthy()
    })
})

describe.each(testCases)
("clearQuestions", state => {
    let res: WorksheetState

    beforeAll(() => {
        res = questionsReducer(state, clearQuestions())
    })

    it("question list is empty", () => {
        expect(res.questions).toHaveLength(0)
    })

    it("isDone is false", () => {
        expect(res.isDone).toBeFalsy()
    })
})

describe("answerQuestion", () => {
    const validAction = answerQuestion(0, "1", "2")
    const outOfBoundsAction = answerQuestion(questions.length, "1", "2")

    it("Answers questions when worksheet is in progress", () => {
        const { questions } = questionsReducer(state, validAction)
        const [numerator, denominator] = questions[0].answer
        expect(numerator).toBe("1")
        expect(denominator).toBe("2")
    })

    it("Throws if worksheet has been completed", () => {
        expect(
            () => questionsReducer(stateDone, validAction)
        ).toThrow()
    })

    it("Throws if questions list is empty", () => {
        expect(
            () => questionsReducer(empty, validAction)
        ).toThrow()
    })

    it("Throws if question index is out of bounds", () => {
        expect(
            () => questionsReducer(state, outOfBoundsAction)
        ).toThrow()
    })
})

describe("setQuestions", () => {
    it("Throws if worksheet has been completed", () => {
        const qs = questions.map(q => q.question)
        expect(
            () => questionsReducer(stateDone, setQuestions(qs))
        ).toThrow()
    })
})
