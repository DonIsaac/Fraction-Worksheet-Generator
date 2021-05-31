import React, { FC, useState } from "react"

import { FlowWorksheet, Footer, Header } from "./page"
import { dispatchers } from "../state"
import { Modal } from "./modal"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import logo from "./logo.svg"
import "./App.scss"

const App: FC = () => {
    const [modalVisible, setModalVisible] = useState(false)
    const [questionsGenerated, setQuestionsGenerated] = useState(false)

    if (!questionsGenerated) {
        dispatchers.generateQuestions(24)
        setQuestionsGenerated(true)
    }

    const onHeaderClick = (linkName: string) => {
        setModalVisible(!modalVisible)
    }

    return (
        <>
            <Header onClick={onHeaderClick} />
            <Modal visible={modalVisible} onClose={() => setModalVisible(false)} />
            <FlowWorksheet />
            <Footer />
        </>
    )
}

export default App
