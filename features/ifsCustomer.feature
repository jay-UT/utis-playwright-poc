@ifs
Feature: IFS Customer Account Details
  As an IFS Cloud user
  I want to search and filter customers
  So that I can extract account details

  @smoke
  Scenario: IFS account details extraction
    Given I navigate to the IFS Cloud application
    When I login with valid credentials
    Then the home page header should be visible
    When I search for "Customers" in the navigation menu
    And I select the search result
    And I click the customer search button
    And I click the name filter
    And I enter "HENRY SCHEIN FRANCE-JOUE LES TOURS" in the name filter