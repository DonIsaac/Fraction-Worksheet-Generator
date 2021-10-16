import { Story, Meta } from "@storybook/react/types-6-0"
import { Provider } from "react-redux"
import {
    Fraction, Operation, FillBlanksQuestion, FractionDisplay, FractionInput
} from "../../../question"
import { Button } from "../../../../components/button"
import store from "../../../../app/state"
// import store from "../../../state"
import { ConnectedFlowWorksheet, FlowWorksheet } from "./FlowWorksheet"
import { QuestionState, setQuestions } from "../../state"

export default {
    title:         "Page/Flow Worksheet",
    component:     ConnectedFlowWorksheet,
    subcomponents: {
        FlowWorksheet,
        FillBlanksQuestion,
        Button,
        FractionDisplay,
        FractionInput,
    },
    parameters: {
        jest: "FlowWorksheet.spec.tsx",
    },
} as Meta

const questions: QuestionState[] = [
    {
        question: {
            operation: Operation.Subtraction,
            left:      new Fraction(9, 4),
            right:     new Fraction(13, 9),
        },
        answer: ["", ""],
    },
    {
        question: {
            operation: Operation.Multiplication,
            left:      new Fraction(2, 1),
            right:     new Fraction(3, 18),
        },
        answer: ["4", "15f"],
    },
    {
        question: {
            operation: Operation.Addition,
            left:      new Fraction(7, 1),
            right:     new Fraction(2, 1),
        },
        answer: [
            "",
            "",
        ],
    },
    {
        question: {
            operation: Operation.Addition,
            left:      new Fraction(7),
            right:     new Fraction(-5, 2),
        },
        answer: [
            "1",
            "2",
        ],
    },
]

store.dispatch(setQuestions(questions.map(q => q.question)))
const Template: Story = () => (
    <Provider store={store}>
        <ConnectedFlowWorksheet />
    </Provider>
)

export const EmptyWorksheet = Template.bind({})
