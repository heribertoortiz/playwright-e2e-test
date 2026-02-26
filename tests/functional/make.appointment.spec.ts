import { test, expect } from "@playwright/test";

test.describe("Health care service", { tag: "@functional" }, async () => {
  test("Generate appointment", async ({ page }) => {
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    await page.getByRole("link", { name: "Make Appointment" }).click();
    await page.getByLabel("Username").click();
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").click();
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();
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
