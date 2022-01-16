class ShopistCartPage {

  navigate(url) {
    cy.visit(url);
  }

  click(locator) {
    cy.get(locator).click();
  }

  enterText(locator, text) {
    cy.get(locator).type(text);
  }

  verifyToastMessage(locator, message) {
    cy.get(locator).should("have.text", message);
  }

  openInStockProduct(locator, text) {
    cy.get(locator)
    .contains(text)
    .first()
    .click();
  }

  grabText({ locator, valueToBeGrab, variableToStoreText }) {
    cy.get(locator)
    .first()
    .invoke(valueToBeGrab)    
    .as(variableToStoreText);
  }

  validateText({ locator, text, index = 0 }) {
      cy.get(locator)
      .eq(index)
      .invoke('text')
      .should("contains", text)
  }
}

export default new ShopistCartPage();