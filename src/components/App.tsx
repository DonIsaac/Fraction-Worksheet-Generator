import React, { FC, useState } from "react"

import {
    FlowWorksheet,
    Footer,
    Header,
    HeaderLinkName,
    SettingsForm
} from "./page"
import { dispatchers, RootState, saveQuestionConfigStore } from "../state"
import { Modal } from "./modal"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import logo from "./logo.svg"
import "./App.scss"
import { ErrorBoundary } from "./boundary/ErrorBoundary"
import { shallowEqual, useSelector } from "react-redux"

// TODO: make this configurable
const NUM_QUESTIONS = 24

const App: FC = () => {
    const [modalVisible, setModalVisible] = useState(false)
    const [questionsGenerated, setQuestionsGenerated] = useState(false)
    const [oldQuestionConfig, setOldQuestionConfig] = useState<RootState["questionConfig"] | undefined>()
    const { generateQuestions, isWorksheetEmpty } = dispatchers
    const questionConfig = useSelector<RootState, RootState["questionConfig"]>(
        state => state.questionConfig,
        shallowEqual
    )

    // First-time question generation, run only on first render
    if (!questionsGenerated) {
        generateQuestions(NUM_QUESTIONS)
        setQuestionsGenerated(true)
    }

    const onSettingsDone = () => {
        // Create a new questions set, but don't clobber existing work
        if (isWorksheetEmpty() && !shallowEqual(oldQuestionConfig, questionConfig)) {
            generateQuestions(NUM_QUESTIONS)
        }

        // Save preferences to local storage
        saveQuestionConfigStore(questionConfig)

        // Hide settings modal
        setModalVisible(false)
    }

    const onHeaderClick = (linkName: HeaderLinkName) => {
        if (linkName == "settings") {
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
