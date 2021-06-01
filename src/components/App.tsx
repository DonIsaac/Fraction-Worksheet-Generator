import React, { FC, useState } from "react"

import {
    FlowWorksheet,
    Footer,
    Header,
    HeaderLinkName,
    SettingsForm
} from "./page"
import { dispatchers } from "../state"
import { Modal } from "./modal"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import logo from "./logo.svg"
import "./App.scss"
import { ErrorBoundary } from "./boundary/ErrorBoundary"

const App: FC = () => {
    const [modalVisible, setModalVisible] = useState(false)
    const [questionsGenerated, setQuestionsGenerated] = useState(false)

    if (!questionsGenerated) {
        dispatchers.generateQuestions(24)
        setQuestionsGenerated(true)
    }

    const hideModal = () => setModalVisible(false)
    const onHeaderClick = (linkName: HeaderLinkName) => {
        if (linkName == "settings") {
            setModalVisible(!modalVisible)
        }
    }

    return (
        <>
            <Header onClick={onHeaderClick}/>
            <Modal
                visible={modalVisible}
                title="Settings"
                onClose={hideModal}
            >
                <ErrorBoundary>
                    <SettingsForm onDone={hideModal}/>
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
