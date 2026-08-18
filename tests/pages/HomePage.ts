/**
 * @file HomePage.ts
 * @description Page Object Model for https://www.epam.com/
 * Encapsulates header navigation locators and interaction methods,
 * including the Services mega-menu and "Explore Our Client Work" link.
 *
 * @author  Web Tester (Elitea QA Agent)
 * @version 1.0.0
 */

import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * HomePage
 * --------
 * Page Object Model for https://www.epam.com/
 * Encapsulates header navigation and hero-section interactions.
 */
export class HomePage extends BasePage {

  // ── Locators ──────────────────────────────────────────────────────────────

  /** Top-level "Services" navigation item in the main header */
  readonly servicesNavItem: Locator;

  /** "Explore Our Client Work" link — appears in the Services mega-menu */
  readonly exploreClientWorkLink: Locator;

  /** Site logo — used to verify the homepage loaded correctly */
  readonly siteLogo: Locator;

  // ── Constructor ───────────────────────────────────────────────────────────

  constructor(page: Page) {
    super(page);

    this.servicesNavItem = page.locator(
      // Primary selector: nav link with exact "Services" text
      'header nav a:has-text("Services"), ' +
      // Fallback: list item containing "Services"
      'ul.header-nav__menu-list > li > a:has-text("Services")',
    ).first();

    this.exploreClientWorkLink = page.locator(
      // Primary: anchor with exact link text
      'a:has-text("Explore Our Client Work"), ' +
      // Fallback: any element containing the phrase
      '[class*="menu"] a:has-text("Client Work")',
    ).first();

    this.siteLogo = page.locator(
      'a[class*="logo"], header img[alt*="EPAM"]',
    ).first();
  }

  // ── Actions ───────────────────────────────────────────────────────────────

  /**
   * Navigate to the EPAM homepage and dismiss any overlays.
   */
  async open() {
    await this.goto('/');
    await this.waitForPageLoad();
  }

  /**
   * Hover over the "Services" item in the main navigation to reveal
   * the mega-menu dropdown.
   */
  async hoverServicesMenu() {
    await this.servicesNavItem.waitFor({ state: 'visible' });
    await this.servicesNavItem.hover();
    // Allow the mega-menu animation to complete
    await this.page.waitForTimeout(500);
  }

  /**
   * Click the "Services" item in the main navigation.
   * Use when hover alone does not reveal the sub-menu.
   */
  async clickServicesMenu() {
    await this.servicesNavItem.waitFor({ state: 'visible' });
    await this.servicesNavItem.click();
    await this.page.waitForTimeout(500);
  }

  /**
   * Click the "Explore Our Client Work" link inside the Services menu.
   * Waits for the link to become visible before clicking.
   */
  async clickExploreClientWork() {
    await this.exploreClientWorkLink.waitFor({ state: 'visible' });
    await this.exploreClientWorkLink.click();
  }
}
