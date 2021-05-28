/* eslint-disable capitalized-comments */

import React, {
    CSSProperties,
    FC,
    FormEventHandler,
    InputHTMLAttributes,
} from "react"
import Debug from "debug"
import { FractionBase } from "./Fraction"
import { FractionInputEventHandler, FractionInputMode } from "./types"

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
    numerator: string
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
    const readonly = !(mode === "input")
    const updateValue: (field: "numerator" | "denominator") => FormEventHandler<HTMLInputElement> =
        field => e => onChange(field, e.currentTarget.value)

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
                ></input>
            }
            denominator={
                <input
                    name="denominator"
                    onInput={updateValue("denominator")}
                    title={"denominator"}
                    value={denominator}
                    {...commonInputProps}
                ></input>
            }
        />
    )
}
