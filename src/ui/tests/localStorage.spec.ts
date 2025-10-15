// Разработать тест со следующими шагами:
//   - открыть https://anatoly-karpovich.github.io/demo-login-form/
//   - Засунуть в localStorage браузера данные test@gmail.com / SecretPw123!@# для логина на сайт
//   - Залогиниться с данными что вы вставили в localStorage
//   - Завалидировать успешный логин

//   Рекоммендации:
//   - Для доступа к localStorage используйте https://playwright.dev/docs/evaluating
import { test, expect } from "@playwright/test";

test.describe("LoginViaLocalStorage", () => {
  const validCreds = {
    username: "test@gmail.com",
    password: "SecretPw123!@#",
  };

  test("Login using values stored in localStorage", async ({ page }) => {
    const base_url = "https://anatoly-karpovich.github.io/demo-login-form/";
    const usernameInput = page.locator("#userName");
    const passwordInput = page.locator("#password");
    const loginButton = page.locator("#submit");
    const successMessage= page.locator("#successMessage");
   
    await page.goto(base_url);
    await page.evaluate(({ username, password }) => {
        localStorage.setItem(
            username,
            JSON.stringify({name:username, password:password})
        );
    },
    {
        username: validCreds.username,
        password: validCreds.password
    }
    );
    await usernameInput.fill(validCreds.username);
    await passwordInput.fill(validCreds.password);
    await page.locator("#submit").click();
    await expect(successMessage).toBeVisible();
    await expect(successMessage).toHaveText(`Hello, ${validCreds.username}!`);
  });
});
