// Создать функцию getTableRow(page, email), которая возвращает строку в таблице по емейлу.
// Например getTableRow(page, 'jsmith@gmail.com') => { "Last Name": "Smith", "First Name": "John", Email: "jsmith@gmail.com", Due: "$50.00", "Web Site": "http://www.jsmith.com" }
// Создайте тест, проверяющий данную функцию, используя все емейлы из таблицы Example 2
// Сайт: https://the-internet.herokuapp.com/tables

import { Page } from '@playwright/test';

export async function getTableRow(page: Page, email: string) {
    const table = page.locator("#table2");

    const headerLocators = await table.locator("th").all();
    headerLocators.pop();
    const headers = await Promise.all(headerLocators.map(el => el.innerText()));

    const tableRows = await table.locator("tbody tr").all();
    const data: Record<string, string>[] = [];

    for (const row of tableRows) {
        const cells = await row.locator("td").allInnerTexts();

        const rowData = headers.reduce<Record<string, string>>((result, header, i) => {
            result[header] = cells[i]?.trim() ?? "";
            return result;
        }, {});

        data.push(rowData);
    }
    return data.find(d => d.Email === email);
}