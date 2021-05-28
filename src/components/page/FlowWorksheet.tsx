import React, { FC } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import Debug from "debug"

import {
    RootState,
    answerQuestion,
    setDone,
    clearQuestions,
    setQuestions,
} from "../../state"
import { Fraction } from "../../lib"
import { Button } from "../button/Button"
import { FillBlanksQuestion } from "../question"

import "./FlowWorksheet.scss"
import { generateQuestions } from "../../state/dispatchers"
import { ConnectedFillBlanksQuestion } from "../question/FillBlanksQuestion"
import { times } from "ramda"

const debug = Debug("frac:view:FlowWorksheet")

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
    const isDone = useSelector<RootState, boolean>(
        state => state.worksheet.isDone,
        shallowEqual
    )
    const numQuestions = useSelector<RootState, number>(
        state => state.worksheet.questions.length,
        shallowEqual
    )
    const dispatch = useDispatch()
    const finishWorksheet = () => dispatch(setDone())
    const resetWorksheet = () => {
        dispatch(clearQuestions())
        generateQuestions(24)
    }
    return (
        <form className="worksheet container">
            <div className="page row">
                {times(
                    i => (
                        <div key={i} className="col-12 col-sm-6 col-md-4 col-lg-2">
                            <span className="question-number">{i + "."}</span>
                            <span className="question-wrapper">
                                <ConnectedFillBlanksQuestion questionNum={i} />
                            </span>
                        </div>
                    ),
                    numQuestions
                )}
            </div>
            {!isDone &&
                <Button
                    type="button"
                    role="submit"
                    primary
                    onClick={finishWorksheet}
                >
                    Finish
                </Button>
            }
            <Button
                type="button"
                role="reset"
                primary={isDone}
                onClick={resetWorksheet}
            >
                Reset
            </Button>
        </form>
    )
}
