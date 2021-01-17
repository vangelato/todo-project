import {Given, When, Then, And} from "cypress-cucumber-preprocessor/steps";
import selectors from '../../support/selectors.js';

const url = Cypress.env('todoMvcUrl')

const filters = ['All', 'Active', 'Completed']

const commaSeparatedStringsToArray = (list) => {
    let labels = []
    list.split(',').forEach(i => labels.push(i.trim()))
    return labels
}

const visibleTodoItems = () => cy.get(selectors.todoList)

defineParameterType({
    name: "filterType",
    regexp: new RegExp(filters.join("|")),
});

Given('an empty todo list', () => {
    cy.visit(url)
    noItemsPresent()
})

Given('the following items exist on the todo list: {}', (commaSeparatedList) => {
    let itemsList = commaSeparatedList.split(',')
    cy.prePopulateTodoList(itemsList)
    cy.visit(url)
})

const noItemsPresent = () => {
    visibleTodoItems().should('not.exist')
}


Given('the user adds a todo item called: {word}', (item) => {
    cy.get(selectors.newTodo).type(item).type('{enter}')
})

Then('the following items are visible on the todo list: {}', (items) => {
    let labels = commaSeparatedStringsToArray(items)
    visibleTodoItems()
        .find('label')
        .each(($el, index) => {
            cy.wrap($el).contains(labels[index])
        })
    visibleTodoItems().its('length').should('equal', labels.length)
})

When('the user completes all tasks', () => {
    cy.get(selectors.toggleAll).click({force: true})
})

Then('the following tasks are completed: {}', (items) => {
    let labels = commaSeparatedStringsToArray(items)
    cy.get('.completed')
        .each(($el, index) => {
            cy.wrap($el).contains(labels[index])
        })
    cy.get('.completed').should('have.length', labels.length)
})

Then('the following tasks are to be done: {}', (items) => {
    let labels = commaSeparatedStringsToArray(items)
    visibleTodoItems()
        .not('.completed')
        .each(($el, index) => {
            cy.wrap($el).invoke('text').then(text => {
                cy.wrap(text).should('equal', labels[index])
            })
        })
    visibleTodoItems().not('.completed').should('have.length', labels.length)
})


When('the user completes the item: {word}', (label) => {
    visibleTodoItems()
        .find('label')
        .each(($el) => {
            cy.wrap($el).invoke('text').then(text => {
                if (text === label) {
                    cy.wrap($el).siblings(selectors.toggle).click({force: true})
                }
            })
        })
})

When('the user selects {filterType} filter', (filter) => {
    cy.get(selectors.filters).find('a').contains(filter).click()
})

When('the user edits item {word} to {word}', (before, after) => {
    visibleTodoItems()
        .find('label')
        .contains(before)
        .dblclick()
    cy.get('.edit')
        .each(($el) => {
            cy.wrap($el).invoke('val').then(value => {
                if (value === before) {
                    cy.wrap($el).clear().type(after).type('{enter}')
                }
            })
        })
})


Then('there are no items on the todo list', () => {
    noItemsPresent()
})

When('the user removes the item: {word}', (itemLabel) => {
    cy.removeTodoItem(itemLabel)
})

Then('the application shows {string}', (todoCountMessage) => {
    cy.get(selectors.todoCount).invoke('text')
        .then(text => cy.wrap(text).should('equal', todoCountMessage))
})

