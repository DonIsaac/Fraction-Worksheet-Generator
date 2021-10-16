import React, { FC } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"


import "./FlowWorksheet.scss"
import { RootState, generateQuestions } from "../../../../app/state"
import { ConnectedFillBlanksQuestion } from "../../../question"
import { times } from "ramda"
import { clearQuestions, setDone } from "../../state"
import { ControlButtonGroup, ControlButtonGroupProps } from "../ControlButtonGroup"
import { SettingsForm } from "../settings"

export const ConnectedFlowWorksheet: FC = () => {
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

    // TODO: Move settings form modal here
    const onSettingsDone = () => {
        debug("onSettingsDone() called")

        // Create new worksheet if convenient and possible
        if (
            !isDone &&
            isWorksheetEmpty() &&
            !shallowEqual(oldQuestionConfig, questionConfig)
        ) {
            generateQuestions(NUM_QUESTIONS)
        }

        // Save preferences to local storage
        saveQuestionConfigStore(questionConfig)

        // Hide settings modal
        setModalVisible(false)
    }

    const onSettings = () => {
        setOldQuestionConfig(questionConfig)
        setModalVisible(!modalVisible)
    }
    return <>
        <FlowWorksheet
            numQuestions={numQuestions}
            isDone={isDone}
            onDone={finishWorksheet}
            onReset={resetWorksheet}
            onSettingsOpen={onSettings}
        />
        <SettingsForm />
    </>
}

export interface FlowWorksheetProps extends ControlButtonGroupProps {
    numQuestions: number
}

/**
 * A fractions worksheet with a responsive layout. Questions are displayed in a
 * grid that changes dimensions depending on the client's viewport size. This
 * worksheet is meant to be used on a browser, not printed.
 *
 * @param props Component props
 */
export const FlowWorksheet: FC<FlowWorksheetProps> = ({
    numQuestions,
    ...rest
}) => {
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
                <ControlButtonGroup {...rest} />
            </form>
        </main>
    )
}
