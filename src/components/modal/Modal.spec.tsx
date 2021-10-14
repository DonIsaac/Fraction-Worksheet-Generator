
import React from "react"
import {
    fireEvent,
    render,
    RenderResult,
} from "@testing-library/react"
import Modal from "./Modal"

const isModalVisible = (modal: HTMLElement) => modal.style.display !== "none"

describe("<Modal />", () => {

    /** Render result */
    let res: RenderResult
    const onClose = jest.fn()
    let actual: HTMLElement

    beforeEach(() => {
        res = render(<Modal visible onClose={onClose} />)
        const { firstChild } = res.container
        expect(firstChild).not.toBeNull()
        expect(firstChild).toBeInstanceOf(HTMLElement)
        actual = firstChild as HTMLElement
    })

    afterEach(() => {
        res?.unmount()
        onClose.mockClear()
        res = null as unknown as RenderResult
        actual = null as unknown as HTMLElement
    })

    it("Renders successfully", () => {
        expect(actual).not.toBeNull()
        expect(actual).toBeInTheDocument()
    })

    it("is visible by default", () => {
        expect(isModalVisible(actual)).toBeTruthy()
    })

})

describe("<Modal visible=true />", () => {

    /** Render result */
    let res: RenderResult
    const onClose = jest.fn()
    let actual: HTMLElement

    beforeEach(() => {
        res = render(<Modal visible onClose={onClose} />)
        const { firstChild } = res.container
        expect(firstChild).not.toBeNull()
        expect(firstChild).toBeInstanceOf(HTMLElement)
        actual = firstChild as HTMLElement
    })

    afterEach(() => {
        res?.unmount()
        onClose.mockClear()
        res = null as unknown as RenderResult
        actual = null as unknown as HTMLElement
    })

    it("Renders successfully", () => {
        expect(actual).not.toBeNull()
        expect(actual).toBeInTheDocument()
    })

    it("is visible", () => {
        expect(isModalVisible(actual)).toBeTruthy()
    })

    it("Closes when the escape key is pressed", () => {
        fireEvent.keyDown(actual, { key: "Escape", code: "Escape", which: 27 } as KeyboardEvent)
        expect(onClose).toBeCalled()
    })


})

describe("<Modal visible=false />", () => {

    /** Render result */
    let res: RenderResult
    const onClose = jest.fn()
    let actual: HTMLElement

    beforeEach(() => {
        res = render(<Modal visible={false} onClose={onClose} />)
        const { firstChild } = res.container
        expect(firstChild).not.toBeNull()
        expect(firstChild).toBeInstanceOf(HTMLElement)
        actual = firstChild as HTMLElement
    })

    afterEach(() => {
        res?.unmount()
        onClose.mockClear()
        res = null as unknown as RenderResult
        actual = null as unknown as HTMLElement
    })

    it("Renders successfully", () => {
        expect(actual).not.toBeNull()
        expect(actual).toBeInTheDocument()
    })

    it("is not visible", () => {
        expect(isModalVisible(actual)).toBeFalsy()
    })

    it("Does not close when the escape key is pressed", () => {
        fireEvent.keyDown(actual, { key: "Escape", code: "Escape", which: 27 } as KeyboardEvent)
        expect(onClose).not.toBeCalled()
    })
})
