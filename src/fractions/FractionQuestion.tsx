import { FC } from "react"
import { Fraction } from "./fraction"
import classNames from "classnames"
import "./FractionQuestion.scss"

export interface FractionComponentProps {
    frac: Fraction
    parens?: boolean
}

export const FractionComponent: FC<FractionComponentProps> = ({
    parens = false,
    frac: {
        numerator,
        denominator,
        isNegative
    }
}) =>
    <div className="fraction">
        {/* open parenthesis, if specified */}
        {parens && <div className="paren fullheight">(</div>}
        {/* sign */}
        {isNegative && <div className="fraction-sign">-</div>}
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
        {parens && <div className="paren fullheight">)</div>}
    </div>
