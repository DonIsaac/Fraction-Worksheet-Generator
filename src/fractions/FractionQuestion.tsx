import { FC } from "react"
import { Fraction } from "./fraction"
import "./FractionQuestion.scss"

export interface FractionComponentProps {
   frac: Fraction
}

export const FractionComponent: FC<FractionComponentProps> = ({
    frac: {
        numerator,
        denominator,
        isNegative
    }}) =>
    <div className="fraction">

    </div>
