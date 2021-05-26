// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0"
import { Operation, Fraction } from "../../lib"
import { QuestionBody, QuestionBodyProps } from "./QuestionBody"


export default {
    title:     "Fractions/Questions",
    component: QuestionBody,
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
