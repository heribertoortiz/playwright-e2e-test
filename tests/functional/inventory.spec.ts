import { test, expect } from "@playwright/test";

// Scenario:
// 1.	Login as standard user
// 2.	Get a list of products with its price
// 3.	Assert that all products have non-zero dollar value

test.describe("Inventory", { tag: "@functional" }, () => {
  test.beforeEach("Login with valid credentials", async ({ page }) => {
    // 1. Launch URL and assert title and header
    await page.goto("https://www.saucedemo.com/");
    await expect(page).toHaveTitle("Swag Labs");
    let usernameElement = page.locator('[data-test="username"]');
    await usernameElement.fill("standard_user");

    let passwordElement = page.locator('[data-test="password"]');
    await passwordElement.fill("secret_sauce");

    let loginButtonElement = page.locator('[data-test="login-button"]');
    await loginButtonElement.click();

    // Assert a text
    let titleElement = page.locator('[data-test="title"]');
    await expect(titleElement).toHaveText("Products");

    let urlSite = page.url();
    await expect(urlSite).toBe("https://www.saucedemo.com/inventory.html");
  });

  test("Should confirm that all products have non-zero dollar value", async ({
    page,
  }) => {
    //Get a list of products
    let inventoryItemElement = page.locator('[data-test="inventory-item"]');
    await expect(inventoryItemElement).toHaveCount(6);

    //Get product name and price

    let totalProducts = await inventoryItemElement.count();

    let priceArray = [];

    for (let i = 0; i < totalProducts; i++) {
      let eleNode = inventoryItemElement.nth(i);

      //Get product name
      let productName = await eleNode
        .locator('[data-test="inventory-item-name"]')
        .innerText();

      //Get product price
      let productPrice = await eleNode
        .locator('[data-test="inventory-item-price"]')
        .innerText();

      //Print the results
      console.log(`Product: ${productName} - Price: ${productPrice}`);

      priceArray.push(productPrice);
    }

    console.log(`Original price array: ${priceArray}`);

    /**
     * $29.99,$9.99,$15.99,$49.99,$7.99,$15.99 
     * 1. Replace all $ with ""
     * 2. Compare the price which should be > 0 */

    let priceArrayNumbers = priceArray.map((item) => item.replace("$", ""));
    console.log(`Modified price array: ${priceArrayNumbers}`);

    let priceArrayWithInvalidValues = priceArrayNumbers.filter((item) => parseFloat(item) <= 0);

    if (priceArrayWithInvalidValues.length > 0) {
        console.log(`ERROR: Zero price values found: ${priceArrayWithInvalidValues}`);
    }else {
        console.log("INFO: All products have non-zero dollar value");
    }
  });

  test.only("Should successfully complete the purchase flow", async ({ page }) => {
    //Use of .nth method to pick up the first element and add it to the cart
    let inventoryItemElement = page.locator('[data-test="inventory-item"]');
    let firstProductElement = inventoryItemElement.nth(0);
    let addToCartButtonElement = firstProductElement.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    await addToCartButtonElement.click();

    //Go to the cart and confirm that the product was added correctly
    let shoppingCartLinkElement = page.locator('[data-test="shopping-cart-link"]');
    await shoppingCartLinkElement.click();

    //Assert that the product was added to the cart
    let cartQuantityElement = page.locator('[data-test="item-quantity"]');
    await expect(cartQuantityElement).toHaveText("1");

    //Verify that it is the same product
    let cartProductNameElement = page.locator('[data-test="inventory-item-name"]');
    await expect(cartProductNameElement).toHaveText("Sauce Labs Backpack");

    //Go to checkout and fill the form
    let checkoutButtonElement = page.locator('[data-test="checkout"]');
    await checkoutButtonElement.click();

    let firstNameElement = page.locator('[data-test="firstName"]');
    await firstNameElement.fill("John");

    let lastNameElement = page.locator('[data-test="lastName"]');
    await lastNameElement.fill("Doe");

    let postalCodeElement = page.locator('[data-test="postalCode"]');
    await postalCodeElement.fill("12345");

    let continueButtonElement = page.locator('[data-test="continue"]');
    await continueButtonElement.click();

    let finishElement = page.locator('[data-test="finish"]');
    await finishElement.click();

    //Assert that the purchase was completed

    let ponyExpressElement = page.locator('[data-test="pony-express"]');
    await expect(ponyExpressElement).toBeVisible();

    let completeHeaderElement = page.locator('[data-test="complete-header"]');
    await expect(completeHeaderElement).toHaveText("Thank you for your order!");
  });
});
