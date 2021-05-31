import React from "react"
// Import ReactDOM, { unmountComponentAtNode } from "react-dom"
import {
    fireEvent,
    render,
    RenderResult,
} from "@testing-library/react"
import { Fraction } from "../../../lib/fractions"
import { FractionInput } from "./FractionInput"

describe("<FractionInput />", () => {
    let actual: RenderResult
    const onChange = jest.fn()

    beforeEach(() => {
        actual = render(<FractionInput onChange={onChange} numerator="" denominator="" />)
    })

    afterEach(() => {
        actual?.unmount()
        onChange.mockClear()
        actual = null as unknown as RenderResult
    })

    it("contains a single numerator input field", () => {
        const numerator = actual.container.querySelectorAll(".numerator input")
        expect(numerator).not.toBeNull()
        expect(numerator).toHaveLength(1)
    })

    it("contains a single denominator input field", () => {
        const denominator = actual.container.querySelectorAll(".denominator input")
        expect(denominator).not.toBeNull()
        expect(denominator).toHaveLength(1)
    })

    xdescribe.each([["1", "2"]])("when valid input is plugged in", (n, d) => {

        beforeEach(() => {
            actual = render(<FractionInput onChange={onChange} numerator="1" denominator="2"/>)

            const numerator = actual.container.querySelector(".numerator input")
            const denominator = actual.container.querySelector(".denominator input")
            expect(numerator).not.toBeNull()
            expect(denominator).not.toBeNull()
            fireEvent.input(numerator!, n)
            fireEvent.input(denominator!, n)
        })

        afterEach(() => {
            actual.unmount()
            onChange.mockClear()
            actual = null as unknown as RenderResult
        })

        it("calls onChange with the correct arguments", () => {
            expect(onChange).toBeCalledTimes(2)
            expect(onChange).toBeCalledWith("numerator", "1")
            expect(onChange).toBeCalledWith("denominator", "2")
        })
    })
})
