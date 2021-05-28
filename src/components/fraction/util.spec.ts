import { getDisplayMode, invalidFrac } from "./util"

describe("invalidFrac(n, d)", () => {
    it.each([
        ["1","1"],
        ["-5", "2"],
        ["0", "8"],
        ["0000000", "000001"],
    ])("invalidFrac(%s,%s) returns false", (n, d) => {
        expect(invalidFrac(n, d)).toBeFalsy()
    })
})

describe("getDisplayMode(...)", () => {
    describe("When the worksheet is not done", () => {
        const isDone = false

        it("always returns 'input'", () => {
            expect(getDisplayMode({ isDone, isCorrect: true, userSolution: ["", ""] })).toBe("input")
            expect(getDisplayMode({ isDone, isCorrect: false, userSolution: ["", ""] })).toBe("input")
            expect(getDisplayMode({ isDone, isCorrect: false, userSolution: ["1", "2"] })).toBe("input")
            expect(getDisplayMode({ isDone, isCorrect: false, userSolution: ["asdfasd", "0"] })).toBe("input")
        })
    })
    describe("When the worksheet is done", () => {
        const isDone = true

        it("Returns 'incomplete' when user answer is incorrect but one or both fields are empty", () => {
            expect(getDisplayMode({ isDone, isCorrect: false, userSolution: ["", ""] })).toBe("incomplete")
        })
    })
})
