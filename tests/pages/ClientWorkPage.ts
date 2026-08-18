import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * ClientWorkPage
 * --------------
 * Page Object Model for https://www.epam.com/our-work
 * Encapsulates assertions and interactions on the Client Work landing page.
 */
export class ClientWorkPage extends BasePage {

  // ── Locators ──────────────────────────────────────────────────────────────

  /** Main page heading — expected to contain "Client Work" */
  readonly pageHeading: Locator;

  /** Breadcrumb or hero text confirming the section */
  readonly heroText: Locator;

  /** Case-study / project cards listed on the page */
  readonly caseStudyCards: Locator;

  // ── Constructor ───────────────────────────────────────────────────────────

  constructor(page: Page) {
    super(page);

    this.pageHeading = page.locator(
      'h1, h2, [class*="title"]',
    ).filter({ hasText: /client\s*work/i }).first();

    this.heroText = page.locator(
      '[class*="hero"], [class*="banner"], section',
    ).filter({ hasText: /client\s*work/i }).first();

    this.caseStudyCards = page.locator(
      '[class*="case-card"], [class*="work-card"], [class*="project-card"]',
    );
  }

  // ── Assertions ────────────────────────────────────────────────────────────

  /**
   * Assert the URL resolves to the Client Work section.
   */
  async assertOnClientWorkPage() {
    await this.assertUrlContains('our-work');
  }

  /**
   * Assert "Client Work" heading / text is visible anywhere on the page.
   */
  async assertClientWorkTextVisible() {
    await this.assertTextVisible('Client Work');
  }

  /**
   * Assert the page title contains a relevant keyword.
   */
  async assertPageTitle() {
    await this.assertTitle(/client|our work|epam/i);
  }

  /**
   * Assert that at least one case-study card is rendered.
   */
  async assertCaseStudyCardsPresent() {
    await this.caseStudyCards.first().waitFor({ state: 'visible' });
  }
}
