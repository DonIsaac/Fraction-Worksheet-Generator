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

    public readonly numerator: number
    public readonly denominator: number
    public readonly isNegative: boolean

    /**
     * Creates a new `Fraction`.
     *
     * @param numerator     The fraction's numerator. Must be positive.
     * @param denominator   The fraction's denominator. Cannot be zero.
     * @param isNegative    `true` to make the fraction negative, `false` to make it positive.
     */
    constructor(
        numerator: number,
        denominator: number = 1,
        isNegative: boolean | null = null,
    ) {
        if (
            !Number.isInteger(numerator)
        ) {
            throw new RangeError(`Illegal numerator ${numerator}: must be a finite integer greater than or equal to 0`)
        }
        if (numerator < 0 && isNegative === false) {
            throw new Error("Numerator value was negative, but fraction was explicitly declared positive")
        }

        if (
            denominator <= 0 ||
            !Number.isInteger(denominator)
        ) {
            throw new RangeError(`Illegal denominator ${denominator}: must be a positive finite integer`)
        }

        this.numerator = Math.abs(numerator)
        this.denominator = denominator
        this.isNegative = numerator < 0 || !!isNegative
        // this.simplify()
    }

    public toDecimal(): number {
        return (this.isNegative ? -1 : 1) * (this.numerator / this.denominator)
    }

    /**
     * Checks if `this` is exactly equal to `other`, regardless if they are
     * equivalent.
     *
     * @param other the fraction to check against.
     *
     * @returns `true` if the two fractions are exactly equal, `false` otherwise.
     */
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

    /**
     * Checks if `this` is mathematically equal to `other`.
     *
     * @param other The fraction to check against.
     *
     * @returns `true` if they are equal, `false` otherwise.
     */
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

    /**
     * Alias to `Fraction#eq()
     *
     * @see Fraction.prototype.eq
     */
    public equals = this.eq

    public simplify(): Fraction {
        if (!this.numerator) {
            return new Fraction(0, this.denominator, false)
        }

        const divisor = gcd(this.numerator, this.denominator)

        return new Fraction(
            this.numerator / divisor,
            this.denominator / divisor,
            this.isNegative,
        )
    }

    /**
     * Adds `this` fraction with `other`.
     *
     * @param other
     */
    public add(other: Fraction): Fraction {
        const denom = lcm(this.denominator, other.denominator),
            s1 = denom / this.denominator,
            s2 = denom / other.denominator

        const n1 = this.sign * this.numerator * s1,
            n2 = other.sign * other.numerator * s2

        const numerator = n1 + n2
        const neg = numerator < 0

        return new Fraction(Math.abs(numerator), denom, neg).simplify()
    }

    /**
     * Subtracts `other` from `this`.
     *
     * @param other
     */
    public sub(other: Fraction): Fraction {
        const denom = lcm(this.denominator, other.denominator),
            s1 = denom / this.denominator,
            s2 = denom / other.denominator

        const n1 = this.sign * this.numerator * s1,
            n2 = other.sign * other.numerator * s2

        const numerator = n1 - n2
        const neg = numerator < 0

        return new Fraction(Math.abs(numerator), denom, neg).simplify()
    }

    /**
     * Multiplies `this` with `other`.
     *
     * @param other
     */
    public mult(other: Fraction): Fraction {
        return new Fraction(
            this.numerator * other.numerator,
            this.denominator * other.denominator,
            this.sign * other.sign < 0,
        ).simplify()
    }

    /**
     * Divides `other` from `this`.
     *
     * @param other
     */
    public div(other: Fraction): Fraction {
        if (other.numerator === 0) {
            throw new Error("Cannot divide by zero.")
        }

        return this.mult(other.reciprocal())
    }

    /**
     * Gets the reciprocal of this fraction.
     *
     * ```ts
     * new Fraction(1, 2).reciprocal() // => 2/1
     * ```
     */
    public reciprocal(): Fraction {
        if (this.numerator === 0) {
            throw new Error("Cannot take reciprocal of zero")
        }

        return new Fraction(this.denominator, this.numerator, this.isNegative)
    }

    public toString(): string {
        return (this.isNegative ? "-" : "") +
            `${this.numerator}/${this.denominator}`
    }

    private get sign(): number {
        return this.isNegative ? -1 : 1
    }
}
