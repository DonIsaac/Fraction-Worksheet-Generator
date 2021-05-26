import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Question } from "../lib"

export interface WorksheetState {
    questions: Question[],
    isDone: boolean,
}

const initialState: WorksheetState = {
    questions: [],
    isDone:    false,
}

const worksheetState = createSlice({
    name:         "worksheetState",
    initialState: initialState,
    reducers:     {
        // Removing all questions also resets isDone to false.
        clearQuestions: () => initialState,
        setQuestions:   (state, action: PayloadAction<Question[]>) =>
            ({ ...state, questions: action.payload }),
        setDone(state) {
            state.isDone = true
        },
    },
})

export const { clearQuestions, setQuestions } = worksheetState.actions
export default worksheetState.reducer
