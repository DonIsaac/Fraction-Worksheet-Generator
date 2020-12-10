import { Fraction } from './fraction'

interface WorksheetConfig {
    operations: Array<"add" | "sub" | "mult" | "div">

    /**
     * If false, neither the fractions in question or in the answer should
     * be negative
     */
    negative?: boolean;

    /**
     * [min, max] values that may appear in numerator/denominator
     */
    range: [number, number]

}

export const generateFraction = (
    digitCount: number,
    sign: boolean = Math.random() < 0.5 ? true : false
): Fraction => {
    const min = 10 ** (digitCount - 1)
    const max = 10 ** digitCount
    const numerator = randomInt(min, max)
    const denominator = randomInt(min, max)

    return new Fraction(numerator, denominator, sign)
}

export const randomInt = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min)) + min
