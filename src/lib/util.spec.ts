import { Operation } from "."
import {
    randomInt,
    raise,
    gcd,
    floatToInt,
    times,
    symbolFor,
    lcm
} from "./util"

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

describe("gcd", () => {
    describe.each([
        [1, 1, 1],
        [7, 15, 1],
        [10, 5, 5],
        [0, 4, 4]
    ])("gcd(%d, %d)", (a, b, expected) => {
        let actual: number

        beforeAll(() => {
            actual = gcd(a, b)
        })

        it(`=== ${expected}`, () => {
            expect(actual).toEqual(expected)
        })

        it(` === gcd(${b}, ${a})`, () => {
            expect(actual).toEqual(gcd(b, a))
        })
    })
    // it("should work", () => {
    //     expect(gcd(1, 1)).toBe(1)
    //     expect(gcd(7, 15)).toBe(1)
    //     expect(gcd(10, 5)).toBe(5)
    // })
})

describe("lcm", () => {
    it.each([
        [5, 10, 10],
        [0, 55, 0]
    ])("lcm(%d, %d) == %d", (a, b, expected) => {
        expect(lcm(a, b)).toEqual(expected)
    })
})

describe("floatToInt", () => {

    describe.each([
        [1.5, 15, 10],
        [-2.5, -25, 10],
        [7, 7, 1],
        [-2, -2, 1],
        [12.25, 1225, 100],
        [0, 0, 1]
    ])("floatToInt(%s)", (input, asInt, scaleFactor) => {
        let actual: [number, number]

        beforeAll(() => {
            actual = floatToInt(input)
        })

        it("Returns an array with 2 elements", () => {
            expect(actual).toBeInstanceOf(Array)
            expect(actual).toHaveLength(2)
        })

        it(`Scales ${input} to ${asInt}`, () => {
            expect(actual[0]).toEqual(asInt)
        })

        it(`Uses a scale factor of ${scaleFactor}`, () => {
            expect(actual[1]).toEqual(scaleFactor)
        })
    })
})

describe("times", () => {
    let fn: jest.Mock

    beforeAll(() => {
        fn = jest.fn()
    })

    afterEach(() => {
        fn.mockClear()
    })

    it.each([0, 1, 5, 20])
    ("Calls a function a specified number of times", n => {
        times(n)(fn)
        expect(fn).toBeCalledTimes(n)
    })

    it("Passes the iteration number as an argument", () => {
        let n = 0
        times(15)(i => {
            expect(i).toEqual(n)
            n++
        })
    })

    it("Iterates 0 times if n < 0", () => {
        times(-1)(fn)
        expect(fn).toBeCalledTimes(0)
    })
})

describe("symbolFor", () => {
    describe.each([
        Operation.Addition,
        Operation.Subtraction,
        Operation.Multiplication,
        Operation.Division
    ])("symbolFor(%s)", input => {
        let actual: string

        beforeAll(() => {
            actual = symbolFor(input)
        })

        it("Returns a string", () => {
            expect(typeof actual).toEqual("string")
        })

        it("Is a single character long", () => {
            expect(actual).toHaveLength(1)
        })

        it("Is valid UTF", () => {
            expect(actual.charCodeAt(0)).toBeLessThanOrEqual(0xffff)
        })
    })
})
