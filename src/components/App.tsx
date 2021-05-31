import React, { FC } from "react"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import logo from "./logo.svg"
import "./App.scss"
import { FlowWorksheet, Footer, Header } from "./page"
import { dispatchers } from "../state"

const App: FC = () => {
    dispatchers.generateQuestions(24)
    return (
        <>
            <Header />
            <FlowWorksheet />
            <Footer />
        </>
    )
}

export default App
