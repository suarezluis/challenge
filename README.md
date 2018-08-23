# Project Timer Challenge

## The Challenge

This application is a loose clone of the application [Toggl](https://toggl.com). The repository contains some issues: [X] bugs we would like you to fix, and [X] features that we want you to implement. To take the challenge:

- Fork this repository
- In your own copy, solve the bugs and implement the features outlined in the issues.
- Each issue is considered "done" when:
  - The code for the solution has been written and is demonstrably correct (the bug is gone, the feature works).
  - Tests have been written that verify the above.
  - All tests are passing.
  - This README has been updated to reflect any relevant changes (features only).
  
### Time

We only expect candidates to spend about 8 hours on the challenge. Note that this does not mean that we expect you to _finish_ all issues in 8 hours. You should read through the issues and strategically select a few challenges that you think you can really nail in that time. Anything past that is bonus. It is better to be thorough with one or two issues than to half-complete all of them.

### Hints for success

- Organize your solutions logically, either by commits or even by branches. This makes it easier to see your process.
- Commit often, and use descriptive commit messages. Each commit should be easily summarized in a short phrase. If you find yourself writing "and" a lot, it's probable that you have more than one commit on your hands.
- Do not try to solve all of the issues at once. Tackle each ticket on its own.
- If you are familiar with TDD, try to write the tests first.
- If you get stuck on an issue, or cannot easily satisfy all of the "done" criteria, move on to the next issue. The goal is to have some fresh work to discuss at your technical interview. Better half done than not done at all. Bonus, sometimes solving one problem will help you understand another.

The challenge is designed to take a maximum of 8 hours. If you can track your hours, try to match that time.

### Resources:

- [Github Basics](https://guides.github.com/activities/hello-world)
- [TDD (Test Driven Development)](https://www.agilealliance.org/glossary/tdd)
- [This Repo's Wiki](https://github.com/moove-it/challenge/wiki)

## Installing dependencies

### Install Node

This app assumes you have Node.js v8.11.3. If you aren't sure you have node, run `node -v` from the command line. If it comes back with `v8.11.x`, you are good to go. Otherwise, download the LTS version here: (https://nodejs.org/en/). Once installation is complete, run `node -v` again to confirm your version.

## Installing the app

### Fork and clone the repository

If you haven't already, fork this repository to your own [GitHub](https://github.com/) account. Clone your copy of the repository and `cd` into the project directory.

### Install packages

From the project directory, run `npm install` to install the application dependencies.

## Run the app

Run `npm start` to start the development server.

In your browser, navigate to `localhost:8080`. You should see the landing page: "Welcome to Minutero".

## Run the tests

Run `npm test` after installation to confirm that all of the tests pass.
