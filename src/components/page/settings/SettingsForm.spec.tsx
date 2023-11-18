import { Provider } from "react-redux"
import ReactDOM, { unmountComponentAtNode } from "react-dom"
import { SettingsForm } from "./SettingsForm"
import store from "../../../app/state"

describe("<SettingsForm />", () => {
    let mount: HTMLDivElement
    let onDone: jest.Mock

    beforeEach(() => {
        onDone = jest.fn()
        mount = document.createElement("div")
        document.body.appendChild(mount)
        ReactDOM.render(
            <Provider store={store}>
                <SettingsForm onDone={onDone}/>
            </Provider>
            ,
            mount
        )
    })

    afterEach(() => {
        onDone.mockClear()
        unmountComponentAtNode(mount)
        mount.remove()
        mount = null as unknown as HTMLDivElement
    })

    it("Renders successfully", () => {
        expect(mount.children.length).toBeGreaterThanOrEqual(1)
    })

    it("should call onDone when submit button is clicked", () => {
        const done = mount.querySelector("button[role='submit']")
        expect(done).not.toBeNull()
        // todo: click done and assert onDone is called
        // done.
    })
})