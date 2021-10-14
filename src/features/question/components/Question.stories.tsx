import { Story, Meta } from "@storybook/react"
import { Operation } from "../"
import { QuestionBody, QuestionBodyProps } from "./QuestionBody"
import Fraction, { FractionDisplay } from "../fraction"


export default {
    title:         "Questions/Question Body",
    component:     QuestionBody,
    subcomponents: { FractionDisplay },
} as Meta

const Template: Story<QuestionBodyProps> = (args) => <QuestionBody {...args} />

export const BasicAddition = Template.bind({})
BasicAddition.args = {
    question: {
        operation: Operation.Addition,
        left:      new Fraction(1, 2),
        right:     new Fraction(3, 4),
    },
}

export const BasicSubtraction = Template.bind({})
BasicSubtraction.args = {
    question: {
        operation: Operation.Subtraction,
        left:      new Fraction(1, 2),
        right:     new Fraction(3, 4),
    },
}

export const BasicMultiplication = Template.bind({})
BasicMultiplication.args = {
    question: {
        operation: Operation.Multiplication,
        left:      new Fraction(1, 2),
        right:     new Fraction(3, 4),
    },
}

export const BasicDivision = Template.bind({})
BasicDivision.args = {
    question: {
        operation: Operation.Division,
        left:      new Fraction(1, 2),
        right:     new Fraction(3, 4),
    },
}
