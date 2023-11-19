import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import Debug from "debug"

import App from "./app/App"
import store from "./app/state"
import reportWebVitals from "./reportWebVitals"

import "./index.scss"

// Namespaces need to be manually enabled because webpack weirdness
const namespaces = process.env.DEBUG || (
    process.env.NODE_ENV === "production"
        ? ""
        : "frac:*"
)

Debug.enable(namespaces)
Debug.log = console.info.bind(console)
const container = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
container.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// To log results (for example: reportWebVitals(console.log))
// Or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// ReportWebVitals(console.log)
reportWebVitals()
