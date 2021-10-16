import { combineReducers, configureStore } from "@reduxjs/toolkit"

// eslint-disable-next-line
import { QuestionGenerationConfig } from "../../features/question"
import questionConfig from "../../features/worksheet/question-config.store"
import worksheet from "../../features/worksheet/worksheet.store"
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
    questionConfig,

    /**
     * Active worksheet state. Includes list of current questions, etc.
     *
     * @see WorksheetState
     */
    worksheet,
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
