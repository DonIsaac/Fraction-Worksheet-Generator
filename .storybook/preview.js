import { addDecorator } from "@storybook/react"
import { withTests } from "@storybook/addon-jest"

import results from "./.jest-test-results.json"

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

addDecorator(
  withTests({ results })
)
