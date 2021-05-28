import React from "react"
import ReactDOM, { unmountComponentAtNode } from "react-dom"
import { Provider } from "react-redux"

import App from "./App"
import store from "../state"

describe("<App />", () => {
    let mount: HTMLDivElement

    beforeEach(() => {
        mount = document.createElement("div")
        document.body.appendChild(mount)
        ReactDOM.render(
            <Provider store={store}>
                <App />
            </Provider>
            ,
            mount
        )
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
