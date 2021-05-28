import React, { FC, useMemo } from "react"
import {
    MapStateToProps, MapStateToPropsParam, shallowEqual, useDispatch, useSelector
} from "react-redux"
import {
    Fraction, Nullable, Question, solveQuestion,
} from "../../lib"
import { answerQuestion, QuestionState, RootState } from "../../state"
import { FractionInput, FractionInputMode, FractionInputProps } from "../fraction"
import { FractionInputEventHandler } from "../fraction/types"
import { getDisplayMode, userInputToFraction } from "../fraction/util"
import { QuestionBody } from "./QuestionBody"

export interface FillBlanksQuestionProps {
    question: Question
    isDone: boolean
    onChange: FractionInputEventHandler
    numerator: string
    denominator: string
}

/**
 * Displays a "fill in the blanks" question. The user is prompted with a fraction
 * input where they may type in their solution.
 *
 * @param props
 *
 * @see QuestionBody
 * @see FractionInput
 */
export const FillBlanksQuestion: FC<FillBlanksQuestionProps> = ({
    question,
    isDone,
    numerator,
    denominator,
    ...rest
}) => {
    const solution = useMemo(() => solveQuestion(question), [question])
    const isCorrect = useMemo(
        () => {

            const f = userInputToFraction(numerator, denominator)
            return typeof f !== "string" && f.eq(solution)
        },
        [numerator, denominator, solution]
    )
    const mode = useMemo(
        () => getDisplayMode({
            isDone,
            isCorrect,
            userSolution: [numerator, denominator],
        }),
        [isDone, isCorrect, numerator, denominator]
    )
    const props: FractionInputProps = {
        mode,
        numerator,
        denominator,
        ...rest,
    }
    return (
        <QuestionBody question={question}>
            <span className="operation">=</span>
            <FractionInput {...props} />
            {
                // FIXME you know what to do
                // !isDone ? null :
                //     isCorrect ?
                //         <span>Correct!</span> :
                //         <span>Wrong! Answer is {
                //             solveQuestion(question).toString()
                //         }
                //         </span>
            }
        </QuestionBody>

    )
}

export interface ConnectedFillBlanksQuestionProps {
    questionNum: number
}

export const ConnectedFillBlanksQuestion: FC<ConnectedFillBlanksQuestionProps> = ({
    questionNum,
}) => {
    const dispatch = useDispatch()
    const {
        question,
        answer: [numerator = "", denominator = ""],
    } = useSelector<RootState, QuestionState>(
        state => state.worksheet.questions[questionNum],
        shallowEqual
    )

    const isDone = useSelector<RootState, boolean>(
        state => state.worksheet.isDone,
        shallowEqual
    )
    const onAnswerChange: FractionInputEventHandler = (field, val) => {
        if(field === "numerator") {
            dispatch(answerQuestion(questionNum, val, denominator))
        } else {
            dispatch(answerQuestion(questionNum, numerator, val))
        }
    }

    const props: FillBlanksQuestionProps = {
        onChange: onAnswerChange,
        question,
        isDone,
        numerator,
        denominator,
    }
    return <FillBlanksQuestion {...props} />
}
// const mapStateToProps: MapStateToProps<
//     FillBlanksQuestionProps,
//     ConnectedFillBlanksQuestionProps,
//     RootState
// > = (state, ownProps) => {

// }
