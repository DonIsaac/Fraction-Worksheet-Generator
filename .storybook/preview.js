import { addDecorator } from "@storybook/react"
import { withTests } from "@storybook/addon-jest"

import results from "./.jest-test-results.json"
import "../src/index.scss";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

addDecorator(
  withTests({ results })
)
