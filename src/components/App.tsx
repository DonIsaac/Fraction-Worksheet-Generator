import React, { FC } from "react"
// import { BrowserRouter as Router, Link } from "react-router-dom"
import logo from "./logo.svg"
import "./App.scss"
import { Worksheet } from "./page/Worksheet"

const App: FC = () => {

    return (
        <div className="App">
            <header className="App-header">
                <Worksheet cols={5} rows={16} />
            </header>
        </div>
    )
}

export default App
