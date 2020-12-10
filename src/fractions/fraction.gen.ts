import { Fraction } from './fraction'
import { randomInt } from './util'

export const generateFraction: FractionGeneratorFactory = (denom: () => number) => (
    digitCount: number,
    sign: boolean = Math.random() < 0.5
): Fraction => {
    const min = 10 ** (digitCount - 1)
    const max = 10 ** digitCount
    const numerator = randomInt(min, max)
    const denominator = randomInt(min, max)

    return new Fraction(numerator, denominator, sign)
}

export const generators: Record<Strategies, FractionGenerator> = {
    "default": generateFraction(() => randomInt(1, 10), () => randomInt(1, 10))
}
