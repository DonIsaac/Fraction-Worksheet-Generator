import React from "react"
import ReactDOM, { unmountComponentAtNode } from "react-dom"
import App from "./App"

describe("<App />", () => {
    let mount: HTMLDivElement

    beforeEach(() => {
        mount = document.createElement("div")
        document.body.appendChild(mount)
        ReactDOM.render(<App />, mount)
    })

    afterEach(() => {
        unmountComponentAtNode(mount)
        mount.remove()
        mount = null as unknown as HTMLDivElement
    })

    it("Renders successfully", () => {
        expect(mount.children.length).toBeGreaterThanOrEqual(1)
    })
})
