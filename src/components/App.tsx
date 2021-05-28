import React, { FC } from "react"
// import { BrowserRouter as Router, Link } from "react-router-dom"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import logo from "./logo.svg"
import "./App.scss"
import { FlowWorksheet } from "./page/FlowWorksheet"
import { dispatchers } from "../state"

const App: FC = () => {
    dispatchers.generateQuestions(24)
    return (
        <div className="App">
            <header className="App-header">
                <FlowWorksheet />
            </header>
        </div>
    )
}

export default App
