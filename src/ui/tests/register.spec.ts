import { test, expect } from "@playwright/test";
import { register } from "module";
import {NOTIFICATIONS, validCreds,invalidUsernames,invalidPasswords} from "./test-data"

test.describe("REGISTER", () => {
  const base_url = 'https://anatoly-karpovich.github.io/demo-login-form/';

  test.beforeEach(async ({ page }) => {
    await page.goto(base_url);
    await page.locator("#registerOnLogin").click();
  });

  test("Success registration with valid credentials", async ({ page }) => {
    const usernameInput = page.locator("#userNameOnRegister");
    const passwordInput = page.locator("#passwordOnRegister");
    const registerButton = page.locator("#register");
    const notificaton = page.locator("#errorMessageOnRegister");

    await usernameInput.fill(validCreds.registration.username);
    await passwordInput.fill(validCreds.registration.password);
    await registerButton.click();
    await expect(notificaton).toHaveText(NOTIFICATIONS.REGISTRATION_SUCCESS);
  });

  test("Login after register", async ({ page }) => {
    const usernameInput = page.locator("#userNameOnRegister");
    const passwordInput = page.locator("#passwordOnRegister");
    const registerButton = page.locator("#register");
    const backToLogin = page.locator("#backOnRegister");
    const usernameLoginInput = page.locator("#userName");
    const passwordLoginInput = page.locator("#password");
    const loginButton = page.locator("#submit");
    const successMessage = page.locator("#successMessage");

    await usernameInput.fill(validCreds.registration.username);
    await passwordInput.fill(validCreds.registration.password);
    await registerButton.click();
    await backToLogin.click();
    await usernameLoginInput.fill(validCreds.registration.username);
    await passwordLoginInput.fill(validCreds.registration.password);
    await loginButton.click();
    await expect(successMessage).toHaveText(NOTIFICATIONS.LOGIN_SUCCESS);
  });

  test("Shouldn't register with already used username", async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem(
        "AlexQA",
        JSON.stringify({ name: "AlexQA", password: "12345678qQ" })
      );
    });

    await page.goto(base_url);
    await page.locator("#registerOnLogin").click();

    const usernameInput = page.locator("#userNameOnRegister");
    const passwordInput = page.locator("#passwordOnRegister");
    const registerButton = page.locator("#register");
    const errorMessage = page.locator("#errorMessageOnRegister");

    await usernameInput.fill("AlexQA");
    await passwordInput.fill("12345678qQ");
    await registerButton.click();
    await expect(errorMessage).toHaveText(NOTIFICATIONS.USER_USED);
  });

  for (const { username, error } of invalidUsernames) {
    test(`Fail registration with invalid username: "${username}"`, async ({ page }) => {
      const usernameInput = page.locator("#userNameOnRegister");
      const passwordInput = page.locator("#passwordOnRegister");
      const registerButton = page.locator("#register");
      const errorMessage = page.locator("#errorMessageOnRegister");

      await usernameInput.fill(username);
      await passwordInput.fill(validCreds.registration.password);
      await registerButton.click();
      await expect(errorMessage).toHaveText(error);
    });
  }

  for (const { password, error } of invalidPasswords) {
    test(`Fail registration with invalid password: "${password}"`, async ({ page }) => {
      const usernameInput = page.locator("#userNameOnRegister");
      const passwordInput = page.locator("#passwordOnRegister");
      const registerButton = page.locator("#register");
      const errorMessage = page.locator("#errorMessageOnRegister");

      await usernameInput.fill(validCreds.registration.username);
      await passwordInput.fill(password);
      await registerButton.click();
      await expect(errorMessage).toHaveText(error);
    });
  }
});