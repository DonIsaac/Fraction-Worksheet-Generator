import Debug from "debug"
import { generateQuestion, Question } from "../lib"
import { setQuestions } from "./questions"
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
