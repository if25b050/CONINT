import { test, expect } from '@playwright/test';

test('get started link', async ({ page }) => {
  await page.goto('http://127.0.0.1:5000');

  // Fill the new todo input.
  await page.getByRole('textbox', { name: 'Add a new todo' }).fill('work: New e2e todo');
  // Click the add todo button.
  await page.getByRole('button', { name: 'Add Todo' }).click();

  await page.reload();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByText('work: New e2e todo').nth(0)).toBeVisible();
});
