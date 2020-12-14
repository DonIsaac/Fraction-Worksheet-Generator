import { randomInt, raise } from "./util"

describe("randomInt", () => {
    it("generates integers", () => {
        const x = randomInt(5, 10)
        expect(Number.isInteger(x)).toBeTruthy()
    })

    it("fails if max <= min", () => {
        // can't be equal
        expect(() => randomInt(10, 10)).toThrowError(RangeError)
        // can't be less
        expect(() => randomInt(10, 0)).toThrowError(RangeError)
    })

    describe.each([
        [5, 10],
        [0, 15],
        [-15, 0],
        [-20, -10],
        [-5, 5]
    ])("bound checks: [%d, %d]", (min, max) => {
        let x: number
        beforeAll(() => {
            x = randomInt(min, max)
        })

        it(`should be greater than or equal to ${min}`, () => {
            expect(x).toBeGreaterThanOrEqual(min)
        })

        it(`should be less than to ${max}`, () => {
            expect(x).toBeLessThan(max)
        })
    })
})

describe("raise", () => {
    it("is a function", () => {
        expect(typeof raise).toBe("function")
    })

    it("accepts and raise an Error", () => {
        const err = new RangeError("something bad happened")
        const tst = () => raise(err)

        expect(tst).toThrow(err)
        expect(tst).toThrow(RangeError)
    })

    it("accepts a message and raise it as an error", () => {
        const msg = "your detailed error message"
        const tst = () => raise(msg)

        expect(tst).toThrow(msg)
        expect(tst).toThrow(Error)
    })
})
