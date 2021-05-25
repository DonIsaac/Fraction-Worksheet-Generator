
import React, {
    CSSProperties,
    Dispatch,
    FC,
    FormEventHandler,
    InputHTMLAttributes,
    useEffect,
    useState
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
    onChange: (frac: Fraction) => void
}

/**
 * A custom input component that looks like a fraction.
 *
 * @param props
 */
export const FractionInput: FC<FractionInputProps> = ({ onChange }) => {
    // user input could be anything, so strings are used and validated upstream
    const [numerator, setNumerator] = useState<string>("")
    const [denominator, setDenominator] = useState<string>("")

    // onInput function for setNumerator or setDenominator
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

    // Make both input boxes have the same width. Use the largest one, but no
    // smaller than 1 character
    const style: CSSProperties = {
        width: `${Math.max(numerator?.length ?? 0, denominator?.length ?? 0, 1)}ch`
    }
    const commonInputProps: InputHTMLAttributes<HTMLInputElement> = {
        style,
        type: "text",
        pattern: "^-?[0-9]*$"
    }

    return <FractionBase
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
}