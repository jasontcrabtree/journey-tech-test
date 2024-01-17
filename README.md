# Journey Technical Test

Product list code refactor from Vanilla JS with Bootstrap Styling to NextJS with the Pages Router using TypeScript, Vitest, and reusable components

## Local Development

1. Download the GitHub repository to your local machine using `gh repo clone https://github.com/jasontcrabtree/journey-tech-test`
2. Navigate into the refactored folder `cd refactor-jasoncrabtree`
3. Run the NextJS project `npm run dev`
4. In a separate terminal window, run `npm run test:coverage` to run Vitest to see test results and code coverage

## Test Strategy

Tests focus on how the two core users of end-users and other developers may interact with components and pages in the future

Testing is done with [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

### User Focused Tests:

1. Does the product list render the expected number of products
2. Does each product card display the correct information (Title, price based on selected currency, type)
3. Does changing the selected currency display an update price
4. Does selecting a different product type filter visible products

## Test Coverage

Test coverage reporting using Codecov

[![codecov](https://codecov.io/gh/jasontcrabtree/journey-tech-test/graph/badge.svg?token=OOXRKRT4MM)](https://codecov.io/gh/jasontcrabtree/journey-tech-test)
