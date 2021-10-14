/* eslint-disable capitalized-comments */

import React, {
    CSSProperties,
    FC,
    FormEventHandler,
    InputHTMLAttributes,
} from "react"
// import Debug from "debug"
import { FractionBase } from "../FractionBase"
import { FractionInputEventHandler, FractionInputMode } from "../../types"

import "./FractionInput.scss"

// const debug = Debug("frac:view:FractionInput")

export interface FractionInputProps {

    /** Callback that is called when the user inputs a new valid Fraction value. */
    onChange: FractionInputEventHandler

    /**
     * Current display and input mode. Defaults to `"input"`.
     *
     * @default "input"
     * @see FractionInputMode
     */
    mode?: FractionInputMode

    /** The numerator value to display. */
    numerator: string

    /** The denominator value to display. */
    denominator: string
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
    numerator,
    denominator,
}) => {

    /** Is `mode` a display mode? */
    const readonly = !(mode === "input")

    /** Is `mode` a display mode and do the input fields have populated values? */
    const filled = mode === "correct" || mode === "incorrect"
    const updateValue: (field: "numerator" | "denominator") => FormEventHandler<HTMLInputElement> =
        field => e => onChange(field, e.currentTarget.value)

    // Make both input boxes have the same width. Use the largest one, but no
    // Smaller than 1 character
    const style: CSSProperties = {
        width: `${Math.max(numerator?.length ?? 0, denominator?.length ?? 0, 1)}ch`,
        ...(filled
            ? { backgroundColor: "#282c34", borderStyle: "hidden" }
            : {}),
    }
    const commonInputProps: InputHTMLAttributes<HTMLInputElement> = {
        style,
        type:            "text",
        pattern:         "^-?[0-9]*$",
        disabled:        readonly,
        "aria-disabled": readonly,
    }

    return (
        <FractionBase
            className={mode}
            isNegative={false}
            numerator={
                <input
                    name="numerator"
                    onInput={updateValue("numerator")}
                    title={"numerator"}
                    value={numerator}
                    {...commonInputProps}
                />
            }
            denominator={
                <input
                    name="denominator"
                    onInput={updateValue("denominator")}
                    title={"denominator"}
                    value={denominator}
                    {...commonInputProps}
                />
            }
        />
    )
}
