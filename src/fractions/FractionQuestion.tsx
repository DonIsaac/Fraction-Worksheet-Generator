import { FC } from "react"
import { Fraction } from "./fraction"
import "./FractionQuestion.scss"

export interface FractionComponentProps {
    frac: Fraction
    params?: boolean
}

export const FractionComponent: FC<FractionComponentProps> = ({
    params = false,
    frac: {
        numerator,
        denominator,
        isNegative
    }
}) =>
    <div className="fraction">
        {/* sign */}
        {isNegative && <div className="fraction-sign">-</div>}
        {/* Displays the numerator and denominator */}
        <div className="fraction-body">
            <span className="number numerator">
                {numerator}
            </span>
            {/* <span style={{ lineHeight: "0.6em" }}>&#9473;</span> */}
            <hr className="bar" />
            <span className="number denominator">
                {denominator}
            </span>
        </div>
    </div>
