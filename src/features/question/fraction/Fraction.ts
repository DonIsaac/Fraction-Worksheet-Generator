import {
    floatToInt,
    gcd,
    lcm,
    randomInt
} from "../../../lib/util"
import { FractionGeneratorOpts, Strategies } from "./types"

export default class Fraction {

    /**
     * Creates a {@link Fraction} from a decimal number. The fraction will be automatically
     * simplified.
     *
     * @param num The decimal number.
     * @returns A simplified {@link Fraction} with a value equivalent to `num`.
     */
    public static fromDecimal(num: number): Fraction {
        const isNeg = num < 0
        if (isNeg) num *= -1
        const [n, d] = floatToInt(num)

        return new Fraction(n, d, isNeg).simplify()
    }

    /**
     * Creates a random {@link Fraction} constrained by various options.
     *
     * Options:
     * - `negative`: `true` to make the fraction negative, `false` otherwise.
     * - `range`: min, max values the numerator, denominator may take.
     * - `mixedFractions`: result may be (but is not guaranteed to be) a mixed
     *   fraction.
     * - `strategy`: specifies how number values are created.
     *
     * @see {@link FractionGeneratorOpts} Options object type definition
     *
     * @param options An options object to customize how fractions are created.
     * @returns A newly created {@link Fraction}.
     */
    public static generateFraction(options: FractionGeneratorOpts): Fraction {
        const { strategy = "default", ...opts } = options
        const { mixedFractions, negative } = opts
        const gen = Fraction.generators[strategy]

        // Generate a random denominator value
        const denominator = gen(opts)

        // Generate a random numerator value. Use random scalar to increase value if
        // Mixed values are desired
        const numerator = gen(opts) * (mixedFractions
            ? randomInt(1, Fraction.MIXED_FRAC_SCALAR)
            : 1)

        // Random sign if negatives are enabled false otherwise
        // Const isNeg = negative && Math.random() < 0.5

        return new Fraction(numerator, denominator, negative)
    }

    /**
     * Maximum scale factor for mixed fractions. The actual scalar multiplied to
     * the generated numerator value is `[1, MIXED_FRAC_SCALAR)`.
     */
    private static MIXED_FRAC_SCALAR = 3
    private static generators: Record<
        Strategies,
        (opts: FractionGeneratorOpts) => number
    > = {
            "default": ({ range: [min, max] }) => randomInt(min, max),
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
        denominator = 1,
        isNegative: boolean | null = null
    ) {
        if (
            !Number.isInteger(numerator)
        ) {
            throw new RangeError(
                `Illegal numerator ${numerator}: must be a ` +
                "finite integer greater than or equal to 0"
            )
        }
        if (numerator < 0 && isNegative === false) {
            throw new Error("Numerator value was negative, but fraction was explicitly declared positive")
        }

        if (
            denominator <= 0 ||
            !Number.isInteger(denominator)
        ) {
            throw new RangeError(
                `Illegal denominator ${denominator}: must be a ` +
                "positive finite integer"
            )
        }

        this.numerator = Math.abs(numerator)
        this.denominator = denominator
        this.isNegative = numerator < 0 || !!isNegative
        // This.simplify()
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
    public strictEq(other: Fraction): boolean {
        // Same object pointer
        return this === other ||
            // Both are 0
            (this.numerator === 0 && other.numerator === 0) ||
            // Numerator, denominator, and sign are the same
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
        // Return this.toDecimial() === other?.toDecimial()
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
            this.isNegative
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

        const n1 = this.sign * this.numerator * s1
        const n2 = other.sign * other.numerator * s2

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
            this.sign * other.sign < 0
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
