import { test, expect } from '@playwright/test';

/**
 * Test Suite: EPAM Services – Client Work Navigation
 *
 * Scenario:
 *   1. Navigate to https://www.epam.com/
 *   2. Select "Services" from the header menu
 *   3. Click the "Explore Our Client Work" link
 *   4. Verify that "Client Work" text is visible on the page
 */

test.describe('EPAM – Services › Client Work', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to EPAM homepage before each test
    await page.goto('https://www.epam.com/', { waitUntil: 'domcontentloaded' });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // TC-001: Navigate to Client Work via Services header menu
  // ─────────────────────────────────────────────────────────────────────────
  test('TC-001: Navigating via Services menu shows Client Work page', async ({ page }) => {

    // ── STEP 1: Verify homepage loaded ──────────────────────────────────────
    await expect(page).toHaveURL('https://www.epam.com/');

    // ── STEP 2: Open "Services" from the main header navigation ─────────────
    const servicesMenuItem = page.locator('header').getByRole('link', { name: /services/i });
    await expect(servicesMenuItem).toBeVisible({ timeout: 10_000 });
    await servicesMenuItem.hover();           // Hover to reveal dropdown (if applicable)
    await servicesMenuItem.click();

    // ── STEP 3: Click "Explore Our Client Work" link ─────────────────────────
    const clientWorkLink = page.getByRole('link', { name: /explore our client work/i });
    await expect(clientWorkLink).toBeVisible({ timeout: 10_000 });
    await clientWorkLink.click();

    // ── STEP 4: Assert "Client Work" text is visible on the resulting page ───
    await expect(page.getByText(/client work/i).first()).toBeVisible({ timeout: 15_000 });

    // Optional: assert URL contains a recognisable path segment
    await expect(page).toHaveURL(/client-work|our-work|case-studies/i);
  });

  // ─────────────────────────────────────────────────────────────────────────
  // TC-002: "Services" header link is present and accessible
  // ─────────────────────────────────────────────────────────────────────────
  test('TC-002: Services link is visible in the header', async ({ page }) => {
    const servicesLink = page.locator('header').getByRole('link', { name: /services/i });
    await expect(servicesLink).toBeVisible({ timeout: 10_000 });
    await expect(servicesLink).toBeEnabled();
  });

  // ─────────────────────────────────────────────────────────────────────────
  // TC-003: "Explore Our Client Work" link is reachable from Services section
  // ─────────────────────────────────────────────────────────────────────────
  test('TC-003: Explore Our Client Work link is visible after opening Services', async ({ page }) => {
    const servicesMenuItem = page.locator('header').getByRole('link', { name: /services/i });
    await servicesMenuItem.hover();
    await servicesMenuItem.click();

    const clientWorkLink = page.getByRole('link', { name: /explore our client work/i });
    await expect(clientWorkLink).toBeVisible({ timeout: 10_000 });
    await expect(clientWorkLink).toBeEnabled();
  });

});
