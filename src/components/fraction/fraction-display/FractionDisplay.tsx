import React, { FC } from "react"
import { Fraction } from "../../../lib"
import { FractionBase } from "../FractionBase"
// import "./Fraction.scss"

export interface FractionDisplayProps {
    frac: Fraction
    parens?: boolean
}

/**
 * Displays an existing Function.
 *
 * @param props
 *
 * @see Function
 */
export const FractionDisplay: FC<FractionDisplayProps> = ({
    parens = false,
    frac,
}) => <FractionBase {...{ parens, ...frac }} />

// =============================================================================
