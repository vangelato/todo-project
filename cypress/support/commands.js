// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import {v4 as uuidv4} from "uuid";
import selectors from './selectors.js';

const apiHost = Cypress.env('todoApiHost')

Cypress.Commands.add('prePopulateTodoList', (itemList) => {
    let items = []
    itemList.forEach(i => {
        let item = {}
        item.id = uuidv4()
        item.title = i.trim()
        item.completed = false
        items.push(item)
    })
    cy.window().then(win => win.localStorage.setItem('react-todos', JSON.stringify(items)))
})

Cypress.Commands.add('fetchTodos', () => {
    cy.window().then(win.localStorage.getItem('react-todos'))
})

Cypress.Commands.add('removeTodoItem', (itemLabel) => {
    cy.get(selectors.todoList)
        .each(($el) => {
            cy.wrap($el)
                .find('label')
                .invoke('text')
                .then(text => {
                    if (text === itemLabel) {
                        cy.wrap($el).find(selectors.remove).click({force: true})
                    }
                })
        })
})

Cypress.Commands.add('createUser', () => {
    cy.request({
        method: 'post',
        url: apiHost + '/users',
        body: {
            name: "Vangelisz"
        }
    })
})

Cypress.Commands.add('getTodos', (queryObj) => {
        cy.request({
            url: apiHost + '/todos' ,
            qs: queryObj
        }).then(response => response.body)

})

Cypress.Commands.add('createTodo', (body) => {
    cy.request({
        method: 'post',
        url: apiHost + '/todos',
        body: body
    })
})

Cypress.Commands.add('getTodo', (id) => {
    cy.request({
        url: apiHost + '/todos/' + id,
        failOnStatusCode: false
    })
})

Cypress.Commands.add('updateTodo', (body) => {
    cy.request({
        method: 'put',
        url: apiHost + '/todos/' + body.id,
        body: body
        })
})