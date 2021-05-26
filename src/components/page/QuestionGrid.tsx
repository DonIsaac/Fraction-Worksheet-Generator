import React, { FC } from "react"
import { Fraction, Question, zip } from "../../lib"
import { FillBlanksQuestion } from "../question"

import "./QuestionGrid.scss"

export interface QuestionGridProps {

    /**
     * The questions to display in the grid
     */
    questions: Question[]

    /**
     * Solutions provided by the user. null if the input is blank or incomplete.
     */
    userSolutions: (Fraction | null)[]

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

    isDone?: boolean
}

export const QuestionGrid: FC<QuestionGridProps> = ({
    questions,
    userSolutions,
    onChange,
    columns = 3,
    isDone = false,
}) => (
    <ol className="page" style={{ columns }}>
        {zip(questions, userSolutions).map(([q, s], i) =>
            <li key={q.toString?.() ?? i}>
                <span>
                    <FillBlanksQuestion
                        question={q}
                        userSolution={s}
                        isDone={isDone}
                        onChange={f => onChange(f, i)}
                    />
                </span>
            </li>,
        )}
    </ol>
)
