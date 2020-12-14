import { FC } from "react"
import classNames from "classnames"
import { Fraction, FractionComponent } from "../lib/fractions"
import { Question } from "../lib/types"
import { symbolFor } from "../lib/util"

import "./QuestionComponent.scss"

export interface QuestionComponentProps {
    question: Question
}

export const QuestionComponent: FC<QuestionComponentProps> = ({ question }) => (
    <div className="question">
        <_QuestionComponent question={question} />
    </div>
)

const _QuestionComponent: FC<QuestionComponentProps> = ({ question }) => {
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
