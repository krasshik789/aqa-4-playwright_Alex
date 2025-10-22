// Создать функцию getTableRow(page, email), которая возвращает строку в таблице по емейлу.
// Например getTableRow(page, 'jsmith@gmail.com') => { "Last Name": "Smith", "First Name": "John", Email: "jsmith@gmail.com", Due: "$50.00", "Web Site": "http://www.jsmith.com" }
// Создайте тест, проверяющий данную функцию, используя все емейлы из таблицы Example 2
// Сайт: https://the-internet.herokuapp.com/tables

import { test, expect } from "@playwright/test";
import { getTableRow } from './utils/getTableRow';

test.describe("Verify getTableRow() for Example 2 table", () => {

  test.beforeEach(async ({ page }) => {
    const base_url = 'https://the-internet.herokuapp.com/tables';
    await page.goto(base_url);
  });

  test("Should return correct data for each email in Example 2", async ({ page }) => {
    const expectedData = [
      {
        "Last Name": "Smith",
        "First Name": "John",
        Email: "jsmith@gmail.com",
        Due: "$50.00",
        "Web Site": "http://www.jsmith.com",
      },
      {
        "Last Name": "Bach",
        "First Name": "Frank",
        Email: "fbach@yahoo.com",
        Due: "$51.00",
        "Web Site": "http://www.frank.com",
      },
      {
        "Last Name": "Doe",
        "First Name": "Jason",
        Email: "jdoe@hotmail.com",
        Due: "$100.00",
        "Web Site": "http://www.jdoe.com",
      },
      {
        "Last Name": "Conway",
        "First Name": "Tim",
        Email: "tconway@earthlink.net",
        Due: "$50.00",
        "Web Site": "http://www.timconway.com",
      }
    ];

    for (const expectedRow of expectedData) {
      const actualRow = await getTableRow(page, expectedRow.Email);
      expect(actualRow).toEqual(expectedRow);
    }
  });
});