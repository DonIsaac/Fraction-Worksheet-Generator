import React, { FC } from "react"
import { generateQuestion } from "../../lib/questions/question.gen"
import { QuestionGrid } from "./QuestionGrid"

import "./Worksheet.scss"

export interface WorksheetProps {

}

export const Worksheet: FC<WorksheetProps> = () => {
    const questions = Array.from({ length: 10 }).map(() => generateQuestion())
    return (
        <QuestionGrid questions={questions} onChange={() => {}} />
        // <Button
    )
}
