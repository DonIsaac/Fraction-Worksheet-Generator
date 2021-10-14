import Fraction from "./Fraction"
export default Fraction

export { FractionDisplay } from "./components/fraction-display/FractionDisplay"
export { FractionInput } from "./components/fraction-input/FractionInput"
export { getDisplayMode, userInputToFraction } from "./util"

export * from "./types"
export type { FractionDisplayProps as FractionComponentProps } from "./components/fraction-display/FractionDisplay"
export type { FractionInputProps } from "./components/fraction-input/FractionInput"
