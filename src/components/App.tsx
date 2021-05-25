import React, { FC } from "react"
import { BrowserRouter as Router, Link } from "react-router-dom"
import logo from "./logo.svg"
import "./App.scss"
import { Fraction, Operation } from "../lib"
import { Question } from "../lib"
// import { FillBlanksQuestion } from "./question/FillBlanksQuestion"
import { QuestionGrid } from "./page/QuestionGrid"

function App() {
    const testFractions = [
        new Fraction(1, 2),
        new Fraction(3, 7, true),
        new Fraction(5, 15),
        new Fraction(1, 3, true),
    ]
    const testFractionsWithParens = [
        new Fraction(7, 8),
        new Fraction(4, 5, true)
    ]
    const testQuestions: Question[] = [
        { left: new Fraction(1, 2), right: new Fraction(1, 2), operation: Operation.Addition }
    ]

    return (
        <div className="App">
            <header className="App-header">
                <QuestionGrid questions={[...testFractions, ...testFractionsWithParens, ...testQuestions]} onChange={() => {}} />
            </header>
        </div>
    )
}

export default App
