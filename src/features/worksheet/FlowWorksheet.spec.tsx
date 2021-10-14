
import React from "react"
import ReactDOM, { unmountComponentAtNode } from "react-dom"
import { Provider } from "react-redux"

import { FlowWorksheet } from "./FlowWorksheet"
import store from "../../app/state"

describe("<FlowWorksheet />", () => {
    let mount: HTMLDivElement

    beforeEach(() => {
        mount = document.createElement("div")
        document.body.appendChild(mount)
        ReactDOM.render(
            <Provider store={store}>
                <FlowWorksheet />
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
