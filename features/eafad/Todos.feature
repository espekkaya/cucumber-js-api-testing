Feature: Testing User Spesific Todos

  Scenario: Get User Todo List

    Given Sending GET request.
    Then The http status should be 200.
    Then Response format is Json.
    And User id should equal "1".
