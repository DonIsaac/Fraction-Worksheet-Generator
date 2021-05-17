import { Fraction } from "../fractions/fraction"
import { randomInt } from "../util"
import { Strategies, FractionGenerator, FractionGeneratorFactory } from "../types"

/**
 * Maximum scale factor for mixed fractions. The actual scalar multiplied to
 * the generated numerator value is `[1, MIXED_FRAC_SCALAR)`.
 */
const MIXED_FRAC_SCALAR = 3

/**
 * Creates a random `Fraction`. The `Fraction` created may be constrained by
 * various options.
 *
 * Options:
 * - `negative`: `true` to make the fraction negative, `false` otherwise.
 * - `range`: min, max values the numerator, denominator may take.
 * - `mixedFractions`: result may be (but is not guaranteed to be) a mixed
 *   fraction.
 * @param gen the number generator used to create the numerator and denominator
 *            values
 *
 * @see Fraction
 */
export const generateFraction: FractionGeneratorFactory = gen => ({
    negative,
    range,
    mixedFractions
}): Fraction => {
    // generate a random denominator value
    const denominator = gen(range)
    // generate a random numerator value. Use random scalar to increase value if
    // mixed values are desired
    const numerator = gen(range) * (mixedFractions
        ? randomInt(1, MIXED_FRAC_SCALAR)
        : 1)
    // random sign if negatives are enabled false otherwise
    // const isNeg = negative && Math.random() < 0.5

    return new Fraction(numerator, denominator, negative)
}

export const generators: Record<Strategies, FractionGenerator> = {
    "default": generateFraction(([min, max]) => randomInt(min, max))
}

/*
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
*/
