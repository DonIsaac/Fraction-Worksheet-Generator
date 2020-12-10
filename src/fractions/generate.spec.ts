import { generateFraction } from './fraction.gen'
import { randomInt } from './util'

describe("randomInt", () => {
    it("generates integers", () => {
        const x = randomInt(5, 10)
        expect(Number.isInteger(x)).toBeTruthy()
    })

    describe("bound checks", () => {
        let x: number
        beforeAll(() => {
            x = randomInt(5, 10)
        })

        it("should be greater than or equal to 5", () => {
            expect(x).toBeGreaterThanOrEqual(5)
        })

        it("should be less than to 10", () => {
            expect(x).toBeLessThan(10)
        })
    })
})
