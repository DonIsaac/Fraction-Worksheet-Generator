import React from "react"
import {
    render,
    RenderResult,
} from "@testing-library/react"
import { Header } from "./Header"

describe("<NavBar />", () => {

    let actual: RenderResult
    const onClick = jest.fn()

    beforeEach(() => {
        actual = render(<Header onClick={onClick} />)
    })

    afterEach(() => {
        actual?.unmount()
        onClick.mockClear()
        actual = null as unknown as RenderResult
    })

    it("Renders successfully", () => {
        expect(actual.container.children.length).toBeGreaterThanOrEqual(1)
    })

    it("Uses a <header> tag", () => {
        expect(actual.baseElement.querySelector("header")).not.toBeNull()
    })
})
