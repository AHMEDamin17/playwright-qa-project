import { test, expect } from '@playwright/test';

test('End-to-End Purchase Flow', async ({ page }) => {

  // -- 1. SETUP: LOG IN --
  await page.goto('https://www.demoblaze.com/');
  await page.locator('#login2').click();
  await page.waitForSelector('#loginusername');
  await page.locator('#loginusername').fill('test');
  await page.locator('#loginpassword').fill('test');
  await page.locator('//button[text()="Log in"]').click();
  await page.waitForSelector('#nameofuser');

  // -- 2. ADD ITEM TO CART --
  await page.locator('a:text("Samsung galaxy s6")').click();
  await page.waitForSelector('a:text("Add to cart")');
  
  // --- FIX #1: THE RELIABLE DIALOG HANDLER ---
  // We tell Playwright to *wait* for the dialog event to happen.
  const dialogPromise = page.waitForEvent('dialog');
  
  // Now we click the button that causes the dialog
  await page.locator('a:text("Add to cart")').click();
  
  // And now we *await* the promise, pausing the script
  const dialog = await dialogPromise;
  
  // We verify and accept the dialog.
  expect(dialog.message()).toContain('Product added.');
  await dialog.accept();
  // Now we are 100% sure the item was added before moving on.
  // ------------------------------------------

  // -- 3. GO TO CART & START CHECKOUT --
  await page.locator('#cartur').click();

  // --- FIX #2: THE RELIABLE CART WAIT ---
  // We removed 'networkidle'.
  // We just tell Playwright to wait for the item, giving it a generous 10-second timeout.
  await expect(page.locator('td:text("Samsung galaxy s6")').first())
    .toBeVisible({ timeout: 10000 });
  // -----------------------------------

  await page.locator('//button[text()="Place Order"]').click();

  // -- 4. FILL OUT PURCHASE FORM --
  await page.waitForSelector('#orderModal .modal-content');
  await page.locator('#name').fill('Test User');
  await page.locator('#country').fill('India');
  await page.locator('#city').fill('Test City');
  await page.locator('#card').fill('123456789012');
  await page.locator('#month').fill('12');
  await page.locator('#year').fill('2025');
  await page.locator('//button[text()="Purchase"]').click();

  // -- 5. VERIFY SUCCESS --
  await page.waitForSelector('.sweet-alert h2');
  const successMessage = await page.locator('.sweet-alert h2').textContent();
  expect(successMessage).toContain('Thank you for your purchase!');

  // Click the 'OK' button to close the modal
  await page.locator('//button[text()="OK"]').click();
  
  // Final check: Assert that the success modal is GONE.
  await expect(page.locator('.sweet-alert h2')).toBeHidden();
});