import { generateFraction, randomInt } from "./generate"

describe("randomInt", () => {
    it("is integer", () => {
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

    it("integer within bounds", () => {
        const x = randomInt(5, 10)
        expect(x).toBeGreaterThanOrEqual(5)
        expect(x).toBeLessThan(10)

        const y = randomInt(-1, 100)
        expect(y).toBeGreaterThanOrEqual(-1)
        expect(y).toBeLessThan(100)
    })
})
