import { generateFraction } from "./fraction.gen"
import { randomInt } from "../util"
import Seedrandom from "seedrandom"

const SEED = "some string to use as a seed"
const TEST_ITERS = 16

// hacky `TEST_ITERS.times |x|`
describe.each(Array(TEST_ITERS).fill(1))
("generateFraction", () => {
    let gen = ([min, max]: [number, number]) => randomInt(min, max)

    beforeAll(() => {
        expect(typeof gen([1, 10])).toBe("number")
    })
    afterAll(() => {
        // jest.spyOn(global.Math, "random").mockRestore()
    })
    afterEach(() => {
        // gen.mockClear()
    })

    it("creates positive fractions if negative == false", () => {
        // for(let i = 0; i < TEST_ITERS; i++) {
        expect(generateFraction(gen)({
            negative: false,
            range: [1, 10],
            mixedFractions: false
        }).isNegative).toBeFalsy()
        // }
    })
    it("creates negative fractions if negative == true", () => {
        // for(let i = 0; i < TEST_ITERS; i++) {
        expect(generateFraction(gen)({
            negative: true,
            range: [1, 10],
            mixedFractions: false
        }).isNegative).toBeTruthy()
        // }
    })
    it("should respect the value range", () => {
        const range: [number, number] = [1, 10]
        let f = generateFraction(gen)({
            negative: false,
            range,
            mixedFractions: false
        })
        expect(f.numerator).toBeGreaterThanOrEqual(range[0])
        expect(f.denominator).toBeGreaterThanOrEqual(range[0])
        expect(f.numerator).toBeLessThanOrEqual(range[1])
        expect(f.denominator).toBeLessThanOrEqual(range[1])
    })


})
