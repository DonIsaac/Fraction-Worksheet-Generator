import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import Debug from "debug"

import App from "./components/App"
import store from "./state"
import reportWebVitals from "./reportWebVitals"

import "./index.css"

const namespaces = process.env.DEBUG || (
    process.env.NODE_ENV === "production"
        ? ""
        : "frac:*"
)

Debug.enable(namespaces)
Debug.log = console.info.bind(console)

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// To log results (for example: reportWebVitals(console.log))
// Or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// ReportWebVitals(console.log)
reportWebVitals()
