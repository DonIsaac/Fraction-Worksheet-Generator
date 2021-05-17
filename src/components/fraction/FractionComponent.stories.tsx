
import { Story, Meta } from "@storybook/react/types-6-0"
import { Operation, Fraction } from "../../lib"
import { FractionComponent, FractionComponentProps, FractionInput } from "./Fraction"

export default {
    title: "Fractions/Fraction Displays",
    component: FractionComponent,
    argTypes: {
        numerator: {
            type: "number",
            min: 0,
            description: "Fraction's numerator value. Must be greater than 0."
        },
        denominator: {
            type: "number",
            description: "Fraction's denominator value. Cannot be 0."
        },
        parens: {
            type: "boolean",
            description: "Flag to surround the fraction with parenthesis",
            defaultValue: false
        },
        isNegative: {
            type: "boolean",
            description: "True if the fraction is negative, false if positive",
            defaultValue: false
        }
    },
} as Meta

const parameters = {
    controls: { expanded: true },
    jest: ["Fraction.spec.tsx"]
}

type FractionComponentStoryProps = {
    parens: boolean
    isNegative: boolean
    numerator: number,
    denominator: number
}
const Template: Story<FractionComponentStoryProps> = ({
    parens,
    isNegative,
    numerator: num,
    denominator: denom
}) => <FractionComponent parens={parens} frac={new Fraction(num, denom, isNegative)} />

export const Basic = Template.bind({})
Basic.args = {
    parens: false,
    numerator: 1,
    denominator: 2,
    isNegative: false
}
Basic.parameters = parameters
// Basic.argTypes =  {

// }

export const Negative = Template.bind({})
Negative.args = {
    ...Basic.args,
    isNegative: true
}
Negative.parameters = parameters

export const WithParens = Template.bind({})
WithParens.args = {
    ...Basic.args,
    parens: true
}
WithParens.parameters = parameters
