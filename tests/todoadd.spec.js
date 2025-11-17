import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('textbox', { name: 'Enter a task' }).click();
  await page.getByRole('textbox', { name: 'Enter a task' }).fill('bharathi');
  await page.getByRole('textbox', { name: 'Enter a task' }).press('Enter');
});