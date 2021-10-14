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

        it.each([
            ["", ""],
            ["1", "2"],
            ["asdfasdfas", "2"],
            ["1", "0"],
        ] as [string, string][])
        ("always returns 'input'", (...userSolution: [string, string]) => {
            expect(getDisplayMode({ isDone, isCorrect: true, userSolution })).toBe("input")
            expect(getDisplayMode({ isDone, isCorrect: false, userSolution })).toBe("input")
        })
    })
    describe("When the worksheet is done", () => {
        const isDone = true

        it("Returns 'incomplete' when user answer is incorrect but one or both fields are empty", () => {
            expect(getDisplayMode({ isDone, isCorrect: false, userSolution: ["", ""] })).toBe("incomplete")
        })

        it("Returns 'incorrect' if inCorrect is true and userSolution is valid", () => {
            expect(getDisplayMode({ isDone, isCorrect: false, userSolution: ["1", "2"] })).toBe("incorrect")
        })
    })
})
