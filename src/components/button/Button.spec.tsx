
import React from "react"
import {
    fireEvent,
    render,
    RenderResult,
    screen
} from "@testing-library/react"
import { Button } from "./Button"

describe("<Button />", () => {

    let actual: RenderResult
    const text = "Hello, World!"
    const onClick = jest.fn()

    beforeEach(() => {
        actual = render(<Button onClick={onClick}>{text}</Button>)
    })

    afterEach(() => {
        actual?.unmount()
        onClick.mockClear()
        actual = null as unknown as RenderResult
    })

    it("Has a 'button' class name", () => {
        const [firstChild, ...children] = actual.container.children
        expect(firstChild).not.toBeNull()
        expect(children).toHaveLength(0)
        expect(firstChild.classList).toContain("button")
        // expect(actual.container.children.length).toBeGreaterThanOrEqual(1)
    })


    it("Calls onClick when clicked", () => {
        fireEvent.click(screen.getByText(text))
        expect(onClick).toBeCalled()
    })

})

describe("css classes", () => {

    let res: RenderResult
    let actual: HTMLElement
    const text = "Hello, World!"
    const classname = "extra-class"
    const onClick = jest.fn()

    beforeEach(() => {
        res = render(<Button className={classname} onClick={onClick}>{text}</Button>)
        actual = res.container.children[0]
    })

    afterEach(() => {
        res?.unmount()
        onClick.mockClear()
        actual = null as unknown as RenderResult
    })

    it("Appends additional class names to class list", () => {
        expect(actual.classList).toContain(classname)
    })

    it("Still has a 'button' class", () => {
        expect(actual.classList).toContain("button")
    })
})