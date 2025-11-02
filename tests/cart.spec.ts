import { test, expect } from '@playwright/test';

test('User can add an item to the cart', async ({ page }) => {
  
  // -- SETUP: Log in first --
  await page.goto('https://www.demoblaze.com/');
  await page.locator('#login2').click();
  await page.waitForSelector('#loginusername');
  await page.locator('#loginusername').fill('test');
  await page.locator('#loginpassword').fill('test');
  await page.locator('//button[text()="Log in"]').click();
  await page.waitForSelector('#nameofuser');
  // -- End of login --


  // Step 1: Click on a product (e.g., "Samsung galaxy s6")
  await page.locator('a:text("Samsung galaxy s6")').click();

  // Step 2: Wait for the "Add to cart" button to be visible
  await page.waitForSelector('a:text("Add to cart")');

  // Step 3: Set up the listener for the browser alert *BEFORE* clicking.
  page.on('dialog', async dialog => {
    expect(dialog.message()).toContain('Product added.');
    await dialog.accept();
  });

  // Step 4: On the product page, click "Add to cart"
  await page.locator('a:text("Add to cart")').click();

  // Step 5: Go to the "Cart" page to verify
  await page.locator('#cartur').click();

  // --- THIS IS THE FIX ---
  // Step 6: Verify the item is in the cart
  // We will assert that a table cell (td) with our product's name is visible.
  // We use .first() to handle the "strict mode" error.
  // This line means "I expect the first element matching this locator to be visible."
  await expect(page.locator('td:text("Samsung galaxy s6")').first()).toBeVisible();
});