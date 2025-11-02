# QA Automation Portfolio (Playwright, TypeScript & Postman)

This project is a comprehensive QA test suite for the 'DemoBlaze' e-commerce website. It's designed to demonstrate skills in modern UI automation, API testing, and professional bug reporting, tailored for a fast-paced fintech environment.

**Demo Site Tested:** [https://www.demoblaze.com/](https://www.demoblaze.com/)

---

## 🚀 Core Skills Demonstrated
* **UI Automation:** Built a stable regression suite with Playwright and TypeScript.
* **Debugging Flaky Tests:** Identified and fixed race conditions and unstable locators.
* **Cross-Browser Testing:** Found and logged a high-severity bug that only occurs on Firefox.
* **API Testing:** Verified API endpoints directly using Postman.
* **Bug Reporting:** Created a professional, high-impact bug report in Jira.

---

## 1. UI Automation (Playwright)

Three core flows were automated in TypeScript to create a regression suite.

* **`login.spec.ts`:** Verifies a user can successfully log in.
* **`cart.spec.ts`:** Verifies a user can add an item to the cart, handling flaky pop-ups.
* **`e2e-purchase.spec.ts`:** A full end-to-end test that verifies the entire "happy path" (Login -> Add Item -> Checkout -> Verify Purchase).

### 🐞 High-Severity Bug Found
The automation suite discovered a **critical cross-browser bug**:
> **`e2e-purchase.spec.ts` consistently PASSES on Chromium/WebKit but FAILS on Firefox.**

The "Add to Cart" feature is unreliable on Firefox, preventing users from completing a purchase. This bug was logged with a high-severity report.

## 2. API Testing (Postman)

To supplement the UI tests, a Postman collection was created to test the API directly.

* **Endpoint:** `POST /login`
* **Tests:** Wrote automated tests to assert:
    * The status code is `200 OK`.
    * The response body includes a valid `Auth_token`.

## 3. Bug Report Example

A formal bug report was created for the cross-browser issue.

* **Title:** Firefox: Item fails to appear in cart after "Add to Cart"
* **Severity:** High (Blocks the entire purchase flow for Firefox users)
* **Steps to Reproduce:**
    1.  Log in as "test" / "test" on Firefox.
    2.  Navigate to "Samsung galaxy s6" product page.
    3.  Click "Add to cart" and accept the alert.
    4.  Navigate to the "Cart" page.
* **Expected Result:** The "Samsung galaxy s6" should be visible in the cart.
* **Actual Result:** The cart is empty. The item is not added.