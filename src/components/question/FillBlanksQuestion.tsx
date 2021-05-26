import React, { FC } from "react"
import { Fraction, Question, solveQuestion } from "../../lib"
import { FractionInput } from "../fraction"
import { QuestionBody } from "./QuestionBody"

export interface FillBlanksQuestionProps {
    question: Question
    userSolution: Fraction | null
    isDone: boolean
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
    userSolution,
    isDone,
    onChange,
}) => {
    const isCorrect = userSolution !== null && userSolution.eq(solveQuestion(question))
    return (
        <QuestionBody question={question}>
            <span className="operation">=</span>
            <FractionInput onChange={onChange} />
            {
                // FIXME you know what to do
                !isDone ? null :
                    isCorrect ?
                        <span>Correct!</span> :
                        <span>Wrong! Answer is { solveQuestion(question).toString() }</span>
            }
        </QuestionBody>

    )
}
