import {
    randomInt,
    raise,
    gcd,
    floatToInt,
    times,
    lcm,
} from "./util"

describe("randomInt([min, max])", () => {
    it("generates integers", () => {
        const x = randomInt(5, 10)
        expect(Number.isInteger(x)).toBeTruthy()
    })

    it.each([
        // Can't be equal
        [10, 10],
        [0, 0],
        [-5, -5],
        // Can't be less
        [10, 0],
        [-4, -8],
        [1, 0],
        [0, -1],
    ])("fails if max <= min", (a, b) => {
        expect(() => randomInt(a, b)).toThrowError(RangeError)
    })

    describe.each([
        [5, 10],
        [0, 15],
        [-15, 0],
        [-20, -10],
        [-5, 5],
        [0, 1],
        [-1, 0],
        [-1046691, 11838459],
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

describe("raise(err)", () => {
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

describe("gcd(a, b)", () => {
    describe.each([
        [1, 1, 1],
        [7, 15, 1],
        [10, 5, 5],
        [0, 4, 4],
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
    // It("should work", () => {
    //     Expect(gcd(1, 1)).toBe(1)
    //     Expect(gcd(7, 15)).toBe(1)
    //     Expect(gcd(10, 5)).toBe(5)
    // })
})

describe("lcm(a, b)", () => {
    it.each([
        [5, 10, 10],
        [0, 55, 0],
    ])("lcm(%d, %d) == %d", (a, b, expected) => {
        expect(lcm(a, b)).toEqual(expected)
    })
})

describe("floatToInt(float)", () => {

    xdescribe.each([
        [-21, 5],
        [-458, 404],
        [-435, -273],
        [348, 53],
        [-426, 156],
        [-24, 133],
        [30, 46],
        [436, -135],
        [-202, 205],
        [77, 39],
        [-181, -491],
        [-364, -361],
        [-318, 407],
        [368, -378],
        [465, 105],
        [-200, 105],
        [443, 96],
        [436, 431],
        [-209, -390],
        [158, 357],
        [25, 3],
        [-116, 424],
        [-86, 59],
        [-213, 149],
        [-64, 7],
        [-487, -438],
        [-293, -73],
        [-86, 207],
        [-201, 113],
        [380, 430],
    ])("floatToInt(%d \u00f7 %d)", (a, b) => {
        let actual: [number, number]

        beforeAll(() => {
            actual = floatToInt(a / b)
        })

        it("scaled number is an integer", () => {
            expect(Number.isInteger(actual[0])).toBeTruthy()
        })

        it("scale factor is an integer", () => {
            expect(Number.isInteger(actual[1])).toBeTruthy()
        })

        it("scale factor is positive", () => {
            expect(actual[1]).toBeGreaterThan(0)
        })

        it("Multiplying the original input yields the scaled number", () => {
            const recalculated = a / b * actual[1]
            expect(actual[0]).toEqual(recalculated)
        })
    })

    describe.each([
        [1.5, 15, 10],
        [-2.5, -25, 10],
        [7, 7, 1],
        [-2, -2, 1],
        [12.25, 1225, 100],
        [0, 0, 1],
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

describe("times(n)(fn)", () => {
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
