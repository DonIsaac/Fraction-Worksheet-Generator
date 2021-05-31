import { Story, Meta } from "@storybook/react/types-6-0"
import { Operation, Fraction } from "../../../lib"
import { FractionInput, FractionInputProps } from "./FractionInput"

export default {
    title:      "Fractions/Fraction Inputs",
    component:  FractionInput,
    parameters: {
        expanded: true,
        // Jest: "FractionInput.spec.tsx"
    },
} as Meta


const Template: Story<Omit<FractionInputProps, "onChange">> = args =>
    <FractionInput onChange={() => null} {...args} />

export const InputEmpty = Template.bind({})
export const Correct = Template.bind({})
Correct.args = {
    mode:        "correct",
    numerator:   "1",
    denominator: "2",
}
export const Incorrect = Template.bind({})
Incorrect.args = {
    mode:        "incorrect",
    numerator:   "1",
    denominator: "2",
}
