import React, { FC } from "react"
import { BrowserRouter as Router, Link } from "react-router-dom"
import logo from "./logo.svg"
import "./App.scss"
import { Fraction, Operation } from "../lib"
import { Question } from "../lib"
import { FractionComponent } from "./fraction"
import { QuestionComponent } from "./question"

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
                <Page questions={[...testFractions, ...testFractionsWithParens, ...testQuestions]} />
            </header>
        </div>
    )
    /*
    return (
        <div className="App">
            <header className="App-header">
                {testFractions.map(f => <FractionComponent frac={f} key={f.toString()} />)}
                {testFractionsWithParens.map(f => <FractionComponent frac={f} key={f.toString()} parens />)}
            </header>
        </div>
    )
    */
}

type PageProps = {
    questions: Question[]
}
const Page: FC<PageProps> = ({ questions }) => (
    <ol className="page">
        {questions.map((q, i) =>
            <li key={q.toString?.() ?? i}>
                <span>
                    <QuestionComponent question={q}  />
                </span>
            </li>
        )}
    </ol>
)
export default App
