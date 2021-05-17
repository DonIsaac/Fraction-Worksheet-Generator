import { Fraction } from "./fraction"
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

        describe("negative flag", () => {
            it("When not provided, defaults to false", () => {
                expect(new Fraction(1, 2).isNegative).toBeFalsy()
            })
        })
    }) // !constructor

    describe.each([
        [0.5, new Fraction(1, 2)],
        [0.75, new Fraction(3, 4)],
        [-0.5, new Fraction(1, 2, true)],
        [0, new Fraction(0, 1)],
    ])("#fromDecimal(%d) factory", (dec, frac) => {
        // const randDecimalTestArray = (count: number) => {
        //     let arr: Array<[Fraction, number]> | undefined

        //     const genArray = () => {
        //         const a: Array<[Fraction, number]> = []
        //         for (let i = 0; i < count; i++) {
        //             const n = Math.round(Math.random() * Number.MAX_SAFE_INTEGER)
        //             const d = Math.round(Math.random() * Number.MAX_SAFE_INTEGER)
        //             const isNeg = Math.random() < 0.5
        //             const expected = (isNeg ? -1 : 1) * (n / d)
        //             a.push([new Fraction(n, d, isNeg), expected])
        //         }

        //         return a
        //     }

        //     if (!arr) arr = genArray()
        //     return arr
        // }

        let actual: Fraction

        beforeAll(() => {
            actual = Fraction.fromDecimal(dec)
        })

        it(`== ${frac}`, () => {
            expect(Fraction.fromDecimal(dec)).toEqual(frac)
        })

        it(".toDecimal() returns the original decimal", () => {
            expect(actual.toDecimial()).toEqual(dec)
        })
    })

    describe.each([
        [new Fraction(1, 2), 0.5],
        [new Fraction(3, 4, true), -0.75],
        [new Fraction(0, 2), 0]
    ])(".toDecimal(%s)", (frac, expected) => {
        it(`turns ${frac} into ${expected}`, () => {
            expect(frac.toDecimial()).toEqual(expected)
        })
    })

    describe(".strictEq(other)", () => {
        it.each([new Fraction(1, 2), new Fraction(4, 5, true)])
            ("Fractions always equal themselves", frac => {
                expect(frac.strictEq(frac)).toBeTruthy()
            })

        it.each([
            [1, 2, false],
            [15, 10, true],
            [0, 1, false],
            [25, 3, true]
        ])("Identical fractions are strictly equal", (n, d, neg) => {
            const f1 = new Fraction(n, d, neg)
            const f2 = new Fraction(n, d, neg)
            expect(f1.strictEq(f2)).toBeTruthy()
        })

        it.each([
            [new Fraction(0, 2), new Fraction(0, 1)],
            [new Fraction(0, 5, true), new Fraction(0, 5, false)]
        ])("Fractions are strictly equal  hen both numerators are 0", (f1, f2) => {
            expect(f1.strictEq(f2)).toBeTruthy()
        })

        it.each([
            [new Fraction(1, 2), new Fraction(2, 4)],
            [new Fraction(3, 4, false), new Fraction(3, 4, true)],
            [new Fraction(35, 100), new Fraction(70, 2)]
        ])("%s.strictEq(%s) is false", (f1, f2) => {
            expect(f1.strictEq(f2)).toBeFalsy()
        })
    })

    describe(".eq(other)", () => {

        it.each([new Fraction(1, 2), new Fraction(4, 5, true)])
            ("Fractions always equal themselves", frac => {
                expect(frac.eq(frac)).toBeTruthy()
            })

        it.each([
            [1, 2, false],
            [15, 10, true],
            [0, 1, false],
            [25, 3, true]
        ])("Identical fractions are equal", (n, d, neg) => {
            const f1 = new Fraction(n, d, neg)
            const f2 = new Fraction(n, d, neg)
            expect(f1.eq(f2)).toBeTruthy()
        })

        it.each([
            [new Fraction(1, 2), new Fraction(2, 4)],
            [new Fraction(2, 3), new Fraction(66, 99)],
            [new Fraction(25, 5, true), new Fraction(5, 1, true)],
            [new Fraction(0, 2), new Fraction(0, 1)],
            [new Fraction(0, 1, false), new Fraction(0, 1, true)]
        ])("%s.eq(%s) is true", (f1, f2) => {
            expect(f1.eq(f2)).toBeTruthy()
        })

        it.each([
            [new Fraction(1, 2, false), new Fraction(1, 2, true)],
            [new Fraction(5, 7, false), new Fraction(10, 14, true)],
            [new Fraction(1, 3), new Fraction(2, 3)]
        ])("%s.eq(%s) is false", (f1, f2) => {
            expect(f1.eq(f2)).toBeFalsy()
        })
    })

    describe(".equals(other)", () => {
        it.each([
            [new Fraction(4, 5), new Fraction(4, 5)],
            [new Fraction(1, 2), new Fraction(4, 8)],
            [new Fraction(9, 3, false), new Fraction(3, 1, true)],
            [new Fraction(0, 1), new Fraction(0, 2)],
            [new Fraction(0, 1, false), new Fraction(0, 1, true)],
        ])("%s.equals(%s) is true", (f1, f2) => {
            f1.equals(f2)
        })
    })

    describe(".simplify()", () => {
        describe(".simplify(3/9)", () => {
            const start = new Fraction(3, 9, false)
            let actual: Fraction

            beforeAll(() => {
                actual = start.simplify()
            })

            it("=> 1/3", () => {
                expect(actual.numerator).toEqual(1)
                expect(actual.denominator).toEqual(3)
                expect(actual.isNegative).toEqual(false)
            })

            it("Does not modify the original fraction", () => {
                expect(start.numerator).toEqual(3)
                expect(start.denominator).toEqual(9)
                expect(start.isNegative).toEqual(false)
            })
        })

        describe.each([
            [new Fraction(2, 4), new Fraction(1, 2)],
            [new Fraction(10, 20, true), new Fraction(1, 2, true)],
            [new Fraction(2, 3), new Fraction(2, 3)],
            [new Fraction(5, 8, true), new Fraction(5, 8, true)],
            [new Fraction(15, 10), new Fraction(3, 2)],
            [new Fraction(0, 4), new Fraction(0, 4)],
            [new Fraction(0, 3, true), new Fraction(0, 3, false)],
        ])("%s.simplify()", (frac, expected) => {
            let actual: Fraction

            beforeAll(() => {
                actual = frac.simplify()
            })

            it(` == ${expected}`, () => {
                expect(actual).toEqual(expected)
            })
        })
    })

    describe(".add(other)", () => {
        const cases: [Fraction, Fraction, Fraction][] = [
            [new Fraction(3, 4, false), new Fraction(7, 9, false), new Fraction(2, 3, false)],
            [new Fraction(21, 39, true), new Fraction(31, 3, false), new Fraction(28, 57, true)],
            [new Fraction(26, 30, false), new Fraction(3, 25, true), new Fraction(73, 75, false)]
        ]

        describe.each(cases)("Arithmetic properties", (a, b, c) => {
            it(`Associative: (${a} + ${b}) + ${c} == ${a} + (${b} + ${c})`, () => {
                const lhs = (a.add(b)).add(c)
                const rhs = (b.add(c)).add(a)
                expect(lhs).toEqual(rhs)
            })

            it(`Communative: ${a} + ${b} == ${b} + ${a}`, () => {
                expect(a.add(b)).toEqual(b.add(a))
            })
        })

        describe.each([
            [new Fraction(1, 2), new Fraction(1, 2), new Fraction(1, 1)],
            [new Fraction(1, 2, false), new Fraction(1, 2, true), new Fraction(0, 2, false)],
            [new Fraction(56, 68, false), new Fraction(21, 91, false), new Fraction(233, 221, false)]
        ])("%s.add(%s)", (a, b, expected) => {
            let actual: Fraction

            beforeAll(() => {
                actual = a.add(b)
            })

            it(`== ${expected}`, () => {
                expect(actual).toEqual(expected)
            })

            it(`== ${b}.add(${a}) (commutative)`, () => {
                expect(actual).toEqual(b.add(a))
            })
        })
    })
})
