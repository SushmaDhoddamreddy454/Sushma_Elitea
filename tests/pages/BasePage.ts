/**
 * @file BasePage.ts
 * @description Abstract base class providing shared navigation helpers,
 * cookie-banner dismissal, and reusable assertion methods for all page objects.
 *
 * @author  Web Tester (Elitea QA Agent)
 * @version 1.0.0
 */

import { Page, Locator, expect } from '@playwright/test';

/**
 * BasePage
 * --------
 * Shared utilities and common interactions inherited by all page objects.
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ── Navigation ────────────────────────────────────────────────────────────

  async goto(path = '/') {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
    await this.dismissCookieBanner();
  }

  // ── Cookie / GDPR banner ──────────────────────────────────────────────────

  async dismissCookieBanner() {
    try {
      const acceptBtn = this.page.locator(
        'button#onetrust-accept-btn-handler, ' +
        'button[data-id="cookie-accept"], ' +
        'button:has-text("Accept All")',
      );
      if (await acceptBtn.isVisible({ timeout: 5_000 })) {
        await acceptBtn.click();
        await acceptBtn.waitFor({ state: 'hidden', timeout: 5_000 });
      }
    } catch {
      // Banner not present — continue
    }
  }

  // ── Assertions ────────────────────────────────────────────────────────────

  async assertTextVisible(text: string) {
    await expect(
      this.page.getByText(text, { exact: false }).first(),
    ).toBeVisible();
  }

  async assertUrlContains(segment: string) {
    await expect(this.page).toHaveURL(new RegExp(segment, 'i'));
  }

  async assertTitle(titlePattern: RegExp | string) {
    await expect(this.page).toHaveTitle(titlePattern);
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async scrollTo(locator: Locator) {
    await locator.scrollIntoViewIfNeeded();
  }
}
