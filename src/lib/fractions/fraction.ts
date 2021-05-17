import { floatToInt, gcd, lcm } from "../util"

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

        return new Fraction(n, d, isNeg).simplify()
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
        // same object pointer
        return this === other ||
            // Both are 0
            (this.numerator === 0 && other.numerator === 0) ||
            // numerator, denominator, and sign are the same
            (this.numerator === other.numerator &&
                this.denominator === other.denominator &&
                this.isNegative === other.isNegative)
    }

    public eq(other: Fraction): boolean {
        // return this.toDecimial() === other?.toDecimial()
        if (
            this === other ||
            (this.numerator === 0 && other.numerator === 0)
        ) {
            return true
        } else {
            return this.simplify().strictEq(other.simplify())
        }
    }
    public equals = this.eq

    public simplify(): Fraction {
        if (!this.numerator) {
            return new Fraction(0, this.denominator, false)
        }

        const divisor = gcd(this.numerator, this.denominator)

        return new Fraction(
            this.numerator / divisor,
            this.denominator / divisor,
            this.isNegative
        )
        // this.numerator /= divisor
        // this.denominator /= divisor
    }

    public add(other: Fraction) {
        const denom = lcm(this.denominator, other.denominator),
            s1 = denom / this.denominator,
            s2 = denom / other.denominator

        const n1 = this.sign * this.numerator * s1,
            n2 = other.sign * other.numerator * s2

        const numerator = n1 + n2
        const neg = numerator < 0

        return new Fraction(Math.abs(numerator), denom, neg).simplify()
    }

    public toString(): string {
        return (this.isNegative ? "-" : "") +
            `${this.numerator}/${this.denominator}`
    }

    private get sign(): number {
        return this.isNegative ? -1 : 1
    }
}
