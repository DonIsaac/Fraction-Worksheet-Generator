/* eslint-disable capitalized-comments */

import { useState } from "react"
import { Story, Meta } from "@storybook/react"
import { FillBlanksQuestion, FillBlanksQuestionProps } from "./FillBlanksQuestion"
import { QuestionBody } from "./QuestionBody"
import Fraction, { FractionDisplay, FractionInput, FractionInputEventHandler } from "../fraction"
import { Question, Operation } from ".."


export default {
    title:         "Questions/'Fill in the Blanks' Question",
    component:     FillBlanksQuestion,
    subcomponents: { QuestionBody, FractionDisplay, FractionInput },
    parameters:    {
        actions: { argTypesRegex: "on.*" },
    },
} as Meta

const question: Question = {
    operation: Operation.Addition,
    left:      new Fraction(1, 2),
    right:     new Fraction(1, 2),
}

const Template: Story<Omit<FillBlanksQuestionProps, "numerator" | "denominator" | "onChange">> = args => {
    const [n, setN] = useState("")
    const [d, setD] = useState("")
    const onChange: FractionInputEventHandler = (field, val) =>
        field === "numerator"
            ? setN(val)
            : setD(val)

    return (
        <FillBlanksQuestion
            {...args}
            numerator={n}
            denominator={d}
            onChange={onChange}
        />
    )
}

export const InProgress = Template.bind({})
Template.args = {
    question,
    isDone:      false,
    questionNum: 1,
}
