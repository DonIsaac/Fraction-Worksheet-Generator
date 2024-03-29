import React, { FC } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"

import {
    RootState,
} from "../../app/state"
import { setDone, clearAnswers } from "./worksheet.store"
import { Button } from "../../components/button/Button"

import "./FlowWorksheet.scss"
import { ConnectedFillBlanksQuestion } from "../question"
import { times } from "ramda"
import { BsArrowClockwise, BsCheckCircle } from "react-icons/bs"

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
        dispatch(clearAnswers())
    }
    return (
        <main>
            <form className="worksheet container">
                <div className="grid row" role="list">
                    {times(
                        i => (
                            <div
                                key={i}
                                className="col-12 col-sm-6 col-md-4 col-xxl-2"
                                role="listitem"
                            >
                                <ConnectedFillBlanksQuestion questionNum={i} />
                            </div>
                        ),
                        numQuestions
                    )}
                </div>
                <div className="button-group">
                    {!isDone &&
                <Button
                    type="button"
                    role="submit"
                    primary
                    onClick={finishWorksheet}
                >
                    <BsCheckCircle /> Finish
                </Button>
                    }
                    {/* <Button
                        type="button"
                        role="reset"
                        primary={isDone}
                        onClick={resetWorksheet}
                    >
                        <BsArrowClockwise /> Reset
                    </Button> */}
                </div>
            </form>
        </main>
    )
}
