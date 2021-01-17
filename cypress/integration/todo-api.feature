@api
Feature:

  Scenario: User can create todos
    Given a new user is created
    And the user has no todo items
    When the user adds a new todo item called cooking
    Then the todo is created

  Scenario: User can update the status of their todos
    Given a new user is created
    And the user adds a new todo item called testing
    When the user completes the todo item called testing
    Then the todo is completed

  #the above test cases are failing because the server does not changes its state
  #my intention was to demonstrate api calls not to make the tests pass with custom mocking
  #as mentioned on the readme, in real-life there would be a lot more api tests
