Feature: Login

  I want to login on Karumi-code-test page

  Background:
    Given I open login page

  Scenario: Login on karumi-code-test page
    When I fill email and password fields
    And I click on login button
    Then I see home page
