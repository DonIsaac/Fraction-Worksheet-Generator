/**
 * Finds the greatest common divisor between two numbers
 *
 * @param a
 * @param b
 *
 * @see {@link https://en.wikipedia.org/wiki/Euclidean_algorithm Euclid's Algorithm}
 */
export const gcd = (a: number, b: number): number =>
    b <= 0
        ? a
        : gcd(b, a % b)

/**
 * Multiplies a decimal by 10 until it is an integer
 *
 * ```ts
 * floatToInt(1.5) // => [15, 10]
 * floatToInt(7) // => [7, 1]
 * floatToInt(3.14) // => [314, 100]
 * ```
 * @param num
 * @param scale Used for recursive calls. Do not use this.
 */
export const floatToInt = (num: number, scale: number = 1): [number, number] =>
    Number.isInteger(num) && (num < Number.MAX_VALUE / 100)
        ? [num, scale]
        : floatToInt(num * 10, scale * 10)

export class Fraction {

    /**
     * Creates a fraction from a decimal number. The fraction will be automatically
     * simplified.
     *
     * @param num
     */
    public static fromDecimal(num: number): Fraction {
        const isNeg = num < 0
        if (isNeg) num *= -1
        const [n, d] = floatToInt(num)

        return new Fraction(n, d, isNeg)
    }

    constructor(
        public numerator: number,
        public denominator: number,
        public isNegative = false
    ) {
        if (
            numerator < 0 ||
            // Also returns false if numerator is NaN, infinity, not typeof "number", etc.
            !Number.isInteger(numerator)
        ) {
            throw new RangeError(`Illegal numerator ${numerator}: must be a finite integer greater than or equal to 0`)
        }

        if (
            denominator <= 0 ||
            // Also returns false if numerator is NaN, infinity, not typeof "number", etc.
            !Number.isInteger(denominator)
        ) {
            throw new RangeError(`Illegal denominator ${denominator}: must be a positive finite integer`)
        }

        this.numerator = numerator
        this.denominator = denominator
        this.isNegative = isNegative
        // this.simplify()
    }

    public toDecimial(): number {
        return (this.isNegative ? -1 : 1) * (this.numerator / this.denominator)
    }

    public strictEq(other: Fraction) {
        return this.numerator === other.numerator &&
            this.denominator === other.denominator &&
            this.isNegative === other.isNegative
    }

    public eq(other: Fraction): boolean {
        // return this.toDecimial() === other?.toDecimial()
        return this.simplify().strictEq(other.simplify())
    }
    public equals = this.eq

    public toString(): string {
        return (this.isNegative ? "-" : "") +
            `${this.numerator}/${this.denominator}`
    }

    public simplify(): Fraction {
        const divisor = gcd(this.numerator, this.denominator)

        return new Fraction(this.numerator / divisor, this.denominator / divisor, this.isNegative)
        // this.numerator /= divisor
        // this.denominator /= divisor
    }
}
