import { FC } from "react"
import classNames from "classnames"
import { Fraction, Question } from "../../lib"
import { FractionComponent } from "../fraction"
import { symbolFor } from "../../lib/util"

import "./Question.scss"

export interface QuestionComponentProps {
    question: Question
}

export const QuestionComponent: FC<QuestionComponentProps> = ({ question }) => (
    <div className="question">
        <LHS question={question} />
    </div>
)

/** Question's left hand side */
const LHS: FC<QuestionComponentProps> = ({ question }) => {
    if (question instanceof Fraction) {
        return <FractionComponent frac={question} />
    }

    const { left, right, operation } = question

    return (
        <>
            <FractionComponent frac={left} />
            <span className={classNames("operation", operation)}>{symbolFor(operation)}</span>
            <QuestionComponent question={right} />
        </>
    )
}

// question instanceof Fraction
//     ? <FractionComponent frac={question} />
//     : (
//         <Fraction
//     )
