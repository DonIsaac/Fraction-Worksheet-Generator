import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import Debug from "debug"
import { Operation, QuestionGenerationConfig, Strategies } from "../question"

const debug = Debug("frac:state:questionConfig")

/** Key where question config store object is stored in local storage. */
const LOCALSTORAGE_KEY = "question-config-state"

/**
 * Gets the initial state for the question config store.
 *
 * This function checks if question config preferences have been cached in
 * local storage from previous sessions. If found, this value is used as the
 * initial state. If not found (e.g. this is the user's first time using the
 * app) the initial question config state is used.
 *
 * @returns A question generation config object to use as the initial state.
 *
 * @see initialState the default initial state
 * @see saveQuestionConfigStore saves the store to local storage
 */
const loadQuestionConfigStore = (): QuestionGenerationConfig => {
    debug("loading state from local storage")

    try {
        const serialized = localStorage.getItem(LOCALSTORAGE_KEY)
        return serialized
            ? (JSON.parse(serialized) as QuestionGenerationConfig)
            : initialState
    } catch (err) {
        console.error("Failed to load question config state:", err)
        return initialState
    }
}

/**
 * Saves the current value of the question config store into local storage.
 * This cached value is used as the store's initial state each time the
 * application starts, allowing the application to remember user preferences.
 *
 * @param store The question config store to save to local storage.
 *
 * @see loadQuestionConfigStore loads the saved store from local storage
 */
const saveQuestionConfigStore = (store: QuestionGenerationConfig): void => {
    debug("saving state to local storage")
    try {
        const serialized = JSON.stringify(store)
        localStorage.setItem(LOCALSTORAGE_KEY, serialized)
    } catch (err) {
        console.error("Failed to save question config state:", err)
    }
}

/**
 * Initial state object for question slice
 */
const initialState: QuestionGenerationConfig = {
    operations:     [Operation.Addition],
    negative:       false,
    range:          [1, 10],
    countRange:     [2, 3],
    strategy:       "default",
    mixedFractions: false,
}

const questionConfig = createSlice({
    name:         "questionConfig",
    initialState: loadQuestionConfigStore(),
    reducers:     {

        reset() {
            return initialState
        },

        /**
         * Adds an operation to the list of possible question types.
         *
         * @param state
         * @param action
         */
        addOperation(state, action: PayloadAction<Operation>) {
            !(state.operations) && (state.operations = [])

            if (!state.operations.includes(action.payload)) {
                state.operations?.push(action.payload)
            }
        },

        /**
         * Removes an operation to the list of possible question types.
         *
         * @param state
         * @param action
         */
        removeOperation(state, action: PayloadAction<Operation>) {
            !(state.operations) && (state.operations = [])
            state.operations = state.operations.filter(el => el !== action.payload)
        },

        /**
         * Updates the range of possible numerator/denominator values.
         *
         * @param state
         * @param action
         */
        setValueRange(state, action: PayloadAction<[min: number, max: number]>) {
            state.range = action.payload
        },

        /**
         * Updates the minimum numerator/denominator value.
         *
         * @param state
         * @param action
         */
        setValueMin(state, action: PayloadAction<number>) {
            state.range && (state.range[0] = action.payload)
        },

        /**
         * Updates the maximum numerator/denominator value.
         *
         * @param state
         * @param action
         */
        setValueMax(state, action: PayloadAction<number>) {
            state.range && (state.range[1] = action.payload)
        },

        setStrategy(state, action: PayloadAction<Strategies>) {
            state.strategy = action.payload
        },

        setMixedFractions(state, action: PayloadAction<boolean>) {
            state.mixedFractions = action.payload
        },

        setNegatives(state, action: PayloadAction<boolean>) {
            state.negative = action.payload
        },
    },
})

// Export default questionConfig
export const {
    reset,
    addOperation,
    removeOperation,
    setValueRange,
    setValueMin,
    setValueMax,
    setStrategy,
    setMixedFractions,
    setNegatives,
} = questionConfig.actions
export { saveQuestionConfigStore }
export default questionConfig.reducer
