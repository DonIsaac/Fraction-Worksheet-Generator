
import React, {
    CSSProperties,
    Dispatch,
    FC,
    FormEventHandler,
    InputHTMLAttributes,
    useEffect,
    useState,
} from "react"
import { Fraction } from "../../lib"
import { FractionBase } from "./Fraction"

const VALID_INT_REGEX = /^-?[0-9]+$/
const VALID_POSITIVE_INT_REGEX = /^[0-9]+$/
const invalidFrac = (n: string, d: string) =>
    !n.length ||
    !d.length ||
    !VALID_INT_REGEX.test(n) ||
    !VALID_POSITIVE_INT_REGEX.test(d)

export interface FractionInputProps {

    /** Callback that is called when the user inputs a new valid Fraction value. */
    onChange: (frac: Fraction) => void

    /**
     * Display mode. Defaults to `"input"`.
     *
     * - `input`: User may insert their answer into the input fields.
     * - `correct`: User input is disabled, and the correct answer is being
     *    displayed in the input fields.
     * - `incorrect`: User input is disabled, and the incorrect answer is being
     *    displayed in the input fields.
     *
     * @default "input"
     */
    mode?: "input" | "correct" | "incorrect"

    /**
     * The fraction to display. Required if `mode` is `"correct"` or `"incorrect"`,
     * ignored if `mode` is `"input"`.
     */
    display?: Fraction
}

/**
 * A custom input component that looks like a fraction.
 *
 * Behavior is controlled by the `mode` prop. When `mode` is `"input"`, this
 * component accepts answers from the user, which are passed up via the
 * `onChange` event handler. `"correct"` and `"incorrect"` are display modes.
 * When in one of these modes, a provided `display` fraction is shown and the
 * component enters a read-only state. Note that providing a `display` value
 * when in `"input"` mode has no effect.
 *
 * @param props
 */
export const FractionInput: FC<FractionInputProps> = ({
    onChange,
    mode = "input",
    display,
}) => {
    // User input could be anything, so strings are used and validated upstream
    const [numerator, setNumerator] = useState<string>("")
    const [denominator, setDenominator] = useState<string>("")
    const readonly = !(mode === "input")
    // OnInput function for setNumerator or setDenominator
    const updateValue: (fn: Dispatch<string>) => FormEventHandler<HTMLInputElement> =
        fn => e => fn(e.currentTarget.value)

    useEffect(() => {
        if (invalidFrac(numerator, denominator))
            return

        const n = Number.parseInt(numerator),
            d = Number.parseInt(denominator)

        if (d === 0)
            return

        onChange(new Fraction(n, d))
    }, [numerator, denominator, onChange])

    // Display prop must be provided when in a display mode
    if (readonly && !display) {
        throw new Error("A display fraction must be provided when FractionInput is not in 'input' mode.")
    }

    // Make both input boxes have the same width. Use the largest one, but no
    // Smaller than 1 character
    const style: CSSProperties = {
        width: `${Math.max(numerator?.length ?? 0, denominator?.length ?? 0, 1)}ch`,
    }
    const commonInputProps: InputHTMLAttributes<HTMLInputElement> = {
        style,
        type:     "text",
        pattern:  "^-?[0-9]*$",
        disabled: readonly,
    }

    return mode === "input"
        ? <FractionBase
            isNegative={false}
            numerator={
                <input
                    name="numerator"
                    onInput={updateValue(setNumerator)}
                    title={"numerator"}
                    value={numerator}
                    {...commonInputProps}
                ></input>
            }
            denominator={
                <input
                    name="denominator"
                    onInput={updateValue(setDenominator)}
                    title={"denominator"}
                    value={denominator}
                    {...commonInputProps}
                ></input>
            }
        />
        : <FractionBase
            isNegative={display!.isNegative}
            numerator={
                <input
                    name="numerator"
                    title={"numerator"}
                    value={display!.numerator}
                    {...commonInputProps}
                ></input>
            }
            denominator={
                <input
                    name="denominator"
                    title={"denominator"}
                    value={display!.denominator}
                    {...commonInputProps}
                ></input>
            }
        />
}
