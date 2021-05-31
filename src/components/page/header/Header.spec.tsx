import React from "react"
// Import ReactDOM, { unmountComponentAtNode } from "react-dom"
import {
    fireEvent,
    render,
    RenderResult,
} from "@testing-library/react"
import { Header } from "./Header"

describe("<NavBar />", () => {

    let actual: RenderResult
    const onChange = jest.fn()

    beforeEach(() => {
        actual = render(<Header />)
    })

    afterEach(() => {
        actual?.unmount()
        onChange.mockClear()
        actual = null as unknown as RenderResult
    })

    it("Renders successfully", () => {
        expect(actual.container.children.length).toBeGreaterThanOrEqual(1)
    })

    it("Uses a <header> tag", () => {
        expect(actual.baseElement.querySelector("header")).not.toBeNull()
    })
})
