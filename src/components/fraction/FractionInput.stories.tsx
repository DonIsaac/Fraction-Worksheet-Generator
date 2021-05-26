import { Story, Meta } from "@storybook/react/types-6-0"
import { Operation, Fraction } from "../../lib"
import { FractionInput, FractionInputProps } from "./FractionInput"

export default {
    title:      "Fractions/Fraction Inputs",
    component:  FractionInput,
    parameters: {
        expanded: true,
        // jest: "FractionInput.spec.tsx"
    },
} as Meta


const Template: Story<Omit<FractionInputProps, "onChange">> = args =>
    <FractionInput onChange={() => null} {...args} />

export const InputEmpty = Template.bind({})
export const Correct = Template.bind({})
Correct.args = {
    mode:    "correct",
    display: new Fraction(1, 2),
}
export const Incorrect = Template.bind({})
Incorrect.args = {
    mode:    "incorrect",
    display: new Fraction(1, 2),
}
