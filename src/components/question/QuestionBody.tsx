import { FC } from "react"
import classNames from "classnames"
import { Fraction, Question } from "../../lib"
import { FractionComponent } from "../fraction"
import { symbolFor } from "../../lib/util"

import "./Question.scss"

export interface QuestionBodyProps {
    /**
     * The question being displayed
     */
    question: Question
}

/**
 * Displays question information common across all question archetypes. In an
 * equation, this is the left-hand side.
 *
 * @param props the component's props
 *
 * @see QuestionBodyProps
 */
export const QuestionBody: FC<QuestionBodyProps> = ({ question, children }) => (
    <div className="question">
        <QuestionNode question={question} />
        {children}
    </div>
)

const QuestionNode: FC<QuestionBodyProps> = ({ question }) => {
    if (question instanceof Fraction) {
        return <FractionComponent frac={question} />
    }

    const { left, right, operation } = question

    return (
        <>
            <FractionComponent frac={left} />
            <span className={classNames("operation", operation)}>{symbolFor(operation)}</span>
            <QuestionNode question={right} />
        </>
    )
}
