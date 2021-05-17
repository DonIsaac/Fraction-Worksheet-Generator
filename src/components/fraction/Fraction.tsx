import { FC } from "react"
import { Fraction } from "../../lib"
import classNames from "classnames"
import "./Fraction.scss"

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
