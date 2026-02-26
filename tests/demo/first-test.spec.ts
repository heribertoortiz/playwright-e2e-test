import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("https://katalon-demo-cura.herokuapp.com/");

  await expect(page).toHaveTitle("CURA Healthcare Service");
});
