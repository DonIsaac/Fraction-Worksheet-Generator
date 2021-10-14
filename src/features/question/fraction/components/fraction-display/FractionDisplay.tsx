import React, { FC } from "react"
import Fraction from "../.."
import { FractionBase } from "../FractionBase"
// import "./Fraction.scss"

export interface FractionDisplayProps {
    frac: Fraction
    parens?: boolean
    className?: string | string[]
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
    className,
}) => <FractionBase {...{ parens, className, ...frac }} />

// =============================================================================
