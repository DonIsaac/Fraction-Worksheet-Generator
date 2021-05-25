import React, { FC } from "react"
import { Fraction, Question } from "../../lib"
import { FillBlanksQuestion } from "../question"

import "./QuestionGrid.scss"

export interface QuestionGridProps {
    /**
     * The questions to display in the grid
     */
    questions: Question[]

    /**
     * Called when the user updates their solution to a question.
     *
     * @param frac the new answer value
     * @param i    the question number the value belongs to
     */
    onChange: (frac: Fraction, i: number) => void

    /**
     * The number of columns in the grid.
     *
     * @default 3
     */
    columns?: number
}

export const QuestionGrid: FC<QuestionGridProps> = ({
    questions,
    onChange,
    columns = 3
}) => (
    <ol className="page" style={{ columns }}>
        {questions.map((q, i) =>
            <li key={q.toString?.() ?? i}>
                <span>
                    <FillBlanksQuestion question={q} onChange={f => onChange(f, i)} />
                </span>
            </li>
        )}
    </ol>
)
