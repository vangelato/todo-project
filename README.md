# todo-project

## running it on your local machine

Pre-requisites: Docker installed.

1. Clone this repository: `git clone git@github.com:vangelato/todo-project.git`
2. Go inside todo-project directory: `cd todo-project`
3. Issue: `docker run -it -v $PWD:/e2e -w /e2e --entrypoint=./node_modules/.bin/cypress-tags cypress/included:6.2.1 run -e TAGS='@ui'`

This should run the tests marked with `@ui` tag. You can combine the tags together with logical operators, e.g. changing the above to `-e TAGS='@ui and @api'` would run all tests.
