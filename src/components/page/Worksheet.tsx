import React, { FC, useEffect, useState } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import {
    Question, times, QuestionGenerationConfig, Fraction,
} from "../../lib"
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
    
    const [userSolutions, setUserSolutions] = useState<(Fraction | null)[]>([])
    const setUserSolution = (f: Fraction, i: number) => userSolutions[i] = f

    const [isDone, setDone] = useState(false)

    // Generate questions list
    useEffect(() => {
        if (isDone) return

        const questions: Question[] = []
        times(rows * cols)(() => questions.push(generateQuestion(settings)))
        setQuestions(questions)
        
        const initSolutions: null[] = []
        times(rows * cols)(() => initSolutions.push(null))
        setUserSolutions(initSolutions)
    }, [rows, cols, settings, dispatch, isDone])

    return (
        <form className="worksheet">
            <QuestionGrid
                onChange={setUserSolution}
                {...{
                    columns: cols, questions, userSolutions, isDone,
                }}
            />
            <Button type="button" primary onClick={() => setDone(true)}>Finish</Button>
        </form>
        // <Button
    )
}
