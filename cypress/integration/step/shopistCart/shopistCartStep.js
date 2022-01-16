/// <reference types="cypress" />

// gherkin keywords
import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

// data
import shopistCartData from "../../data/shopistCart/shopistCartData";

// locator
import shopistCartLocator from "../../locator/shopistCart/shopistCartLocator";

// page
import ShopistCartPage from "../../page/shopistCart/shopistCartPage";

Given("User is on the shopist page", () => {
  ShopistCartPage.navigate(shopistCartData.url);
});

When("User adds the chair to the cart", function () {
  ShopistCartPage.click(shopistCartLocator.chairDepartment);
  ShopistCartPage.openInStockProduct(
    shopistCartLocator.productStatus,
    shopistCartData.inStock
  );

  // grab title of the chair and storing into a variable for later use
  ShopistCartPage.grabText({
    locator: shopistCartLocator.productTitle,
    valueToBeGrab: shopistCartData.text,
    variableToStoreText: shopistCartData.chairTitle,
  });

  // grab price of the chair and storing into a variable for later use
  ShopistCartPage.grabText({
    locator: shopistCartLocator.productPrice,
    valueToBeGrab: shopistCartData.text,
    variableToStoreText: shopistCartData.chairPrice,
  });

  ShopistCartPage.click(shopistCartLocator.addCartButton);
});

When("User adds the sofa to the cart", function () {
  ShopistCartPage.click(shopistCartLocator.sofaDepartment);
  ShopistCartPage.openInStockProduct(
    shopistCartLocator.productStatus,
    shopistCartData.inStock
  );

  // grab title of the sofa and storing into a variable for later use
  ShopistCartPage.grabText({
    locator: shopistCartLocator.productTitle,
    valueToBeGrab: shopistCartData.text,
    variableToStoreText: shopistCartData.sofaTitle,
  });

  // grab price of the sofa and storing into a variable for later use
  ShopistCartPage.grabText({
    locator: shopistCartLocator.productPrice,
    valueToBeGrab: shopistCartData.text,
    variableToStoreText: shopistCartData.sofaPrice,
  });

  ShopistCartPage.click(shopistCartLocator.addCartButton);
});

When("User goes to the shopping cart page", function () {
  ShopistCartPage.click(shopistCartLocator.navigationMenu);
  ShopistCartPage.click(shopistCartLocator.cartNavigation);
});

Then("Only added items should be displayed in the cart", function () {
  // validate added product title
  ShopistCartPage.validateText({
    locator: shopistCartLocator.productTitleInCart,
    text: this[shopistCartData.sofaTitle],
    index: 1,
  });
  ShopistCartPage.validateText({
    locator: shopistCartLocator.productTitleInCart,
    text: this[shopistCartData.chairTitle],
  });

  // validate added product price
  ShopistCartPage.validateText({
    locator: shopistCartLocator.productTitleInCart,
    text: this[shopistCartData.chairPrice],
  });
  ShopistCartPage.validateText({
    locator: shopistCartLocator.productTitleInCart,
    text: this[shopistCartData.sofaPrice],
    index: 1,
  });
});

Then("Correct total price should be displayed in the cart", function () {
  // take out the price from the fetched price as string 
  let chairPrice = this[shopistCartData.chairPrice].substr(1);
  let sofaPrice = this[shopistCartData.sofaPrice].substr(1);

  // convert price of type string into number 
  chairPrice = Number(chairPrice);
  sofaPrice = Number(sofaPrice);

  // Tax and shipping value as hard coded because
  // there is no info regarding shipping and tax setting
  const tax = 88;
  const shipping = 56;

  //calculate total price
  const totalPrice = chairPrice + sofaPrice + tax + shipping;

  // it may be fail as tax and shipping changes every time for same product's price
  // and i don't have any info that on which basis its changing
  ShopistCartPage.validateText({
    locator: shopistCartLocator.totalPrice,
    text: totalPrice,
    index: 1,
  });
});

When("User enters the invalid discount code", () => {
  ShopistCartPage.enterText(
    shopistCartLocator.discountCode,
    shopistCartData.discountCode
  );
});

When("User clicks on the apply button", () => {
  ShopistCartPage.click(shopistCartLocator.applyButton);
});

Then("Inline error message should be displayed", () => {
  ShopistCartPage.verifyToastMessage(
    shopistCartLocator.discountToast,
    shopistCartData.discountCodeError
  );
});
