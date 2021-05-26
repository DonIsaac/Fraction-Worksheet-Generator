import React, { FC, useEffect, useState } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { Question, times, QuestionGenerationConfig } from "../../lib"
import { generateQuestion } from "../../lib/questions/question.gen"
import { RootState } from "../../state"
import { setQuestions, WorksheetState } from "../../state/questions"
import { Button } from "../button/Button"
import { QuestionGrid } from "./QuestionGrid"

import "./Worksheet.scss"

export interface WorksheetProps {
    cols: number
    rows: number
}

export const Worksheet: FC<WorksheetProps> = ({
    cols,
    rows,
}) => {
    const dispatch = useDispatch()
    const settings = useSelector<RootState, QuestionGenerationConfig>(
        state => state.questionConfig,
        shallowEqual,
    )

    const [questions, setQuestions] = useState<Question[]>([])
    const [done, setDone] = useState(false)

    // Generate questions list
    useEffect(() => {
        if (done) return

        const questions: Question[] = []
        times(rows * cols)(() => questions.push(generateQuestion(settings)))
        setQuestions(questions)
    }, [rows, cols, settings, dispatch, done])

    return (
        <form className="worksheet">
            <QuestionGrid
                onChange={() => {}}
                {...{ columns: cols, questions, isDone: done }}
            />
            <Button type="submit" primary>Finish</Button>
        </form>
        // <Button
    )
}
