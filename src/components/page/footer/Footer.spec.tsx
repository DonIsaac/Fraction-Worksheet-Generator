
import React from "react"
// Import ReactDOM, { unmountComponentAtNode } from "react-dom"
import {
    render,
    RenderResult,
} from "@testing-library/react"
import { Footer } from "./Footer"

describe("<Footer />", () => {

    let actual: RenderResult

    beforeEach(() => {
        actual = render(<Footer />)
    })

    afterEach(() => {
        actual?.unmount()
        actual = null as unknown as RenderResult
    })

    it("Renders successfully", () => {
        expect(actual.container.children.length).toBeGreaterThanOrEqual(1)
    })

    it("Uses a <footer> tag", () => {
        expect(actual.baseElement.querySelector("footer")).not.toBeNull()
    })

    it("Provides a link to my homepage", () => {
        const link = actual.container.querySelector("footer a")
        expect(link).not.toBeNull()
        expect(link?.getAttribute("href")).toMatch(/don/i)
    })
})
