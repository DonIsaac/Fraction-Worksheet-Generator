
import React from "react"
// import ReactDOM, { unmountComponentAtNode } from "react-dom"
import { render, RenderResult, screen } from "@testing-library/react"
import { Fraction } from "../../lib/fractions"
import { FractionComponent } from "./Fraction"
import { debug } from "console"

describe("<FractionComponent />", () => {

    describe.each([
        [1, 2],
        [3, 4],
        [15, 10]
    ])
    ("When rendering a positive fraction", (n, d) => {
        let actual: RenderResult

        beforeEach(() => {
            const frac = new Fraction(n, d)
            actual = render(<FractionComponent frac={frac} />)
        })

        afterEach(() => {
            actual.unmount()
            actual = null as unknown as RenderResult
        })


        it(`Has a numerator displaying ${n}`, () => {
            const numerator = actual.container.querySelector(".numerator")
            expect(numerator).not.toBeNull()
            expect(numerator).toHaveTextContent(`${n}`)
        })

        it(`Has a denominator displaying ${d}`, () => {
            const denominator = actual.container.querySelector(".denominator")
            expect(denominator).not.toBeNull()
            expect(denominator).toHaveTextContent(`${d}`)
        })

        it("Has no negative sign", () => {
            expect(actual.container.querySelector(".negative")).toBeNull()
        })
    })

    describe.each([
        [1, 2],
        [3, 4],
        [15, 10]
    ])
    ("When rendering a negative fraction", (n, d) => {
        let actual: RenderResult

        beforeEach(() => {
            const frac = new Fraction(n, d, true)
            actual = render(<FractionComponent frac={frac} />)
        })

        afterEach(() => {
            actual.unmount()
            actual = null as unknown as RenderResult
        })


        it(`Has a numerator displaying ${n}`, () => {
            const numerator = actual.container.querySelector(".numerator")
            expect(numerator).not.toBeNull()
            expect(numerator).toHaveTextContent(`${n}`)
        })

        it(`Has a denominator displaying ${d}`, () => {
            const denominator = actual.container.querySelector(".denominator")
            expect(denominator).not.toBeNull()
            expect(denominator).toHaveTextContent(`${d}`)
        })

        it("Has a negative sign", () => {
            expect(actual.container.querySelector(".negative")).not.toBeNull()
        })
    })

    describe("Displaying parenthesis", () => {
        describe("<FractionComponent frac={1/3} parens />", () => {
            let actual: RenderResult

            beforeEach(() => {
                const frac = new Fraction(1, 3)
                actual = render(<FractionComponent frac={frac} parens />)
            })

            it("Contains two parenthasis elements", () => {
                expect(actual.container.querySelectorAll(".paren")).toHaveLength(2)
            })

            it("Contains a left parenthasis", () => {
                expect(actual.queryByText("(")).not.toBeNull()
            })

            it("Contains a right parenthasis", () => {
                expect(actual.queryByText(")")).not.toBeNull()
            })

            afterEach(() => {
                actual.unmount()
                actual = null as unknown as RenderResult
            })

        })
        describe.each([
            [1, 2]
        ])("Default behavior", (n, d) => {
            let pos: Fraction, neg: Fraction
            beforeEach(() => {
                pos = new Fraction(n, d, false)
                neg = new Fraction(n, d, true)
            })

            it("Does not display parenthesis for positive fractions by default", () => {
                let actual = render(<FractionComponent frac={pos} />)
                expect(actual.container.querySelector(".paren")).toBeNull()
            })

            it("Does not display parenthesis for negative fractions by default", () => {
                let actual = render(<FractionComponent frac={neg} />)
                expect(actual.container.querySelector(".paren")).toBeNull()
            })
        })
    })
})
