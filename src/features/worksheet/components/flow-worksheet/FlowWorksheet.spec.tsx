import React from "react"
import ReactDOM, { unmountComponentAtNode } from "react-dom"
import { Provider } from "react-redux"

import { ConnectedFlowWorksheet } from "./FlowWorksheet"
import store from "../../../../app/state"

describe("<ConnectedFlowWorksheet />", () => {
    let mount: HTMLDivElement

    beforeEach(() => {
        mount = document.createElement("div")
        document.body.appendChild(mount)
        ReactDOM.render(
            <Provider store={store}>
                <ConnectedFlowWorksheet />
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
