import { useMemo } from "react"
import { shallowEqual, useSelector } from "react-redux"
import deepEqual from "fast-deep-equal"
import { RootState } from "../../../app/state/store"
import { QuestionState, WorksheetState } from "../state"

export enum WorksheetStatus {

    /** Worksheet is in progress and all questions are empty */
    Empty = "active-empty",

    /** Worksheet is in progress and some or all questions are filled in */
    InProgress = "active-in-progress",

    /** User has finished and all answers are correct */
    DoneAllCorrect = "done-all-correct",

    /**
     * User has finished. All questions are answered, and some are correct, but
     * others are incorrect.
     */
    DoneSomeCorrect = "done-some-correct",

    /**
     * User has finished. All questions are answered, and all answers are
     * incorrect.
     */
    DoneAllIncorrect = "done-all-incorrect",

    /**
     * User has finished. Answers are a mix of correct, incorrect, and missing.
     */
    DoneAllSomeMissing = "done-some-missing",

    /**
     * User has finished and no questions have been answered.
     */
    DoneAllMissing = "done-all-missing"
}

/**
 *
 * @returns
 */
export default function useWorksheetStatus(): WorksheetStatus {
    const { isDone, questions } = useSelector<RootState, WorksheetState>(
        state => state.worksheet,
        (left, right) => left.isDone === right.isDone && deepEqual(left.questions, right.questions)
    )

    const status: WorksheetStatus = useMemo(() => {
        const isEmpty = isWorksheetEmpty(questions)
        const numQuestions = questions.length

        if (isDone) {
            if (isEmpty) {
                return WorksheetStatus.DoneAllMissing
            }

            let numCorrect = 0,
                numWrong = 0,
                numMissing = 0

            for (const q of questions) {
                // TODO
                // q.
            }
        } else {
            return isEmpty ? WorksheetStatus.Empty : WorksheetStatus.InProgress
        }
    }, [isDone, questions])

    return status

}

/**
 * Checks if the user has not started answering questions yet.
 *
 * @returns `true` if all answers are empty, `false` otherwise.
 */
export const isWorksheetEmpty = (questions: WorksheetState["questions"]): boolean => questions
    .map(q => q.answer)                      // Extract worksheet answers
    .map(([n, d]) => !n.length && !d.length) // Each el is true if n & d are empty
    .reduce((acc, el) => acc && el)          // Logical and it all together
