# Journey Technical Test

Product list code refactor from Vanilla JS with Bootstrap Styling to NextJS with the Pages Router using TypeScript, Vitest, and reusable components.

Test coverage reporting using [Codecov](https://about.codecov.io/).

[![codecov](https://codecov.io/gh/jasontcrabtree/journey-tech-test/graph/badge.svg?token=OOXRKRT4MM)](https://codecov.io/gh/jasontcrabtree/journey-tech-test)

## Local Development

1. Download the GitHub repository to your local machine using `gh repo clone https://github.com/jasontcrabtree/journey-tech-test`
2. Navigate into the refactored folder `cd refactor-jasoncrabtree`
3. Run the NextJS project `npm run dev`
4. In a separate terminal window, run `npm run test:coverage` to run Vitest to see test results and code coverage

## Test Strategy

Tests focus on how the two core users of end-users and other developers may interact with components and pages in the future.

Testing is done with [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

### High-Level Test Info:

1. Full app runs with all components rendered
2. Product list render the expected number of products
3. Product cards display the correct information (Title, price, currency, type)
4. Changing the selected currency display an update price
5. Selecting a different product type filter visible products
