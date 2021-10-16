import Debug from "debug"
import { generateQuestion, Question } from "../../features/question"
import { setQuestions } from "../../features/worksheet/worksheet.store"
import store from "./store"

const debug = Debug("frac:state:dispatch")

/**
 * Generates a random set of questions using the user's question generation
 * settings.
 *
 * @param num the number of questions to generate
 *
 * @see generateQuestion
 */
export const generateQuestions = (num: number): void => {
    debug("generating %d questions", num)
    const questions: Question[] = []
    const { questionConfig } = store.getState()

    for (let i = 0; i < num; i++) {
        questions.push(generateQuestion(questionConfig))
    }

    store.dispatch(setQuestions(questions))
}

// TODO: Move this out of dispatchers. Need to extract questions state into
// separate folder first.
/**
 * Checks if the user has not started answering questions yet.
 *
 * @returns `true` if all answers are empty, `false` otherwise.
 */
export const isWorksheetEmpty = (): boolean => store.getState().worksheet.questions
    .map(q => q.answer)                      // Extract worksheet answers
    .map(([n, d]) => !n.length && !d.length) // Each el is true if n & d are empty
    .reduce((acc, el) => acc && el)          // Logical and it all together
