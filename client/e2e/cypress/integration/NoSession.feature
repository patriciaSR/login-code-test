Feature: No Session Redirect

  I want to visit home Karumi-code-test page but no session is saved

  Background:
    Given Im not logged in page

  Scenario: No session saved on karumi-code-test page
    When I open home page
    Then I see login page
