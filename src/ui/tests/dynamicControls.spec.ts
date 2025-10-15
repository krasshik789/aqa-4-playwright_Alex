import { test, expect } from "@playwright/test";

test.describe("[dynamic controls]", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/");
  });

  test("Dynamic Controls - checkbox flow", async ({ page }) => {
    const dynamicControlLink = page.locator("//a[@href='/dynamic_controls']");
    const removeButton = page.getByRole("button", { name: "Remove" });
    const addButton = page.getByRole("button", { name: "Add" });
    const checkbox = page.locator("//input[@type='checkbox']");
    const message = page.locator("#message");
    const headerText = page.locator(".example p");
    const loadingBar = page.locator("(//div[@id='loading'])[1]");

    await dynamicControlLink.click();
    await expect(removeButton).toBeVisible();
    await expect(headerText).toHaveText("This example demonstrates when elements (e.g., checkbox, input field, etc.) are changed asynchronously.");
    await checkbox.check();
    await removeButton.click();
    await expect(loadingBar).toBeVisible({ timeout: 5000 });
    await expect(loadingBar).toBeHidden({ timeout: 10000 });
    await expect(message, "Checkbox dissappears").toHaveText("It's gone!");
    await expect(addButton).toBeVisible();
    await addButton.click();
    await expect(loadingBar).toBeVisible({ timeout: 5000 });
    await expect(loadingBar).toBeHidden({ timeout: 10000 });
    await expect(checkbox, "Checkbox appears").toBeVisible();
    await expect(message).toHaveText("It's back!");

  });
});