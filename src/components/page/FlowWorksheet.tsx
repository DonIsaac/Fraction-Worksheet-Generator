import React, { FC } from "react"
import { shallowEqual, useSelector } from "react-redux"

import { Fraction } from "../../lib"
import store, { RootState, answerQuestion, setDone } from "../../state"
import { Button } from "../button/Button"
import { FillBlanksQuestion } from "../question"

import "./FlowWorksheet.scss"

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FlowWorksheetProps { }

/**
 * A fractions worksheet with a responsive layout. Questions are displayed in a
 * grid that changes dimensions depending on the client's viewport size. This
 * worksheet is meant to be used on a browser, not printed.
 *
 * @param props Component props
 */
export const FlowWorksheet: FC<FlowWorksheetProps> = () => {
    const {
        questions,
        isDone,
    } = useSelector<RootState, RootState["worksheet"]>(
        state => state.worksheet,
        shallowEqual,
    )

    return (
        <form className="worksheet container">
            <div className="page row">
                {questions.map(([question, answer], i) =>
                    <div key={i} className="col-12 col-sm-6 col-md-4 col-lg-2 col-xxl-1">
                        <span>
                            <FillBlanksQuestion
                                question={question}
                                userSolution={answer}
                                isDone={isDone}
                                onChange={f => answerQuestion(i, f)}
                            />
                        </span>
                    </div>,
                )}
            </div>
            <Button type="button" role="submit" primary onClick={setDone}>Finish</Button>
        </form>
    )
}
