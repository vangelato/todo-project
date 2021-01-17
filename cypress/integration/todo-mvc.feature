@ui
Feature:
  As a user
  I want to be able to manage a list of todos
  So that I can keep track of things that need to be done

  Background:

  Scenario: Items can be added to an empty Todo list
    Given an empty todo list
    When the user adds a todo item called: coding
    Then the following items are visible on the todo list: coding

  Scenario: Items can be added to a pre-existing Todo list
    Given the following items exist on the todo list: coding
    When the user adds a todo item called: testing
    Then the following items are visible on the todo list: coding, testing

  Scenario: Previously added items can be removed from the Todo list
    Given the following items exist on the todo list: coding, testing, printing
    When the user removes the item: testing
    Then the following items are visible on the todo list: coding, printing

  Scenario: All Items can be completed at once on the Todo list
    Given the following items exist on the todo list: coding, testing
    When the user completes all tasks
    Then the following tasks are completed: coding, testing

  Scenario: User is able to complete tasks one-by-one
    Given the following items exist on the todo list: coding, cooking, testing
    When the user completes the item: cooking
    Then the following tasks are completed: cooking
    And the following tasks are to be done: coding, testing

  Scenario Outline: User can filter on active tasks
    Given the following items exist on the todo list: cleaning, cooking
    And the user completes the item: cooking
    When the user selects <filter> filter
    Then the following items are visible on the todo list: <itemsVisible>

    Examples:
      | filter    | itemsVisible |
      | Active    | cleaning     |
      | Completed | cooking      |

  Scenario: An item can be edited on the Todo list
    Given the following items exist on the todo list: coding, testing, deployment
    When the user edits item deployment to review
    Then the following items are visible on the todo list: coding, testing, review

  Scenario: The user is informed on the number of items left to complete
    Given the following items exist on the todo list: cooking, cleaning, shopping
    And the application shows "3 items left"
    When the user completes the item: cooking
    Then the application shows "2 items left"



