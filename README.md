# Fractions Worksheet Generator

[See Website](https://donisaac.dev/Fraction-Worksheet-Generator)

A web application for generating fractions practice worksheets. Students can
customize the types of questions that are included and check their work when
they are finished.

## Features

- Randomly creates new fractions each time
- Choose which types of questions you want (addition, subtraction, multiplication, and division)
- Customize fraction properties (size, negatives, mixed fractions)
- Automatically checks your work

## Development

This project uses [React](https://reactjs.org) with [TypeScript](https://www.typescriptlang.org/).
It uses [Yarn](https://yarnpkg.com) for package management - you'll need to have
it installed before continuing.

After cloning the repository and entering it, run

```sh
# install dependencies
yarn
# start the development environment
yarn dev
```

## Available Scripts

This is a summary of the highly used and useful scripts. For a comprehensive
list of available scripts, see the `scripts` field of `package.json`.

- `yarn start` - Starts the development environment with hot reloading.
- `yarn dev` - Same as `yarn start`, but enables debug logging.
- `yarn sb` - Launches [Storybook](https://storybook.js.org).
- `yarn test` - Launches the test runner ([Jest](https://jestjs.io)) in interactive mode.
- `yarn test:cov` - Same as `yarn test`, but displays a coverage report.
- `yarn lint` - Checks for style and syntax problems in the source code. Use `yarn lint:fix` to auto correct issues.
