/**
 * @file epam_services_client_work.spec.ts
 * @description Playwright TypeScript test suite for the EPAM website.
 *
 * Test Scenario:
 *   1. Navigate to https://www.epam.com/
 *   2. Select "Services" from the header menu
 *   3. Click the "Explore Our Client Work" link
 *   4. Verify that the "Client Work" text is visible on the page
 *
 * Design:
 *   - Page Object Model (POM) via HomePage & ClientWorkPage
 *   - test.step() wrappers for rich HTML report output
 *   - Resilient dual CSS selectors (primary + fallback)
 *   - JS error capture in stability test (TC-05)
 *
 * @author  Web Tester (Elitea QA Agent)
 * @version 1.0.0
 */

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ClientWorkPage } from '../pages/ClientWorkPage';

test.describe('EPAM Services → Client Work Navigation', () => {

  let homePage: HomePage;
  let clientWorkPage: ClientWorkPage;

  // ── Hooks ─────────────────────────────────────────────────────────────────

  test.beforeEach(async ({ page }) => {
    homePage     = new HomePage(page);
    clientWorkPage = new ClientWorkPage(page);
  });

  // ── TC-01: Full happy-path navigation flow ─────────────────────────────────

  test(
    'TC-01 | Navigate via Services menu to Client Work page and verify heading',
    async ({ page }) => {

      // ── Step 1: Open the EPAM homepage ──────────────────────────────────
      await test.step('Open https://www.epam.com/', async () => {
        await homePage.open();
        await expect(page).toHaveURL(/epam\.com/);
      });

      // ── Step 2: Select "Services" from the header navigation ─────────────
      await test.step('Select "Services" from the header menu', async () => {
        await homePage.hoverServicesMenu();
        // Verify the mega-menu became visible after hover
        await expect(homePage.exploreClientWorkLink).toBeVisible();
      });

      // ── Step 3: Click "Explore Our Client Work" ──────────────────────────
      await test.step('Click the "Explore Our Client Work" link', async () => {
        await homePage.clickExploreClientWork();
        await clientWorkPage.waitForPageLoad();
      });

      // ── Step 4: Verify "Client Work" text is visible on the page ─────────
      await test.step('Verify "Client Work" text is visible on the page', async () => {
        await clientWorkPage.assertClientWorkTextVisible();
        await clientWorkPage.assertOnClientWorkPage();
      });
    },
  );

  // ── TC-02: Services menu is accessible and contains expected links ─────────

  test(
    'TC-02 | Services mega-menu contains the "Explore Our Client Work" link',
    async ({ page }) => {

      await test.step('Open the EPAM homepage', async () => {
        await homePage.open();
      });

      await test.step('Hover over "Services" to reveal the mega-menu', async () => {
        await homePage.hoverServicesMenu();
      });

      await test.step('Assert "Explore Our Client Work" link is present and visible', async () => {
        await expect(homePage.exploreClientWorkLink).toBeVisible();
        await expect(homePage.exploreClientWorkLink).toBeEnabled();
      });
    },
  );

  // ── TC-03: Direct URL navigation to Client Work page ──────────────────────

  test(
    'TC-03 | Direct URL navigation to /our-work shows "Client Work" content',
    async ({ page }) => {

      await test.step('Navigate directly to /our-work', async () => {
        await clientWorkPage.goto('/our-work');
        await clientWorkPage.waitForPageLoad();
      });

      await test.step('Dismiss cookie banner if present', async () => {
        await clientWorkPage.dismissCookieBanner();
      });

      await test.step('Verify "Client Work" text is visible', async () => {
        await clientWorkPage.assertClientWorkTextVisible();
      });

      await test.step('Verify the page URL contains "our-work"', async () => {
        await clientWorkPage.assertOnClientWorkPage();
      });

      await test.step('Verify the page title is relevant', async () => {
        await clientWorkPage.assertPageTitle();
      });
    },
  );

  // ── TC-04: Services nav item is visible and clickable ─────────────────────

  test(
    'TC-04 | "Services" header navigation item is visible and interactive',
    async ({ page }) => {

      await test.step('Open the EPAM homepage', async () => {
        await homePage.open();
      });

      await test.step('Assert "Services" nav item is visible', async () => {
        await expect(homePage.servicesNavItem).toBeVisible();
      });

      await test.step('Assert "Services" nav item is enabled', async () => {
        await expect(homePage.servicesNavItem).toBeEnabled();
      });

      await test.step('Click "Services" and verify page response', async () => {
        await homePage.clickServicesMenu();
        // After click the menu should expand — link must be visible
        await expect(homePage.exploreClientWorkLink).toBeVisible({ timeout: 10_000 });
      });
    },
  );

  // ── TC-05: Page does not show error state after navigation ────────────────

  test(
    'TC-05 | Client Work page loads without errors after navigation from Services menu',
    async ({ page }) => {

      const pageErrors: string[] = [];

      // Capture any uncaught JS errors during the journey
      page.on('pageerror', (err) => pageErrors.push(err.message));

      await test.step('Complete full navigation journey', async () => {
        await homePage.open();
        await homePage.hoverServicesMenu();
        await homePage.clickExploreClientWork();
        await clientWorkPage.waitForPageLoad();
      });

      await test.step('Assert no critical JS errors were thrown', async () => {
        const criticalErrors = pageErrors.filter(
          (msg) => !msg.includes('Non-Error') && !msg.includes('ResizeObserver'),
        );
        expect(criticalErrors, `Unexpected JS errors: ${criticalErrors.join(', ')}`).toHaveLength(0);
      });

      await test.step('Assert "Client Work" content is displayed', async () => {
        await clientWorkPage.assertClientWorkTextVisible();
      });
    },
  );
});
