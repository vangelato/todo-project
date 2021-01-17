import {Given, When, Then, And} from "cypress-cucumber-preprocessor/steps";

Given('a new user is created', () => {
    cy.createUser().then(response => {
        cy.wrap(response.status).should('eq', 201)
        cy.wrap(response.body.id).as('userId')
    })
})

Given('the user has no todo items', () => {
    cy.get('@userId').then(userId => {
        cy.getTodos({userId: userId}).then(todos => cy.wrap(todos).should('deep.eq', []))
    })

})

When('the user adds a new todo item called {word}', (title) => {
    let todo = {}
    cy.get('@userId').then(userId => {
        todo.title = title
        todo.userId = userId
        cy.createTodo(todo).then(response => {
            cy.wrap(response.status).should('eq', 201)
            cy.wrap(response.body).as('createdTodo')
        })
    })
})

Then('the todo is created', () => {
    cy.get('@createdTodo').then(todo => {
        cy.getTodo(todo.id).then(resp => cy.wrap(resp.body).should('deep.eq', JSON.stringify(todo)))
    })
})

When('the user completes the todo item called {word}', () => {
    cy.get('@createdTodo').then(todo => {
        todo.completed = true
        cy.updateTodo(todo).then(response => {
            cy.wrap(response.status).should('eq', 200)
            cy.wrap(response.body).as('updatedTodo')
        })
    })
})

Then('the todo is completed', () => {
    cy.get('@createdTodo').then(todo => {
        cy.getTodo(todo.id).then(response => {
            cy.wrap(response.body.completed).should('eq',true)
        })
    })

})