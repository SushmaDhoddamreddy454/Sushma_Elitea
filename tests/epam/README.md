# EPAM Services → Client Work — Playwright Test Suite

## 📋 Test Scenario

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to `https://www.epam.com/` | Homepage loads successfully |
| 2 | Select **"Services"** from the header menu | Mega-menu dropdown appears |
| 3 | Click **"Explore Our Client Work"** | Browser navigates to `/our-work` |
| 4 | Verify **"Client Work"** text is visible | Text is present on the page |

---

## 🗂️ File Structure

```
├── playwright.config.ts              # Global Playwright configuration
├── package.json                      # Dependencies & npm scripts
├── tsconfig.json                     # TypeScript compiler options
└── tests/
    ├── pages/
    │   ├── BasePage.ts               # Shared utilities (navigation, assertions, cookies)
    │   ├── HomePage.ts               # POM: EPAM homepage + header nav
    │   └── ClientWorkPage.ts         # POM: /our-work landing page
    └── epam/
        ├── epam_services_client_work.spec.ts   # Main test spec (5 test cases)
        └── README.md                           # This file
```

---

## 🧪 Test Cases

| ID | Title | Type |
|----|-------|------|
| TC-01 | Full happy-path navigation — Services → Client Work | E2E |
| TC-02 | Services mega-menu contains "Explore Our Client Work" link | UI |
| TC-03 | Direct URL navigation to `/our-work` shows Client Work content | Navigation |
| TC-04 | "Services" header nav item is visible and interactive | Smoke |
| TC-05 | Client Work page loads without JS errors after navigation | Stability |

---

## 🚀 Running the Tests

### Prerequisites
```bash
node --version   # >= 18.0.0
npm install
npx playwright install
```

### Run Commands

```bash
# All tests (headless)
npm test

# All tests (headed — recommended for EPAM due to bot-detection)
npm run test:headed

# EPAM suite only, headed Chromium
npm run test:epam

# Specific browser
npm run test:chromium
npm run test:firefox
npm run test:webkit

# View HTML report
npm run report
```

---

## ⚠️ Known Limitations

| Issue | Detail | Mitigation |
|-------|--------|------------|
| Cloudflare Bot Protection | EPAM uses Cloudflare, which may block headless browsers with HTTP 403 | Run with `--headed`; use a real browser profile |
| Cookie/GDPR Banner | Dismissal logic is built into `BasePage.dismissCookieBanner()` | Handled automatically |
| Mega-menu timing | Hover animations vary by network speed | 500 ms wait + `waitFor visible` guards added |

---

## 🏗️ Design Decisions

- **Page Object Model (POM)** — separates locators and actions from test logic for maintainability.
- **`test.step()`** — each logical action is wrapped for clear HTML report output.
- **Resilient selectors** — primary + fallback CSS selectors handle minor DOM changes.
- **`headed: false` default** — overridden per-project or via `--headed` flag for bot-sensitive sites.
- **JS error capture** — TC-05 listens for `pageerror` events to catch silent regressions.
