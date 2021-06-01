import {
    createSlice,
    PayloadAction,
} from "@reduxjs/toolkit"
import { Operation, Strategies, QuestionGenerationConfig } from "../lib"

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
    name:     "questionConfig",
    initialState,
    reducers: {

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
export default questionConfig.reducer
