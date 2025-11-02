import { test, expect } from '@playwright/test';

test('Successful Login', async ({ page }) => {
  
  // Step 1: Go to the website
  await page.goto('https://www.demoblaze.com/');

  // Step 2: Click the 'Log in' button in the navbar
  await page.locator('#login2').click();

  // Step 3: Fill in the username
  // We need to wait a moment for the modal to appear, so we use waitForSelector
  await page.waitForSelector('#loginusername');
  await page.locator('#loginusername').fill('test'); // Use a valid username

  // Step 4: Fill in the password
  await page.locator('#loginpassword').fill('test'); // Use a valid password

  // Step 5: Click the 'Log in' button on the modal
  await page.locator('//button[text()="Log in"]').click();

  // Step 6: Verify that the login was successful
  // We check for the "Welcome test" link in the navbar
  await page.waitForSelector('#nameofuser');
  const welcomeText = await page.locator('#nameofuser').textContent();
  expect(welcomeText).toContain('Welcome test');
});