import { test, expect } from "@playwright/test";

test.describe("Health care service", { tag: "@functional" }, async () => {
  test.beforeEach("Login with valid credentials", async ({ page }) => {
    // 1. Launch URL and assert title and header
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    await expect(page).toHaveTitle("CURA Healthcare Service");
    await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

    // 2. Click on the Make Appointment
    await page.getByRole("link", { name: "Make Appointment" }).click();
    await expect(page.getByText("Please login to make")).toBeVisible();

    // 3. Insert username and password and click on Login
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    // Assert a text
    await expect(page.locator("h2")).toContainText("Make Appointment");
  });

  test("Should make an appointment with non-default values", async ({ page }) => {
    await page.getByRole("radio", { name: "Medicaid" }).check();
    await page.getByRole("textbox", { name: "Visit Date (Required)" }).click();
    await page.getByRole("columnheader", { name: "February" }).click();
    await page.getByText("Mar").click();
    await page.getByRole("cell", { name: "10" }).click();
    await page.getByRole("textbox", { name: "Comment" }).click();
    await page.getByRole("textbox", { name: "Comment" }).fill("Test comment");
    await page.getByRole("button", { name: "Book Appointment" }).click();
    await page
      .getByRole("heading", { name: "Appointment Confirmation" })
      .click();
    await page.getByText("Please be informed that your").click();
  });
});
