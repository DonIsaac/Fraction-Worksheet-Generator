import { Middleware } from "redux"
import Debug from "debug"

const debug = Debug("frac:state:middleware")

export const logger: Middleware = store => next => action => {
    debug("dispatching action: %O", action)
    const result = next(action)
    debug("next state: %O", store.getState())

    return result
}

export const crashReporter: Middleware = store => next => action => {
    try {
        return next(action)
    } catch (err) {
        debug("State at error: %O", store.getState())
        err.state = store

        throw err
    }
}
