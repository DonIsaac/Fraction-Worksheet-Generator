import { invalidFrac } from "./util"

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
