/* eslint-disable max-len */
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
    Fraction, Question, raise, zip,
} from "../lib"
import Debug from "debug"

const debug = Debug("frac:state:questions")

/**
 * State for a single question
 */
// export type QuestionState = [question: Question, answer: Fraction | null]
export type QuestionState = {
    question: Question

    /** The user-provided answer. Not the "correct" solution. */
    answer: [n: string, d: string]
}
export interface WorksheetState {

    /**
     * Array of question/answer data.
     *
     * Each element contains a question being displayed and the user's answer.
     * If they have not yet answered the question, answer is undefined.
     */
    questions: QuestionState[],
    isDone: boolean,
}

const initialState: WorksheetState = {
    questions: [],
    isDone:    false,
}

const worksheet = createSlice({
    name:     "worksheet",
    initialState,
    reducers: {

        /**
         * Resets the worksheet. Completed worksheets in the done state will
         * transition to a not done state.
         */
        clearQuestions: () => initialState,

        /**
         * Populates the questions list with a clean set of questions.
         *
         * @param state
         * @param action
         *
         * @throws if the worksheet has already been completed (i.e. `isDone === true`)
         */
        setQuestions: (state, action: PayloadAction<Question[]>) => (
            state.isDone && raise("Cannot set questions, the worksheet has already been completed."),
            {
                ...state,
                questions: action.payload.map(
                    question => ({ question, answer: ["", ""] })
                ),
            }),

        /**
         * Sets the user's answer to a specific question.
         */
        answerQuestion: {

            /**
             *
             * @param i             The question number
             * @param numerator     The answer's numerator
             * @param denominator   The answer's denominator
             */
            prepare: (i: number, numerator: string, denominator: string) => ({
                payload: { i, answer: [numerator, denominator] as [string, string] },
            }),
            reducer: (
                state,
                {
                    payload: { i, answer },
                }: PayloadAction<{ i: number, answer: [n: string, d: string] }>
            ) => (
                // Throw if worksheet is finished or question number is out of bounds
                debug("answerQuestion reducer called"),
                state.isDone && raise(`Cannot answer question #${i}, the worksheet has already been completed.`),
                !state.questions.length && raise("List of questions is empty"),
                state.questions.length <= i && raise(`Question #${i} does not exist and is out of bounds`),
                // Set answer for question i
                state.questions[i].answer = answer,
                state
            ),
        },

        /**
         * Marks the worksheet as complete.
         *
         * When in a done state, questions and answers may not be modified.
         * Attempting to do so will throw an error. The worksheet state must
         * be cleared before questions may be updated again.
         *
         * @param state
         *
         * @see clearQuestions
         */
        setDone: (state) => {
            state.isDone = true
        },
    },
})

export const {
    clearQuestions,
    setQuestions,
    answerQuestion,
    setDone,
} = worksheet.actions
export default worksheet.reducer
