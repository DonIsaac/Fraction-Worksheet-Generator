import { generateFraction } from "./fraction.gen"
import { randomInt } from "../util"

const TEST_ITERS = 16

// Hacky `TEST_ITERS.times |x|`
describe.each(Array(TEST_ITERS).fill(1))
("generateFraction", () => {
    const gen = ([min, max]: [number, number]) => randomInt(min, max)

    beforeAll(() => {
        expect(typeof gen([1, 10])).toBe("number")
    })
    afterAll(() => {
        // Jest.spyOn(global.Math, "random").mockRestore()
    })
    afterEach(() => {
        // Gen.mockClear()
    })

    it("creates positive fractions if negative == false", () => {
        // For(let i = 0; i < TEST_ITERS; i++) {
        expect(generateFraction(gen)({
            negative:       false,
            range:          [1, 10],
            mixedFractions: false,
        }).isNegative).toBeFalsy()
        // }
    })
    it("creates negative fractions if negative == true", () => {
        // For(let i = 0; i < TEST_ITERS; i++) {
        expect(generateFraction(gen)({
            negative:       true,
            range:          [1, 10],
            mixedFractions: false,
        }).isNegative).toBeTruthy()
        // }
    })
    it("should respect the value range", () => {
        const range: [number, number] = [1, 10]
        const f = generateFraction(gen)({
            negative:       false,
            range,
            mixedFractions: false,
        })
        expect(f.numerator).toBeGreaterThanOrEqual(range[0])
        expect(f.denominator).toBeGreaterThanOrEqual(range[0])
        expect(f.numerator).toBeLessThanOrEqual(range[1])
        expect(f.denominator).toBeLessThanOrEqual(range[1])
    })


})
