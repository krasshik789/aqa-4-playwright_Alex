import { test, expect } from "@playwright/test";
import { register } from "module";

enum NOTIFICATIONS {
  REGISTRATION_SUCCESS = "Successfully registered! Please, click Back to return on login page",
  USERNAME_REQUIRED = "Username is required",
  USERNAME_MINLENGTH = "Username should contain at least 3 characters",
  USERNAME_SPACES = "Prefix and postfix spaces are not allowed is username",
  PASSWORD_REQUIRED = "Password is required",
  PASSWORD_MINLENGTH = "Password should contain at least 8 characters",
  PASSWORD_UPPERCASE = "Password should contain at least one character in lower case",
  PASSWORD_LOWERCASE = "Password should contain at least one character in upper case",
  PASSWORD_SPACES = "Password is required",
  USER_USED = "Username is in use",
  LOGIN_SUCCESS = "Hello, AlexQA!"
}

const testData = {
  registration: {
    valid: {
      username: 'AlexQA',
      password: '12345678qQ',
    },
    invalidUsernames: [
      { username: '', error: NOTIFICATIONS.USERNAME_REQUIRED },
      { username: 'ab', error: NOTIFICATIONS.USERNAME_MINLENGTH },
      { username: ' User', error: NOTIFICATIONS.USERNAME_SPACES },
      { username: 'User ', error: NOTIFICATIONS.USERNAME_SPACES },
      { username: '     ', error: NOTIFICATIONS.USERNAME_SPACES },
    ],
    invalidPasswords: [
      { password: '', error: NOTIFICATIONS.PASSWORD_REQUIRED },
      { password: '12345qQ', error: NOTIFICATIONS.PASSWORD_MINLENGTH },
      { password: 'QWERTYUIO', error: NOTIFICATIONS.PASSWORD_UPPERCASE },
      { password: 'qwertyuiop', error: NOTIFICATIONS.PASSWORD_LOWERCASE },
      { password: '     ', error: NOTIFICATIONS.PASSWORD_SPACES },
    ],
  },
};

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

    await usernameInput.fill(testData.registration.valid.username);
    await passwordInput.fill(testData.registration.valid.password);
    await registerButton.click();
    await expect(notificaton).toHaveText(NOTIFICATIONS.REGISTRATION_SUCCESS);
  });

 test ("Login after register",async ({page}) => {
   const usernameInput = page.locator("#userNameOnRegister");
   const passwordInput = page.locator("#passwordOnRegister");
   const registerButton = page.locator("#register");
   const BackToLogin = page.locator("#backOnRegister")
   const usernameLoginInput = page.locator("#userName");
   const passwordLoginInput = page.locator("#password");
   const loginButton = page.locator("#submit");
   const successMessage = page.locator("#successMessage");
   
   await usernameInput.fill(testData.registration.valid.username);
   await passwordInput.fill(testData.registration.valid.password);
   await registerButton.click();
   await BackToLogin.click()
   await usernameLoginInput.fill(testData.registration.valid.username);
   await passwordLoginInput.fill(testData.registration.valid.password);
   await loginButton.click()
   await expect(successMessage).toBeVisible()
   await expect(successMessage).toHaveText('Hello, AlexQA!')
 })

  test("Shouldn't register with already used username", async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem(
        "AlexQA",
        JSON.stringify({ name: "AlexQA", password: "12345678qQ" })
      );
    });

    await page.goto(base_url)
    await page.locator("#registerOnLogin").click();
    
    const usernameInput = page.locator("#userNameOnRegister");
    const passwordInput = page.locator("#passwordOnRegister");
    const registerButton = page.locator("#register");
    const errorMessage = page.locator("#errorMessageOnRegister");

    await usernameInput.fill("AlexQA");
    await passwordInput.fill("12345678qQ");
    await registerButton.click();
    await expect(errorMessage).toHaveText(NOTIFICATIONS.USER_USED);
})
  for (const { username, error } of testData.registration.invalidUsernames) {
    test(`Fail registration with invalid username: "${username}"`, async ({ page }) => {
      const usernameInput = page.locator("#userNameOnRegister");
      const passwordInput = page.locator("#passwordOnRegister");
      const registerButton = page.locator("#register");
      const errorMessage = page.locator("#errorMessageOnRegister");

      await usernameInput.fill(username);
      await passwordInput.fill(testData.registration.valid.password);
      await registerButton.click();

      await expect(errorMessage).toHaveText(error);
    });
  }


  for (const { password, error } of testData.registration.invalidPasswords) {
    test(`Fail registration with invalid password: "${password}"`, async ({ page }) => {
      const usernameInput = page.locator("#userNameOnRegister");
      const passwordInput = page.locator("#passwordOnRegister");
      const registerButton = page.locator("#register");
      const errorMessage = page.locator("#errorMessageOnRegister");

      await usernameInput.fill(testData.registration.valid.username);
      await passwordInput.fill(password);
      await registerButton.click();
      await expect(errorMessage).toHaveText(error);
    });
  }

});
