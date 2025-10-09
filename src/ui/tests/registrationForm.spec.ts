import { test, expect } from "@playwright/test";

type gender = "Male" | "Female";

enum HOBBIES {
  TRAVELLING = "Travelling",
  MOVIES = "Movies",
  SPORTS = "Sports",
  GAMING = "Gaming",
  DANCING = "Dancing",
}
enum SKILLS {
  JAVASCRIPT = "JavaScript",
  PYTHON = "Python",
  JAVA = "Java",
  CPP = "C++",
  RUBY = "Ruby",
}
enum COUNTRY {
  USA = "USA",
  CANADA = "Canada",
  UK = "UK",
}

interface ICredentials {
  firstname: string;
  lastname: string;
  address: string;
  email: string;
  phone: string;
  language: string;
  yearOfBirth: string;
  monthOfBirth: string;
  dayOfBirth: string;
  password: string;
  gender: gender;
  hobbies: HOBBIES[];
  skills: SKILLS[];
  country: COUNTRY[];
}

test.describe("Registration_Form", () => {
  const base_url = "https://anatoly-karpovich.github.io/demo-registration-form/";

  const validCredentials: ICredentials = {
    firstname: "Alex",
    lastname: "QA",
    address: "Novovilenskay 55",
    email: "alexqatest@gmail.ru",
    phone: "375292280107",
    language: "English, Russian",
    yearOfBirth: "1991",
    monthOfBirth: "October",
    dayOfBirth: "19",
    password: "12345678qQ",
    gender: "Male",
    hobbies: [
      HOBBIES.DANCING,
      HOBBIES.GAMING,
      HOBBIES.MOVIES,
      HOBBIES.SPORTS,
      HOBBIES.TRAVELLING,
    ],
    skills: [SKILLS.PYTHON, SKILLS.JAVASCRIPT],
    country: [COUNTRY.UK, COUNTRY.CANADA],
  };

  test.beforeEach(async ({ page }) => {
    await page.goto(base_url);
  });

  test("Registration form", async ({ page }) => {
    const firstNameInput = page.locator("#firstName");
    const lastNameInput = page.locator("#lastName");
    const addressInput = page.locator("#address");
    const emailInput = page.locator("#email");
    const phoneInput = page.locator("#phone");
    const countrySelection = page.locator("#country");
    const genderType = page.locator(`input[name="gender"][value="${validCredentials.gender.toLowerCase()}"]`
    );
    const languageInput = page.locator("#language");
    const skillsTypeSelection = page.locator("#skills");
    const yearOfBirth = page.locator("#year");
    const monthOfBirth = page.locator("#month");
    const dayOfBirth = page.locator("#day");
    const passwordInput = page.locator("#password");
    const confirmPasswordConfirm = page.locator("#password-confirm");
    const submitButton = page.locator("//button[@type='submit']");
    const title = page.locator("//h2[@class = 'text-center']");

    await firstNameInput.fill(validCredentials.firstname);
    await lastNameInput.fill(validCredentials.lastname);
    await addressInput.fill(validCredentials.address);
    await emailInput.fill(validCredentials.email);
    await phoneInput.fill(validCredentials.phone);
    await countrySelection.selectOption(validCredentials.country[0]!);
    await genderType.check();

  for (const hobby of validCredentials.hobbies) {
  await page.evaluate((hobbyValue) => {
    const input = document.querySelector<HTMLInputElement>(
      `input[name="hobby"][value="${hobbyValue}"]`
    );
    if (input) {
      input.checked = true;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }, hobby);
}

    await languageInput.fill(validCredentials.language);
    await skillsTypeSelection.selectOption([
      validCredentials.skills[0]!,
      validCredentials.skills[1]!,
    ]);
    await yearOfBirth.selectOption(validCredentials.yearOfBirth);
    await monthOfBirth.selectOption(validCredentials.monthOfBirth);
    await dayOfBirth.selectOption(validCredentials.dayOfBirth);
    await passwordInput.fill(validCredentials.password);
    await confirmPasswordConfirm.fill(validCredentials.password);
    await submitButton.click();

    await expect(title).toBeVisible();
    await expect(title).toHaveText("Registration Details");
  });
});


