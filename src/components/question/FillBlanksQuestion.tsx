import React, { FC } from "react"
import { Fraction, Question } from "../../lib"
import { FractionInput } from "../fraction"
import { QuestionBody } from "./QuestionBody"

export interface FillBlanksQuestionProps {
    question: Question
    onChange: (frac: Fraction) => void
}

/**
 * Displays a "fill in the blanks" question. The user is prompted with a fraction
 * input where they may type in their solution.
 *
 * @param props
 *
 * @see QuestionBody
 * @see FractionInput
 */
export const FillBlanksQuestion: FC<FillBlanksQuestionProps> = ({
    question,
    onChange
}) => {
    return (
        <QuestionBody question={question}>
            <span className="operation">=</span>
            <FractionInput onChange={onChange} />
        </QuestionBody>

    )
}
