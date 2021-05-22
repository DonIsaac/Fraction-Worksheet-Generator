import React, { FC } from "react"
import { Question } from "../../lib"
import { FillBlanksQuestion } from "../question"

type PageProps = {
    questions: Question[]
}

const Page: FC<PageProps> = ({ questions }) => (
    <ol className="page">
        {questions.map((q, i) =>
            <li key={q.toString?.() ?? i}>
                <span>
                    <FillBlanksQuestion question={q} onChange={() => {}} />
                </span>
            </li>
        )}
    </ol>
)
