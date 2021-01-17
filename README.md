# todo-project

## overview

This project contains two sets of tests: UI and API tests.
By looking at the number of tests within the features at first sight it may be counter-intuitive: in this case there are a lot more UI tests than lower-level integration tests.

In a real-life project majority of UI tests (testing the React component itself) would sit in their own project, and there would be less high-level (and potentially slow) end-to-end tests.

With regards to API tests, there would be a lot more of them and possibly in different forms (contract-tests if using microservices, and API acceptance tests). 
It is debatable whether it's a good idea to use BDD format for such tests (and if using it, whether it should refer to technical details), also there are other frameworks that support such tests and format, such as [Karate framework](https://github.com/intuit/karate). I chose cypress only to have both solutions packaged into one.

## running it on your local machine

Pre-requisites: Docker installed.

1. Clone this repository: `git clone git@github.com:vangelato/todo-project.git`
2. Go inside todo-project directory: `cd todo-project`
3. Issue: `docker run -it -v $PWD:/e2e -w /e2e --entrypoint=/bin/bash`
4. We are now inside the docker container, we would need to install a few depedencies, to do it simply run: `npm install`
5. Once that has finished, issue: `./node_modules/.bin/cypress-tags run -e TAGS='@ui'`

This should run the tests marked with `@ui` tag. You can combine the tags together with logical operators, e.g. changing the above to `-e TAGS='@ui and @api'` would run all tests.
