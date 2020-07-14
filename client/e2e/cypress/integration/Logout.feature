Feature: Logout

  I want to logout Karumi-code-test page

  Background:
    Given Im logged in page
    And I open home page

  Scenario: Logout karumi-code-test page
    When I click on logout button
    Then I see login page
