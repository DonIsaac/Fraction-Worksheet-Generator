import { combineReducers, configureStore } from "@reduxjs/toolkit"

// eslint-disable-next-line
import { QuestionGenerationConfig } from "../../features/question"
// eslint-disable-next-line
import type { WorksheetState } from "../../features/worksheet/state"
import { questionConfigReducer, worksheetReducer } from "../../features/worksheet/state"
import { logger, crashReporter } from "./middleware"

/** The root reducer */
const reducer = combineReducers({

    /**
     * User settings that configure how questions and fractions are
     * generated. Includes things like how many questions to generate per
     * worksheet, what operations are present in each question, etc.
     *
     * @see QuestionGenerationConfig
     */
    questionConfig: questionConfigReducer,

    /**
     * Active worksheet state. Includes list of current questions, etc.
     *
     * @see WorksheetState
     */
    worksheet: worksheetReducer,
})

/** The application's Redux store. */
const store = configureStore({
    reducer,
    middleware: defaults => defaults({
        serializableCheck: false, // TODO(don): Probably shouldn't do this, but we need to store fractions ¯\_(ツ)_/¯
    }).concat(logger, crashReporter),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
