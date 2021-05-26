/* eslint-disable max-len */
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
    Fraction, Question, raise, zip,
} from "../lib"

/**
 * State for a single question
 */
export type QuestionState = [question: Question, answer: Fraction | null]
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
                questions: zip(
                    action.payload,
                    Array(action.payload.length).fill(null) as null[],
                ),
            }),

        /**
         * Sets the user's answer to a specific question.
         */
        answerQuestion: {

            /**
             *
             * @param i The question number
             * @param answer The user's answer to the question
             */
            prepare: (i: number, answer: Fraction) => ({
                payload: { i, answer },
            }),
            reducer: (
                state,
                {
                    payload: { i, answer },
                }: PayloadAction<{ i: number, answer: Fraction }>,
            ) => (
                // Throw if worksheet is finished or question number is out of bounds
                state.isDone && raise(`Cannot answer question #${i}, the worksheet has already been completed.`),
                !state.questions.length && raise("List of questions is empty"),
                state.questions.length <= i && raise(`Question #${i} does not exist and is out of bounds`),
                // Set answer for question i
                state.questions[i][1] = answer,
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
