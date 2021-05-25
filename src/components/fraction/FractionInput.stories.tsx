import { Story, Meta } from "@storybook/react/types-6-0"
import { Operation, Fraction } from "../../lib"
import { FractionInput, FractionInputProps } from "./FractionInput"

export default {
    title: "Fractions/Fraction Inputs",
    component: FractionInput,
} as Meta


const Template: Story<FractionInputProps> = ({ }) => <FractionInput onChange={() => null} />

export const Empty = Template.bind({})
