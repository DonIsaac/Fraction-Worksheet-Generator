import { CSSProperties,  Dispatch, FC, FormEventHandler, InputHTMLAttributes, useState } from "react"
import { Fraction } from "../../lib"
import classNames from "classnames"
import "./Fraction.scss"

export interface FractionComponentProps {
    frac: Fraction
    parens?: boolean
}

export const FractionComponent: FC<FractionComponentProps> = ({
    parens = false,
    frac
}) => <FractionBase {...{ parens, ...frac }} />

// =============================================================================

export interface FractionInputProps {

}

export const FractionInput: FC<FractionInputProps> = () => {
    // user input could be anything, so strings are used and validated upstream
    const [numerator, setNumerator] = useState<string>("")
    const [denominator, setDenominator] = useState<string>("")

    // onInput function for setNumerator or setDenominator
    const updateValue: (fn: Dispatch<string>) => FormEventHandler<HTMLInputElement> =
        fn => e => fn(e.currentTarget.value)

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

// =============================================================================

type FractionBaseProps = {
    parens?: boolean
    numerator: any
    denominator: any
    isNegative: boolean
}
const FractionBase: FC<FractionBaseProps> = ({
    parens = false,
    numerator,
    denominator,
    isNegative
}) => (
    <div className="fraction">
        {/* open parenthesis, if specified */}
        {parens && <span className="paren fullheight">(</span>}
        {/* sign */}
        {isNegative && <span className="fraction-sign">-</span>}
        {/* <div className="fraction-sign">{isNegative ? "-" : "\t"}</div> */}
        {/* Displays the numerator and denominator */}
        <div className="fraction-body-wrapper">
            <div className={classNames("fraction-body", { "negative": isNegative })}>
                <span className="number numerator">
                    {numerator}
                </span>
                <hr className="bar" />
                <span className="number denominator">
                    {denominator}
                </span>
            </div>
        </div>
        {/* <div className="fraction-sign"></div> */}
        {/* closing parenthesis, if specified */}
        {parens && <span className="paren fullheight">)</span>}
    </div>
)
