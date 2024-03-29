import { FC, PropsWithChildren } from "react"
import classNames from "classnames"

import { Question, symbolFor } from ".."
import Fraction, { FractionDisplay } from "../fraction"

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
export const QuestionBody: FC<PropsWithChildren<QuestionBodyProps>> = ({ question, children }) => (
    <div className="question">
        <QuestionNode question={question} />
        {children}
    </div>
)

const QuestionNode: FC<QuestionBodyProps> = ({ question }) => {
    if (question instanceof Fraction) {
        return <FractionDisplay frac={question} />
    }

    const { left, right, operation } = question

    return (
        <>
            <FractionDisplay frac={left} />
            <span className={classNames("operation", operation)}>{symbolFor(operation)}</span>
            <QuestionNode question={right} />
        </>
    )
}
