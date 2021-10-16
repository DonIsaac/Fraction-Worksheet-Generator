import React, { FC, useState } from "react"
import { shallowEqual, useSelector } from "react-redux"
import Debug from "debug"

import {
    FlowWorksheet,
    Footer,
    Header,
    HeaderLinkName,
    SettingsForm
} from "../components/page"
import { generateQuestions, isWorksheetEmpty, RootState,  } from "./state"

import Modal from "../components/modal"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import logo from "./logo.svg"
import "./App.scss"
import { ErrorBoundary } from "../components/boundary/ErrorBoundary"
import { saveQuestionConfigStore } from "../features/worksheet/question-config.store"

// TODO: make this configurable
const NUM_QUESTIONS = 24
const debug = Debug("frac:view:App")

const App: FC = () => {
    const [modalVisible, setModalVisible] = useState(false)
    const [questionsGenerated, setQuestionsGenerated] = useState(false)
    const [oldQuestionConfig, setOldQuestionConfig] = useState<RootState["questionConfig"] | undefined>()
    const questionConfig = useSelector<RootState, RootState["questionConfig"]>(
        state => state.questionConfig,
        shallowEqual
    )
    const isDone = useSelector<RootState, boolean>(
        state => state.worksheet.isDone,
        shallowEqual
    )

    // First-time question generation, run only on first render
    if (!(questionsGenerated || isDone)) {
        debug("Running first-time question generation")
        generateQuestions(NUM_QUESTIONS)
        setQuestionsGenerated(true)
    }

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

    const onHeaderClick = (linkName: HeaderLinkName) => {
        debug("onHeaderClick('%s') called", linkName)

        if (linkName === "settings") {
            setOldQuestionConfig(questionConfig)
            setModalVisible(!modalVisible)
        }
    }

    return (
        <>
            <Header onClick={onHeaderClick}/>
            <Modal
                visible={modalVisible}
                title="Settings"
                onClose={onSettingsDone}
            >
                <ErrorBoundary>
                    <SettingsForm onDone={onSettingsDone}/>
                </ErrorBoundary>
            </Modal>
            <ErrorBoundary>
                <FlowWorksheet />
            </ErrorBoundary>
            <Footer />
        </>
    )
}

export default App
