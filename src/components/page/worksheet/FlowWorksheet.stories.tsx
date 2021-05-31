
import { Story, Meta } from "@storybook/react/types-6-0"
import { Provider } from "react-redux"
import { createStore } from "redux"
import { Fraction, Operation } from "../../../lib"
import store, { QuestionState, RootState, setQuestions } from "../../../state"
// import store from "../../../state"
import { FlowWorksheet, FlowWorksheetProps } from "./FlowWorksheet"

export default {
    title:      "Page/Flow Worksheet",
    component:  FlowWorksheet,
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
const Template: Story<FlowWorksheetProps> = () => (
    <Provider store={store}>
        <FlowWorksheet />
    </Provider>
)

export const EmptyWorksheet = Template.bind({})
