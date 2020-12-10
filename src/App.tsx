import React from 'react'
import { BrowserRouter as Router, Link } from "react-router-dom"
import logo from './logo.svg'
import './App.css'
import { Fraction, FractionComponent } from './fractions'

function App() {
  const testFractions = [
    new Fraction(1, 2),
    new Fraction(5, 15),
    new Fraction(1, 3, true),
  ]
  return (
    <div className="App">
      <header className="App-header">
        {testFractions.map(f => <FractionComponent frac={f} key={f.toString()} />)}
      </header>
    </div>
  )
}

export default App
