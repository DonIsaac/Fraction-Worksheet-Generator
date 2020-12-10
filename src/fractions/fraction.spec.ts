import { Fraction, gcd, floatToInt } from "./fraction"
const SEED = 7403854

describe("Fraction", () => {
    describe("constructor", () => {
        describe("numerator values", () => {
            it("cannot be negative", () => {
                expect(() => new Fraction(-1, 2)).toThrow()
                expect(() => new Fraction(-1, 2, true)).toThrow()
                expect(() => new Fraction(-1, -2)).toThrow()

            })
            it("may be 0", () => {
                expect(() => new Fraction(0, 1)).not.toThrow()
                expect(() => new Fraction(0, 1, true)).not.toThrow()
            })
            it("cannot be NaN or infinite", () => {
                expect(() => new Fraction(Number.POSITIVE_INFINITY, 2)).toThrow()
                expect(() => new Fraction(Number.NEGATIVE_INFINITY, 2)).toThrow()
                expect(() => new Fraction(NaN, 2)).toThrow()
            })
            it("must be a whole number", () => {
                expect(() => new Fraction(1.5, 2)).toThrow()
                expect(() => new Fraction(1.000000000005, 2, true)).toThrow()
                expect(() => new Fraction(-1.5, 2)).toThrow()
            })
        })

        describe("denominator values", () => {
            it("cannot be negative", () => {
                expect(() => new Fraction(1, -2)).toThrow()
                expect(() => new Fraction(-1, -2)).toThrow()
                expect(() => new Fraction(-1, -2, true)).toThrow()
            })
            it("cannot be zero", () => {
                expect(() => new Fraction(1, 0)).toThrow()
            })
            it("cannot be NaN or infinite", () => {
                expect(() => new Fraction(1, Number.POSITIVE_INFINITY)).toThrow()
                expect(() => new Fraction(1, Number.NEGATIVE_INFINITY)).toThrow()
                expect(() => new Fraction(1, NaN)).toThrow()
            })
            it("must be a whole number", () => {
                expect(() => new Fraction(1, 1.5)).toThrow()
                expect(() => new Fraction(1, .9999999999)).toThrow()
                expect(() => new Fraction(1, -10.5)).toThrow()
            })
        })
    }) // !constructor

    describe("fromDecimal factory", () => {
        const randDecimalTestArray = (count: number) => {
            let arr: Array<[Fraction, number]> | undefined

            const genArray = () => {
                const a: Array<[Fraction, number]> = []
                for(let i = 0; i < count; i++) {
                    const n = Math.round(Math.random() * Number.MAX_SAFE_INTEGER)
                    const d = Math.round(Math.random() * Number.MAX_SAFE_INTEGER)
                    const isNeg = Math.random() < 0.5
                    const expected = (isNeg ? -1 : 1) * (n/d)
                    a.push([new Fraction(n, d, isNeg), expected])
                }

                return a
            }

            if(!arr) arr = genArray()
            return arr
        }

        it.skip.each([
            [new Fraction(1,2), 0.5],
            [new Fraction(1, 2, true), -0.5],
            [new Fraction(0,1), 0],
            [new Fraction(0,1, true), 0],
            [new Fraction(1, 3), 1/3],
            // ...randDecimalTestArray(2 << 8)
        ])("should create %s from %d", (frac, dec) => {
            expect(Fraction.fromDecimal(dec).eq(frac)).toBeTruthy()
        })
    })
})

describe("gcd", () => {
    it("should work", () => {
        expect(gcd(1, 1)).toBe(1)
        expect(gcd(10, 5)).toBe(5)
    })
})
