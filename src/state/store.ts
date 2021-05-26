import { combineReducers, configureStore } from "@reduxjs/toolkit"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { QuestionGenerationConfig } from "../lib"
import questionConfig from "./questions.config"
// import worksheetState from "./questions"

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

    // /**
    //  * Active worksheet state. Includes list of current questions, etc.
    //  *
    //  * @see WorksheetState
    //  */
    // worksheetState,
})

/** The application's Redux store. */
const store = configureStore({ reducer })


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
