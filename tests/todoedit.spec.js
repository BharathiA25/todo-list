import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('textbox', { name: 'Enter a task' }).click();
  await page.getByRole('textbox', { name: 'Enter a task' }).fill('bharathi');
  await page.getByRole('textbox', { name: 'Enter a task' }).press('Enter');
  await page.getByRole('button').nth(1).click();
  await page.getByRole('textbox', { name: 'Enter a task' }).click();
  await page.getByRole('textbox', { name: 'Enter a task' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Enter a task' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Enter a task' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Enter a task' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Enter a task' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Enter a task' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Enter a task' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Enter a task' }).press('ArrowRight');
  await page.getByRole('textbox', { name: 'Enter a task' }).fill('harathi');
  await page.getByRole('textbox', { name: 'Enter a task' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Enter a task' }).fill('Bharathi');
  await page.getByRole('textbox', { name: 'Enter a task' }).press('CapsLock');
  await page.getByRole('button', { name: 'Update' }).click();
});