import React, { FC, useMemo } from "react"
import {
    shallowEqual,
    useDispatch,
    useSelector
} from "react-redux"
import { BsCheck, BsExclamationTriangle, BsXCircle } from "react-icons/bs"
import { Nullable, Question, solveQuestion } from "../../lib"
import { answerQuestion, QuestionState, RootState } from "../../state"
import {
    FractionInput,
    FractionInputProps,
    FractionInputEventHandler,
    getDisplayMode,
    userInputToFraction,
    FractionInputMode
} from "../fraction"
import { QuestionBody } from "./QuestionBody"
import { IconBaseProps } from "react-icons"
import classNames from "classnames"

const QuestionModeIcon: FC<{ mode: FractionInputMode } & IconBaseProps> =
    ({ mode, ...props }) => {
        switch(mode) {
            case "input":      return null
            case "correct":    return <BsCheck {...props} />
            case "incorrect":  return <BsXCircle {...props} />
            case "incomplete": return <BsExclamationTriangle {...props} />
        }
    }

// const modeToIcon: Record<FractionInputMode, Nullable<JSX.Element>> = {
//     "input":      null,
//     "correct":    <BsCheck />,
//     "incorrect":  <BsXCircle />,
//     "incomplete": <BsExclamationTriangle />,

// }
export interface FillBlanksQuestionProps {
    question: Question
    isDone: boolean
    onChange: FractionInputEventHandler
    numerator: string
    denominator: string
    questionNum?: number
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
    questionNum,
    ...rest
}) => {
    // Calculate correct answer to question
    const solution = useMemo(() => solveQuestion(question), [question])
    // Check user answer against solution
    const isCorrect = useMemo(
        () => {

            const f = userInputToFraction(numerator, denominator)
            // Strings mean error messages -> incorrect
            return typeof f !== "string" && f.eq(solution)
        },
        [numerator, denominator, solution]
    )
    // Derive mode from above checks + worksheet state
    const mode = useMemo(
        () => getDisplayMode({
            isDone,
            isCorrect,
            userSolution: [numerator, denominator],
        }),
        [isDone, isCorrect, numerator, denominator]
    )
    // Pack it all up, send it down
    const props: FractionInputProps = {
        mode,
        numerator,
        denominator,
        ...rest,
    }

    return (
        <>
            {questionNum != null &&
                <span className="question-number">
                    {(questionNum + 1) + "."}
                    &nbsp;
                    <QuestionModeIcon mode={mode} className={classNames("icon", mode)} />
                </span>
            }
            <span className="question-wrapper">
                <QuestionBody question={question}>
                    <span className="operation">=</span>
                    <FractionInput {...props} />
                </QuestionBody>
            </span>
        </>
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
        questionNum,
    }
    return <FillBlanksQuestion {...props} />
}
