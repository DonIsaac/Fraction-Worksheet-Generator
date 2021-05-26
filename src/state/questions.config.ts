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

        setStrategy(state, action: PayloadAction<Strategies>) {
            state.strategy = action.payload
        },

        setMixedFractions(state, action: PayloadAction<boolean>) {
            state.mixedFractions = action.payload
        },
    },
})

// Export default questionConfig
export const {
    addOperation,
    removeOperation,
    setValueRange,
    setStrategy,
    setMixedFractions,
} = questionConfig.actions
export default questionConfig.reducer
