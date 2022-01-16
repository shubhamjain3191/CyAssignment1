Feature: Allow user to add the items into the cart

  As a user
  I want to add the items into the cart

  Background: User opens the shopist website
    Given User is on the shopist page

  Scenario: User adds the item to cart and veirfy the details
    When User adds the chair to the cart
    And User adds the sofa to the cart
    When User goes to the shopping cart page
    Then Only added items should be displayed in the cart
    Then Correct total price should be displayed in the cart

  Scenario: User is trying to apply the invalid discount code
    When User goes to the shopping cart page
    And User enters the invalid discount code
    When User clicks on the apply button
    Then Inline error message should be displayed
